import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const { names } = await readBody(event);
  const results = [];

  const browser = await puppeteer.launch({ headless: "new" });

  try {
    for (const name of names) {
      const page = await browser.newPage();

      // Example: Search on Google
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(name)}`
      );

      // Add your scraping logic here
      // Example: Find email patterns
      const content = await page.content();
      const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
      const emails = content.match(emailRegex) || [];

      results.push({
        name,
        email: emails[0] || "Not found",
      });

      await page.close();
    }
  } finally {
    await browser.close();
  }

  return results;
});
