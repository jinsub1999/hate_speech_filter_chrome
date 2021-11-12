chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getText") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {
  var API_KEY = undefined;
  fetch("http://127.0.0.1:8080/getAPIKEY/", {
    method: "GET",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data)
      API_KEY = data.data;
    })
    .then(() => {
      // const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;
      const url = `https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=${API_KEY}`;
      // const url = `https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=${API_KEY}`;
      var testString = "항상 건강하세요.";
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{
          document: {
            type: "PLAIN_TEXT",
            content: "${testString}",
          },
          encodingType: "UTF16",
        }`,
      };
      fetch(url, options) //Natural Language API test.
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));
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
    });
}

window.onload = onWindowLoad;
