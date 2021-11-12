chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getText") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {
  var message = document.querySelector("#message");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: "getPage.js",
      },
      function () {
        if (chrome.runtime.lastError) {
          message.innerText =
            "Error occured : " + chrome.runtime.lastError.message;
        }
      }
    );
  });
}

window.onload = onWindowLoad;
