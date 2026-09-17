const featureSlides = [
  {
    image: "Assets/MockupLogo.png",
    imageAlt: "Mockup aplikasi Kompas.com",
    prefix: "KOMPAS.com",
    keyword: "Official App",
    suffix: "",
    highlight: false,
  },
  {
    image: "Assets/MockupWP.png",
    imageAlt: "Mockup fitur baca berita Kompas.com",
    prefix: "Baca Berita",
    keyword: "Lebih Nyaman",
    suffix: "",
  },
  {
    image: "Assets/MockupPodcast.png",
    imageAlt: "Mockup fitur podcast Kompas.com",
    prefix: "Dengar Berita Lewat",
    keyword: "Podcast",
    suffix: "",
  },
  {
    image: "Assets/MockupVideoBaru.png",
    imageAlt: "Mockup fitur video Kompas.com",
    prefix: "",
    keyword: "Video Berita",
    suffix: " Terbaru & Terkini",
  },
];

const visual = document.querySelector("[data-keyword-visual]");
const title = document.querySelector("[data-keyword-title]");
const transitionDuration = 420;
const showcaseDuration = 1000;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let activeSlide = 0;

featureSlides.slice(1).forEach((feature) => {
  const image = new Image();
  image.src = feature.image;
});

function renderTitle(feature) {
  title.replaceChildren();

  if (feature.prefix) {
    title.append(`${feature.prefix} `);
  }

  if (feature.highlight === false) {
    title.append(feature.keyword);
  } else {
    const keyword = document.createElement("mark");
    keyword.textContent = feature.keyword;
    title.append(keyword);
  }

  if (feature.suffix) {
    title.append(feature.suffix);
  }
}

function showNextFeature() {
  visual.classList.add("is-leaving");
  title.classList.add("is-leaving");

  window.setTimeout(() => {
    activeSlide = (activeSlide + 1) % featureSlides.length;
    const nextFeature = featureSlides[activeSlide];

    visual.src = nextFeature.image;
    visual.alt = nextFeature.imageAlt;
    renderTitle(nextFeature);

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
