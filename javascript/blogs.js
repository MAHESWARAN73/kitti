const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".moving");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
const blogPara = document.querySelector(".blogPara");

let isDragging = false;
let isAutoPlay = true;
let startX;
let startScrollLeft;
let timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    updateBlogPara(btn.id); // Pass the id of the clicked arrow (left or right)
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => {
    carousel.scrollLeft += firstCardWidth;
    updateBlogPara("right"); // Simulate a right arrow click when autoPlay scrolls
  }, 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

function updateBlogPara(arrowDirection) {
  const visibleCard = [...carousel.children].find((card) => {
    const cardRect = card.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    return (
      cardRect.left >= carouselRect.left && cardRect.right <= carouselRect.right
    );
  });

  let updatedCard = visibleCard;
  if (arrowDirection === "left") {
    // Find the card to the left of the currently visible card
    updatedCard = visibleCard.previousElementSibling;
  } else if (arrowDirection === "right") {
    // Find the card to the right of the currently visible card
    updatedCard = visibleCard.nextElementSibling;
  }

  if (updatedCard) {
    blogPara.textContent =
      updatedCard.querySelector(".blog-content").textContent;
  }
}
