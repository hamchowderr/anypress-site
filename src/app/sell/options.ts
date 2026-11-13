/** How many websites an applicant expects to sell in their first year (the API's expectedSites). */
export const EXPECTED_SITES = ["1-2", "3-9", "10-24", "25+"] as const;

/** The kinds of customers a seller can say they serve (the API's audiences; its storefront's Who we help pages). */
export const AUDIENCES = [
  ["shops", "Shops and makers"],
  ["specialty", "Specialty retailers"],
  ["courses", "Course creators"],
  ["associations", "Chambers and associations"],
  ["churches", "Churches"],
  ["locations", "Franchises and multi-location businesses"],
  ["freelancers", "Freelancers and studios"],
  ["software", "Software companies"],
] as const;
