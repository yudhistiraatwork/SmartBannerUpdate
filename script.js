const featureSlides = [
  {
    image: "Assets/MockupLogo.png",
    imageAlt: "Mockup aplikasi Kompas.com",
    title: "KOMPAS.com Official App",
  },
  {
    image: "Assets/MockupWP.png",
    imageAlt: "Mockup aplikasi Kompas.com",
    title: "Baca Berita Lebih Nyaman",
  },
  {
    image: "Assets/MockupPodcast.png",
    imageAlt: "Mockup fitur podcast Kompas.com",
    title: "Dengar Berita Lewat Podcast",
  },
  {
    image: "Assets/MockupVideo.png",
    imageAlt: "Mockup fitur video Kompas.com",
    title: "Tonton Berita, Lebih Seru",
  },
];

const visual = document.querySelector("[data-feature-visual]");
const title = document.querySelector("[data-feature-title]");
const transitionDuration = 420;
const showcaseDuration = 2500;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let activeSlide = 0;

featureSlides.slice(1).forEach((feature) => {
  const image = new Image();
  image.src = feature.image;
});

function showNextFeature() {
  visual.classList.add("is-leaving");
  title.classList.add("is-leaving");

  window.setTimeout(() => {
    activeSlide = (activeSlide + 1) % featureSlides.length;
    const nextFeature = featureSlides[activeSlide];

    visual.src = nextFeature.image;
    visual.alt = nextFeature.imageAlt;
    title.textContent = nextFeature.title;

    visual.classList.remove("is-leaving");
    title.classList.remove("is-leaving");
    void visual.offsetWidth;
    void title.offsetWidth;
    visual.classList.add("is-entering");
    title.classList.add("is-entering");

    window.setTimeout(() => {
      visual.classList.remove("is-entering");
      title.classList.remove("is-entering");
      window.setTimeout(showNextFeature, showcaseDuration);
    }, transitionDuration);
  }, transitionDuration);
}

if (!reducedMotion) {
  window.setTimeout(showNextFeature, showcaseDuration);
}
