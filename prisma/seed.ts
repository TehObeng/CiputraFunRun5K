import { randomBytes } from "node:crypto";

import { AdminRole, AdminStatus, Prisma, PrismaClient } from "@prisma/client";

import { hashPassword } from "../lib/auth-security";
import { getDefaultLandingPageContent } from "../lib/default-content";
import { SITE_CONTENT_SLUG } from "../lib/site-content";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim() || "admin@example.com";
  const name = process.env.ADMIN_SEED_NAME?.trim() || "Fun Run Admin";
  const providedPassword = process.env.ADMIN_SEED_PASSWORD?.trim() || null;
  const generatedPassword = randomBytes(12).toString("base64url");
  const passwordForCreate = providedPassword ?? generatedPassword;

  const existing = await prisma.adminUser.findUnique({
    where: { email },
  });

  const passwordHash =
    !existing || providedPassword ? await hashPassword(passwordForCreate) : existing.passwordHash;

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      role: AdminRole.ADMIN,
      status: AdminStatus.ACTIVE,
      passwordHash,
    },
    create: {
      email,
      name,
      role: AdminRole.ADMIN,
      status: AdminStatus.ACTIVE,
      passwordHash,
    },
  });

  return {
    admin,
    seededPassword: !existing || providedPassword ? passwordForCreate : null,
  };
}

async function seedContent(adminUserId: string) {
  const existing = await prisma.siteContent.findUnique({
    where: { slug: SITE_CONTENT_SLUG },
    include: {
      revisions: {
        take: 1,
      },
    },
  });

  if (!existing) {
    const content = getDefaultLandingPageContent();

    const siteContent = await prisma.siteContent.create({
      data: {
        slug: SITE_CONTENT_SLUG,
        content,
        currentRevision: 1,
        updatedById: adminUserId,
      },
    });

    await prisma.siteContentRevision.create({
      data: {
        siteContentId: siteContent.id,
        revision: 1,
        content,
        createdById: adminUserId,
      },
    });

    return siteContent;
  }

  if (existing.revisions.length === 0) {
    await prisma.siteContentRevision.create({
      data: {
        siteContentId: existing.id,
        revision: existing.currentRevision,
        content: existing.content as Prisma.InputJsonValue,
        createdById: adminUserId,
      },
    });
  }

  return existing;
}

async function main() {
  const { admin, seededPassword } = await seedAdmin();
  const siteContent = await seedContent(admin.id);

  console.log(`Seeded admin: ${admin.email}`);
  console.log(`Seeded site content slug: ${siteContent.slug}`);

  if (seededPassword) {
    console.log(`Admin password: ${seededPassword}`);
  } else {
    console.log("Admin password unchanged.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
