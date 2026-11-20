(() => {
  const bar = document.querySelector(".filter-bar");
  const groups = document.querySelectorAll(".paper-group");
  const status = document.getElementById("filter-status");
  bar.hidden = false;

  function show(type) {
    let visible = 0;
    for (const group of groups) {
      let groupCount = 0;
      for (const paper of group.querySelectorAll(".paper")) {
        paper.hidden = type !== "all" && paper.dataset.type !== type;
        if (!paper.hidden) groupCount += 1;
      }
      group.hidden = groupCount === 0;
      visible += groupCount;
    }
    for (const button of bar.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === type));
    }
    status.textContent = document.documentElement.lang === "en"
      ? visible + " publications shown" : "显示 " + visible + " 条论文记录";
  }

  bar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (button) show(button.dataset.filter);
  });
  window.addEventListener("hashchange", () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target && target.hidden) {
      show("all");
      target.scrollIntoView();
    }
  });
})();
