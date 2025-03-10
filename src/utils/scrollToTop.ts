export default function scrollToTop() {
    const homeElement = document.querySelector("div[data-at-home=true]")
    if (homeElement === null) window.scrollTo({ top: 0, behavior: "smooth" });
    else homeElement.scrollTo({ top: 0, behavior: "smooth" });
};
