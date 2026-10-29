const menuButton = document.querySelector("#menu-button");
    const mainNav = document.querySelector("#main-nav");

    menuButton.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
});