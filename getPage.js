function ParseRecursive(root) {
  // 재귀임
  if (root.childElementCount == 0) {
    // 텍스트만 있는 구역이면
    console.log(root.innerText);
    if (root.innerText.indexOf("사과") != -1) {
      // 찾았으면 바꾸는 거
      // 키워드
      root.style.backgroundColor = "red";
    }
  } else {
    for (var iter = root.childElementCount; iter--; )
      ParseRecursive(root.children[iter]);
  }
}
function ParseText() {
  let items = document.querySelector("body"); // 바디만 따로 빼서
  let result = "";
  ParseRecursive(items); // 재귀함수 돌림
  return result;
}
// function ParseText(docu) {
//   var texts = "",
//     curr = docu.firstChild;
//   while (curr) {
//     if (curr.innerText) {
//       texts += curr.innerText;
//     }
//     curr = curr.nextSibling;
//   }
//   return texts.replace(/(<([^>]+)>)/gi, "");
// }

chrome.runtime.sendMessage({
  action: "getText",
  source: ParseText(),
});
