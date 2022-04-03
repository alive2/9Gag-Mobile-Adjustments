chrome.runtime.sendMessage({}, (response) => {
  const checkReady = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(checkReady);
      pressContinueInChrome();
      pressCloseOnOpenAppPopup();
      moveNavTop();
      detectNavStyleChangeAndReposition();
    }
  });
});

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
  const el1 = document.querySelector("#jsid-app > div:nth-child(1)");
  if (el1) {
    (el1 as HTMLDivElement).style.top = "0px";
  }
  const el2 = document.querySelector("#jsid-app > div:nth-child(2)");
  if (el2) {
    (el2 as HTMLDivElement).style.paddingTop = "96px";
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
