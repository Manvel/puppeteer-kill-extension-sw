const puppeteer = require("puppeteer");
const extensionPath = "extension";
let browser;
async function run()
{
  browser = await puppeteer.launch({headless: false , args: [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
    "--no-sandbox"
  ]});
  await sleep(1000); // Arbitriary wait time, so extension is loaded.

  // THE LINE BELOW CAUSES THE EXTENSION SERVICE WORKER TO GO INTO DEAD MODE,
  // MEANING THE SERVICE WORKER NEVER WAKES UP.
  const worker = await getWorker(browser); 

  const page = await browser.newPage();
  await page.goto("http://example.com");
  const swIntPage = await browser.newPage();
  await swIntPage.goto("chrome://serviceworker-internals");
  await page.bringToFront();
  await swIntPage.click("#serviceworker-list .stop");
  await page.click("#send-rpc-msg");
}

async function getWorker(browser) {
  const targets = browser.targets();
  const backgroundPageTarget = targets.find(
    (target) =>
      target.url().startsWith("chrome-extension://") &&
      (target.type() === "background_page" || target.type() === "service_worker")
  );
  return backgroundPageTarget.worker();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

run();