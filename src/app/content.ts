chrome.runtime.sendMessage({}, (response) => {
  const checkReady = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(checkReady);
      detectHistoryChangeAndUpdate();
      detectNavStyleChangeAndReposition();
      detectScrollAndRemoveFillers();
      makeStyleClasses();
      updateUI();
    }
  });
});

function updateUI() {
  pressContinueInChrome();
  pressCloseOnOpenAppPopup();
  moveNavTop();
  hidePostTopAd();
}

function makeStyleClasses() {
  const head = document.querySelector("head");
  head.innerHTML += `
    <style>
      .pt-49px {
        padding-top: 49px !important;
      }
      .pt-96px {
        padding-top: 96px !important;
      }
    </style>
  `;
}

function pressContinueInChrome() {
  const el = document.querySelector(
    "#jsid-app > div.overlay.overlay-bottom-sheet.bottom-sheet.open-in-app > div > div > div > ul > li:nth-child(4) > a"
  );
  if (el) {
    (el as HTMLButtonElement).click();
  }
}

function pressCloseOnOpenAppPopup() {
  const el = document.querySelector(
    "#jsid-app > div:nth-child(2) > div > div.content-wrap > div.list-view > div.footer > div > a > div.download-app-close"
  );
  if (el) {
    (el as HTMLButtonElement).click();
  }
}

function moveNavTop() {
  const isPost = location.pathname.startsWith("/gag/");

  const el1 = document.querySelector("#jsid-app > div:nth-child(1)");
  if (el1) {
    (el1 as HTMLDivElement).style.top = "0px";
  }
  const el2 = document.querySelector("#jsid-app > div:nth-child(2)");
  if (el2) {
    if (isPost) {
      (el2 as HTMLDivElement).classList.remove("pt-96px");
      (el2 as HTMLDivElement).classList.add("pt-49px");
    } else {
      (el2 as HTMLDivElement).classList.remove("pt-49px");
      (el2 as HTMLDivElement).classList.add("pt-96px");
    }
  }
  const el3 = document.querySelector("#jsid-ad-container-page_adhesion");
  if (el3) {
    (el3 as HTMLDivElement).style.minHeight = "0px";
    (el3 as HTMLDivElement).style.maxHeight = "0px";
  }

  if (isPost) {
    const useAppBtn = document.querySelector(
      "#jsid-app > div:nth-child(1) > header > div.right.use-app > a"
    );
    if (useAppBtn) {
      useAppBtn.remove();
    }
  }
}

function detectNavStyleChangeAndReposition() {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      const el = mutationRecord.target as HTMLDivElement;
      if (el) {
        if (!el.style.top.startsWith("-")) {
          el.style.top = "0px";
        }
      }
    });
  });

  const target = document.querySelector("#jsid-app > div:nth-child(1)");
  if (target) {
    observer.observe(target, { attributes: true, attributeFilter: ["style"] });
  }
}

function detectHistoryChangeAndUpdate() {
  let lastState = location.pathname;
  const body = document.querySelector("body");
  body.addEventListener("click", function (event) {
    setTimeout(() => {
      if (lastState === location.pathname) return;
      lastState = location.pathname;
      updateUI();
    }, 200);
  });
}

function detectScrollAndRemoveFillers() {
  let distanceScrolled = 0;
  const threshold = 300;
  window.onscroll = function () {
    const distance = Math.abs(
      document.documentElement.scrollTop - distanceScrolled
    );
    if (distance < threshold) return;
    distanceScrolled = document.documentElement.scrollTop;

    const promotions = document.querySelectorAll(
      'article a[href="https://9gag.com/advertise?ref=post-section"]'
    );
    for (const promo of promotions) {
      const parentEl = findParent(promo, ".post-cell");
      if (parentEl && parentEl.style.display !== "none") {
        parentEl.style.display = "none";
      }
    }

    const signUpListBanner = document.querySelectorAll(
      "div > div.post-signup-list-banner"
    );
    for (const banner of signUpListBanner) {
      if ((banner as HTMLDivElement).style.display === "none") return;
      (banner as HTMLDivElement).style.display = "none";
    }

    const ads = document.querySelectorAll('div > section.salt-container')
    for (const ad of ads) {
      if ((ad as HTMLDivElement).style.display === "none") return;
      (ad as HTMLDivElement).style.display = "none";
    }
  };
}

function hidePostTopAd() {
  const isPost = location.pathname.startsWith("/gag/");
  if (!isPost) return;
  const el = document.querySelector(
    "#jsid-app > div > div > div.content-wrap > div:nth-child(2) > div > section.salt-container.above-comment"
  );
  if (el) {
    (el as HTMLDivElement).style.display = "none";
  }
}

function findParent(el: Element, selector: string) {
  let parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}
