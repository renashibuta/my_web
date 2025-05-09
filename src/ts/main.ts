const menuPanel = document.querySelector("#menu-panel");

const menuStatus = document.getElementById("menu-status");

const newsList = document.getElementById("news-list");
const copyright = document.getElementById("copyright");

if (menuPanel && menuStatus) {
  const links = menuPanel.querySelectorAll("a");
  // links.forEach((link) => {
  //   link.addEventListener("click", function () {
  //     menuStatus.click();
  //   });
  // });
  for (const link of links) {
    link.addEventListener("click", function () {
      menuStatus.click();
    });
  }
  // for (let index = 0; index < links.length; index++) {
  //   const link = links[index];
  //   link.addEventListener("click", function () {
  //     menuStatus.click();
  //   });
  // }
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
    newsList?.appendChild(newsRow);
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
        createNewsBlock(
          `${date.getFullYear()}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`,
          content.title
        );
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
      const targetElement = document.getElementById(
        link.href.split("#").pop() || ""
      );
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect().top;
        const headerHeight =
          document.querySelector("header")?.clientHeight || 0;
        window.scroll({
          top: rect + window.pageYOffset - headerHeight,
          behavior: "smooth",
        });
      }
    });
  }
}

const STAR_COUNT = 5;
const hobby = document.getElementById("hobby")!;
const news = document.getElementById("news")!;
createStar(hobby);
createStar(news);
function createStar(root: Element) {
  if (!root) return;
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
