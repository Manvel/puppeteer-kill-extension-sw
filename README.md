## Killing chrome extension service worker using Puppeteer

There is no API available for killing Browser Extensions Service Worker. One way
to do manually is from the `chrome://serviceworker-internals` page. But the
problem is that if puppeteer is used for opening the page and programmatically
clicking on the `stop` button of the extension service worker item, the Service
Worker doesn't in some circumstances, unless reloading the extension. Meaning
wake-up events doesn't start Service Worker again and even clicking `Start`
button in `chrome://serviceworker-internals` doesn't work.

Current repository is for reproducing that issue observed while testing
bardeen.ai and reproduction.

## How to use current Repo

Install all dependencies:
```sh
npm i
```

Execute:
```sh
npm run pptr
```

After running `npm run pptr` Click on the extension icon. Expected behavior is
to see `Service worker is awake! 🎉` message in popup.
