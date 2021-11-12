function ParseRecursive(root) {
  // 재귀임
  if (root.childElementCount == 0) {
    // 텍스트만 있는 구역이면
    if (root.innerText && root.innerText.indexOf("메타버스") != -1) {
      // 키워드 찾았으면 바꾸는 거
      console.log(root.innerText);
      root.style.backgroundColor = "black";
      root.style.color = "black";
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

chrome.runtime.sendMessage({
  action: "getText",
  source: ParseText(),
});
