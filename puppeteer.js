const puppeteer = require("puppeteer");
const extensionPath = "extension";

async function run()
{
  const browser = await puppeteer.launch({headless: false, args: [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
    "--no-sandbox"
  ]});

  await sleep(1000); // Arbitriary wait time, so extension is loaded.
  const page = await browser.newPage();
  await page.goto("http://example.com");
  const swIntPage = await browser.newPage();
  await swIntPage.goto("chrome://serviceworker-internals");
  await page.bringToFront();
  await swIntPage.click("#serviceworker-list .stop");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

run();