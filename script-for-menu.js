const menuButton = document.querySelector("#menu-button");
    const mainNav = document.querySelector("#main-nav");

    menuButton.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", function (event) {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});