export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: "https://bestbuilders224.com/sitemap.xml",
  };
}
