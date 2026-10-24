// "How did you hear about us?" The values match the shop CRM's source field (anypress-crm.php SOURCES),
// so a contact's answer reads the same whether they came through a form here or the shop's checkout.
export const SOURCES = [
  ["search", "Search (Google, Bing)"],
  ["social", "Social media"],
  ["friend", "A friend or colleague"],
  ["event", "An event or workshop"],
  ["video", "YouTube or a podcast"],
  ["community", "An online community or forum"],
  ["other", "Somewhere else"],
] as const;
