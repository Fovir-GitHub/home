document.addEventListener("DOMContentLoaded", function () {
  scrollToActiveItem();
  enableCollapsibles();
});

function enableCollapsibles() {
  const nonLeafNodeA = document.querySelectorAll(".non-leaf-node");

  nonLeafNodeA.forEach((node) => {
    node.addEventListener("click", (e) => {
      e.preventDefault();
      const list = node.parentElement;
      if (list) {
        list.classList.toggle("open");
      }
    });
  });
}

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector(
    "aside.hextra-sidebar-container > .hextra-scrollbar",
  );
  const activeItems = document.querySelectorAll(".hextra-sidebar-active-item");
  const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem) {
    return;
  }

  const yOffset = visibleActiveItem.clientHeight;
  const yDistance =
    visibleActiveItem.getBoundingClientRect().top -
    sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: yDistance - yOffset,
  });
}
