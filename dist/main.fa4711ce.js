// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hasMap = xObject || [{
  logo: "A",
  url: "https://www.google.com/"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //删除 / 开头的内容
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach(function (node, index) {
    var $li = $("\n                  <li>\n                      <div class=\"edit\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-edit\"></use>\n                        </svg>\n                      </div>\n                      <div class=\"logo\">".concat(node.logo, "</div>\n                      <div class=\"link hide\">").concat(simplifyUrl(node.url), "</div>\n                      <div class='close'>\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-searchclose\"></use>\n                        </svg>\n                      </div>\n                  </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //阻止冒泡

      hasMap.splice(index, 1);
      render();
    });
    $li.on("click", ".edit", function (e) {
      e.stopPropagation(); //阻止冒泡

      var url = "https://" + window.prompt("您要修改成什么网址？");
      console.log(url);

      if (url !== "https://" + null) {
        console.log("hi");
        hasMap.splice(index, 1, {
          logo: simplifyUrl(url)[0],
          //.toUpperCase()
          logoType: "text",
          url: url
        });
      }

      render();
      console.log(hasMap);
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请问您要添加的网址是什么？");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hasMap.push({
    logo: simplifyUrl(url)[0],
    //.toUpperCase()
    logoType: "text",
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hasMap);
  window.localStorage.setItem("x", string);
};

$(document).on("keypress", function (e) {
  // const key = e.key;
  var key = e.key; //上面一行代码的简写形式：如果发现你的变量名和后面的属性名是一样的额就可以这么写

  for (var i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=https://wh2887.github.io/McCall-nav/dist/main.fa4711ce.js.map