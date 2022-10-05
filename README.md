## Killing chrome extension service worker using Puppeteer

There is no API available for killing Browser Extensions Service Worker. One way
to do manually is from the `chrome://serviceworker-internals` page. But the
problem is that if puppeteer is used for opening the page and programmatically
clicking on the `stop` button of the extension service worker item, the Service
Worker go into a dead mode and never wake up, unless reloading the extension.
Meaning wake-up events doesn't start Service Worker again and even clicking
`Start` button in `chrome://serviceworker-internals` doesn't work.

Current repository is for reproducing that issue observed while testing
bardeen.ai and it's reproduction.

## Reproduction steps

1. Run `npm i`
1. Run `npm run pptr`
1. Observe
1. Open `chrome://serviceworker-internals/` tab and click on Start button
1. Observe
1. Comment [line 15 in `puppeteer.js`](https://github.com/Manvel/puppeteer-kill-extension-sw/blob/main/puppeteer.js#L15)
1. Close the browser.
1. Run `npm run pptr` again
1. Observe

### Observed behavior
- On step 3 nothing happens
- On step 5 even though "Start" button is clicked the service worker state stuck in `STARTING` phase, it never starts.
- On step 9 `Service worker is awake! 🎉` message is shown

### Expected behavior
- On step 3 `Service worker is awake! 🎉` message is shown
- On step 5 Service worker status is `ACTIVATED`, if it's not, after clicking Stop button the status should change to `ACTIVATED`  eventually
- On step 9 `Service worker is awake! 🎉` message is shown

