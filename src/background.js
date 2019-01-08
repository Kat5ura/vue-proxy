import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "saved" });
    }
  }
);

const filter = {
  urls: ['<all_urls>']
}

const events = {
  onBeforeRequest: ['blocking', 'requestBody'],
  onBeforeSendHeaders: ['requestHeaders', 'blocking'],
  onSendHeaders: ['requestHeaders'],
  onHeadersReceived: ['responseHeaders', 'blocking'],
  onResponseStarted: ['responseHeaders'],
  onBeforeRedirect: ['responseHeaders'],
  onCompleted: ['responseHeaders']
}

Object.keys(events).forEach((event) => {
  let options = events[event]
  ext.webRequest[event].addListener(function(details){
    console.log(event + ': ',  details)
  }, filter, options)
})

ext.webRequest.onErrorOccurred.addListener(function (detailes) {
  console.log('error: ', detailes)
}, filter)
