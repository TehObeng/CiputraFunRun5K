import { cache } from "react";

import { getRegistrationDestination, getLandingPageContent } from "@/lib/site-content";

export const getPublicRuntime = cache(async () => {
  const content = await getLandingPageContent();

  return {
    logo: content.brand.logo,
    registrationUrl: getRegistrationDestination(content),
    contactValue: content.faq.contactValue || content.footer.contactValue,
    socials: content.footer.socials,
  };
});
