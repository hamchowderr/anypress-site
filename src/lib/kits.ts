/**
 * The design kits in the AnyPress theme (styles/kit-*.json in hamchowderr/anypress-theme), with each kit's main
 * colours: primary, second accent, text and background. Screenshots in public/designs/<slug>.webp are the top of each
 * kit's demo home page.
 */
export interface Kit {
  slug: string;
  name: string;
  who: string;
  colors: [string, string, string, string];
}

export const KITS: Kit[] = [
  { slug: "ridge", name: "Ridge", who: "Home services and trades", colors: ["#ad3209", "#ffb000", "#111417", "#f1eee7"] },
  { slug: "circuit", name: "Circuit", who: "Electricians and repair shops", colors: ["#123c8c", "#ffd23f", "#0c1626", "#ffffff"] },
  { slug: "hearth", name: "Hearth", who: "Food and drink", colors: ["#38450f", "#d3a648", "#262c0c", "#efeee7"] },
  { slug: "parcel", name: "Parcel", who: "Online shops", colors: ["#9a3b1b", "#2f4a3a", "#1f1a17", "#f5f0e8"] },
  { slug: "gloss", name: "Gloss", who: "Salons and beauty", colors: ["#7a2335", "#e9c6c0", "#2a1a1d", "#fbf6f4"] },
  { slug: "still", name: "Still", who: "Wellness", colors: ["#56644e", "#cdc3b6", "#333231", "#eeecea"] },
  { slug: "rep", name: "Rep", who: "Gyms and classes", colors: ["#b81f17", "#d4ff3a", "#0e0e0e", "#f2f2ef"] },
  { slug: "chapter", name: "Chapter", who: "Courses and communities", colors: ["#25319a", "#ffcf3f", "#16182b", "#fbfaf6"] },
  { slug: "ledger", name: "Ledger", who: "Professional services", colors: ["#06525c", "#c7dcd6", "#06343a", "#f7f9f8"] },
  { slug: "keystone", name: "Keystone", who: "Real estate", colors: ["#24453a", "#c9a66b", "#18201c", "#f6f4ef"] },
  { slug: "branch", name: "Branch", who: "Franchises and chains", colors: ["#005f7a", "#ffb547", "#0b2530", "#fbfdfd"] },
  { slug: "commons", name: "Commons", who: "Associations, chambers and churches", colors: ["#1f3a5f", "#9c3d24", "#14202e", "#f8f6f1"] },
  { slug: "assay", name: "Assay", who: "Regulated health products", colors: ["#0e5a5f", "#e8c872", "#0f1d1f", "#fbfcfb"] },
  { slug: "launch", name: "Launch", who: "Startups and software", colors: ["#1c6844", "#cfe9d9", "#121212", "#f4f3ef"] },
  { slug: "byline", name: "Byline", who: "Blogs and magazines", colors: ["#a91f1b", "#1d2b3a", "#1a1a1a", "#faf8f3"] },
  { slug: "frame", name: "Frame", who: "Creative portfolios", colors: ["#1f3fd1", "#e3dfd4", "#111111", "#f6f5f1"] },
];
