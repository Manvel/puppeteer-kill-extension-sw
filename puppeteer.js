const puppeteer = require("puppeteer");
const extensionPath = "extension";

async function run()
{
  const browser = await puppeteer.launch({headless: false, args: [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
    "--no-sandbox"
  ]});
  page = await browser.newPage();
  
  setTimeout(async () => {
    const targets = await browser.targets();
    const serviceWorkerTarget = targets.find((target) => target.type() === "service_worker");
    const serviceWorker = await serviceWorkerTarget.worker();
    serviceWorker.evaluate(() => console.log("EXECUTED BY PPTR"));
  }, 1000); // Arbitriary wait time, so extension is loaded.
}

run();