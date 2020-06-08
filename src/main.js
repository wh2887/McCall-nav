const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [
  { logo: "A", url: "https://www.google.com/" },
  { logo: "B", url: "https://www.bilibili.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach((node, index) => {
    const $li = $(`
                  <li>
                      <div class="edit">
                        <svg class="icon">
                          <use xlink:href="#icon-edit"></use>
                        </svg>
                      </div>
                      <div class="logo">${node.logo}</div>
                      <div class="link hide">${simplifyUrl(node.url)}</div>
                      <div class='close'>
                        <svg class="icon">
                          <use xlink:href="#icon-searchclose"></use>
                        </svg>
                      </div>
                  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hasMap.splice(index, 1);
      render();
    });
    $li.on("click", ".edit", (e) => {
      e.stopPropagation(); //阻止冒泡
      let url = "https://" + window.prompt("您要修改成什么网址？");
      console.log(url);
      if (url !== "https://" + null) {
        console.log("hi");
        hasMap.splice(index, 1, {
          logo: simplifyUrl(url)[0], //.toUpperCase()
          logoType: "text",
          url: url,
        });
      }
      render();
      console.log(hasMap);
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问您要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hasMap.push({
    logo: simplifyUrl(url)[0], //.toUpperCase()
    logoType: "text",
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap);
  window.localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  // const key = e.key;
  const { key } = e; //上面一行代码的简写形式：如果发现你的变量名和后面的属性名是一样的额就可以这么写
  for (let i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
