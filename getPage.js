async function analyzeText(currtext) {
  var API_KEY = undefined;
  await fetch("http://127.0.0.1:8080/getAPIKEY/", {
    method: "GET",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      API_KEY = data.data;
    });

  // const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;
  const url = `https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=${API_KEY}`;
  // const url = `https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=${API_KEY}`;
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
             document: {
               type: "PLAIN_TEXT",
               content: "${currtext}",
             },
             encodingType: "UTF16",
           }`,
  };
  const result = await fetch(url, options).then((res) => res.json());
  return result;
  //Natural Language API test.
}

async function ParseRecursive(root) {
  // 재귀임
  if (root.childElementCount == 0) {
    // 텍스트만 있는 구역이면
    if (root.innerText) {
      analyzeText(root.innerText).then((res) => {
        if (res) {
          const final_score =
            10 * res.documentSentiment.magnitude * res.documentSentiment.score;
          if (final_score <= -0.09) {
            root.style.backgroundColor = "black";
            root.style.color = "black";
            console.log(
              root.innerText,
              res.documentSentiment.magnitude,
              res.documentSentiment.score,
              final_score
            );
          }
        }
      });
      // 키워드 찾았으면 바꾸는 거
    }
  } else {
    for (var iter = root.childElementCount; iter--; )
      await ParseRecursive(root.children[iter]);
  }
}
function ParseText() {
  let items = document.querySelector("body"); // 바디만 따로 빼서
  let result = "";
  ParseRecursive(items); // 재귀함수 돌림
  return result;
}
/*
  analyzeText("TESTtext").then((res) => {
    const final_score =
      res.documentSentiment.magnitude * res.documentSentiment.score;
  });
*/
chrome.runtime.sendMessage({
  action: "getText",
  source: ParseText(),
});
