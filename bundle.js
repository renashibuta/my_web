(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
const menuPanel = document.querySelector("#menu-panel");
const menuStatus = document.getElementById("menu-status");
const newsList = document.getElementById("news-list");
const copyright = document.getElementById("copyright");
if (menuPanel && menuStatus) {
    const links = menuPanel.querySelectorAll("a");
    for (const link of links) {
        link.addEventListener("click", function () {
            menuStatus.click();
        });
    }
}
if (newsList) {
    function createNewsBlock(d = "", t = "") {
        const newsRow = document.createElement("div");
        newsRow.className = "news-row";
        const date = document.createElement("p");
        date.className = "news-date";
        date.innerText = d;
        const title = document.createElement("p");
        title.className = "news-title";
        title.innerText = t;
        newsRow.appendChild(date);
        newsRow.appendChild(title);
        newsList === null || newsList === void 0 ? void 0 : newsList.appendChild(newsRow);
    }
    const API_KEY = "gwKXDH4GqVe3cLltYOowTKtpxDjAyj2rdClm";
    fetch("https://myportfoliorena.microcms.io/api/v1/news?limit=3", {
        headers: {
            "X-MICROCMS-API-KEY": API_KEY,
        },
    })
        .then((data) => data.json())
        .then((json) => {
        const contents = json.contents;
        for (const content of contents) {
            const date = new Date(content.date);
            createNewsBlock(`${date.getFullYear()}.${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`, content.title);
        }
    });
}
if (copyright) {
    const year = new Date().getFullYear();
    copyright.innerText = `© ${year} `;
}
const idLinks = document.getElementsByTagName("a");
for (let i = 0; i < idLinks.length; i++) {
    const link = idLinks[i];
    if (link.href.includes("#")) {
        link.onclick = (evt) => {
            evt.preventDefault();
        };
        link.addEventListener("click", () => {
            var _a;
            const targetElement = document.getElementById(link.href.split("#").pop() || "");
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect().top;
                const headerHeight = ((_a = document.querySelector("header")) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
                window.scroll({
                    top: rect + window.pageYOffset - headerHeight,
                    behavior: "smooth",
                });
            }
        });
    }
}
const STAR_COUNT = 5;
const hobby = document.getElementById("hobby");
const news = document.getElementById("news");
createStar(hobby);
createStar(news);
function createStar(root) {
    if (!root)
        return;
    const max = Math.random() * STAR_COUNT + 3;
    for (let i = 0; i < max; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.innerText = "★";
        const fontSize = Math.floor(Math.random() * 20) + 10;
        star.style.fontSize = fontSize + "px";
        const left = Math.floor(Math.random() * window.innerWidth);
        star.style.left = left + "px";
        star.style.top = -Math.floor(Math.random() * 100) + "px";
        root.appendChild(star);
        setTimeout(() => {
            star.style.left = left - 200 + "px";
        }, 100);
        setTimeout(() => {
            star.remove();
        }, 10 * 1000);
    }
}
setInterval(() => {
    createStar(hobby);
    createStar(news);
}, 2000);

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
