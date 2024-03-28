const observableEls = document.querySelectorAll(".hidden")
const navOpenerEl = document.querySelector(".nav-opener")
const navLinksContainer = document.querySelector(".nav-links-container")
const whyAsudeImageContEl = document.querySelector(
  "#whyasude .container .img-container"
)
const testimonialEl = document.querySelector("#testimonials")
const cardEls = document.querySelectorAll(".card")

// CAROUSEL
{
  let interval
  let currentCarouselItem = 1
  const INTERVAL_TIME = 15000
  const carouselEL = document.querySelector("#testimonials .carousel")
  const carouselItemCount = carouselEL.childElementCount
  const carouselItemChanger = document.querySelector(
    "#testimonials .carousel-item-changer"
  )

  // FUNCTIONS
  const setCarousel = item =>
    carouselEL.scrollTo(
      document.querySelector(`#testimonials .carousel .carousel-item`)
        .offsetWidth *
        (item - 1),
      0
    )

  const changeSelected = (item, selected) =>
    document
      .querySelector(
        `#testimonials .carousel-item-changer div[data-item="${item}"]`
      )
      .classList.toggle("selected", selected)

  const changeCarouselItem = newCurrent => {
    currentCarouselItem =
      newCurrent > carouselItemCount
        ? newCurrent % carouselItemCount
        : newCurrent
    setCarousel(currentCarouselItem)
  }

  function intervalHandler() {
    changeSelected(currentCarouselItem, false)
    changeCarouselItem(currentCarouselItem + 1)
    changeSelected(currentCarouselItem, true)
  }

  function handleClick(e) {
    const item = parseInt(e.target.dataset.item)
    if (!item) return
    clearInterval(interval)
    changeSelected(currentCarouselItem, false)
    changeCarouselItem(item)
    changeSelected(currentCarouselItem, true)
    interval = setInterval(intervalHandler, INTERVAL_TIME)
  }
  // END OF FUNCTIONS

  // EVENT HANDLERS
  carouselItemChanger.onclick = handleClick

  const testimonialObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return clearInterval(interval)
    interval = setInterval(intervalHandler, INTERVAL_TIME)
  })

  testimonialObserver.observe(testimonialEl)
}
// END OF CAROUSEL

// NAVBAR
navLinksContainer.onclick = e => {
  if (e.target.tagName.toLowerCase() === "a") return
  navLinksContainer.classList.toggle("show", false)
}
navOpenerEl.onclick = () => navLinksContainer.classList.toggle("show", true)
// END OF NAVBAR

const observer = new IntersectionObserver(observerCallback)

function changeCardsTransition() {
  cardEls.forEach((child, i) => {
    child.style.transitionDelay =
      window.innerWidth < 1000 ? "0s" : 0.2 * i + "s"
  })
}

function handleResize() {
  setCarousel(currentCarouselItem)
  changeCardsTransition()
}

function observerCallback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.toggle("show", true)
    } else {
      entry.target.classList.toggle("show", false)
    }
  })
}

observableEls.forEach(el => observer.observe(el))

changeCardsTransition()
window.onresize = handleResize

setInterval(() => {
  whyAsudeImageContEl.classList.toggle("show-top-img")
}, 5000)
