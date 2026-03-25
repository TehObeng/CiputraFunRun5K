import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import { env, hasAdminAuthEnv } from "@/lib/env";

const COOKIE_NAME = "funrun-admin-session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getAdminUsername() {
  return env.ADMIN_USERNAME ?? "";
}

function getAdminPassword() {
  return env.ADMIN_PASSWORD ?? "";
}

function getSessionSecret() {
  return env.CMS_SESSION_SECRET ?? "";
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signSessionValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function createSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = `${username}:${expiresAt}`;
  const signature = signSessionValue(payload);

  return `${payload}:${signature}`;
}

export function isAdminAuthConfigured() {
  return hasAdminAuthEnv();
}

export async function verifyAdminCredentials(username: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  return safeCompare(username, getAdminUsername()) && safeCompare(password, getAdminPassword());
}

export async function createAdminSession() {
  if (!isAdminAuthConfigured()) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, createSessionToken(getAdminUsername()), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const rawToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!rawToken) {
    return false;
  }

  const [username, expiresAtRaw, signature] = rawToken.split(":");

  if (!username || !expiresAtRaw || !signature) {
    return false;
  }

  const payload = `${username}:${expiresAtRaw}`;
  const expectedSignature = signSessionValue(payload);
  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt)) {
    return false;
  }

  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  if (!safeCompare(username, getAdminUsername())) {
    return false;
  }

  return expiresAt > Date.now();
}
