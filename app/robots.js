export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: "https://bestbuilderssarlu.com/sitemap.xml",
  };
}
