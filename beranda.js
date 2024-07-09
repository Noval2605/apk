const background = document.querySelectorAll(
  ".tomboltema, .InfoBg, .menu-bg, .pilih-rekomen, .pilih-terbaru, .pilih-panduan, .navigation, .indicator, .PilihBgTerbaru, .coupon-card, .Ellipse30"
);
const stikerTema = document.querySelector(".stikertema");
let klikCounter = 0;
const warnaTema = ["#FF4BA2", "#FF974B", "#A54BFF"];

function setHoverStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
      .pilih-rekomen:hover,
      .pilih-terbaru:hover,
      .pilih-panduan:hover {
        background: #859649 !important;
      }
    `;
  document.head.appendChild(style);
}

function updateBackgroundColor() {
  klikCounter++;
  if (klikCounter > 3) {
    klikCounter = 0;
    background.forEach((el) => (el.style.backgroundColor = "#8db600"));
  } else {
    background.forEach(
      (el) => (el.style.backgroundColor = warnaTema[klikCounter - 1])
    );
  }
  setHoverStyles();
}

stikerTema.addEventListener("click", updateBackgroundColor);
setHoverStyles();

// Slider script
let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const slides = document.querySelector(".slider-wrapper");
const totalSlides = slides.children.length;

function moveSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSliderPosition();
}

setInterval(moveSlide, 10000); // Pindah slide setiap 10 detik

slides.addEventListener("mousedown", startDrag);
slides.addEventListener("mouseup", endDrag);
slides.addEventListener("mouseleave", endDrag);
slides.addEventListener("mousemove", drag);
slides.addEventListener("touchstart", startDrag);
slides.addEventListener("touchend", endDrag);
slides.addEventListener("touchmove", drag);

function startDrag(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  slides.style.transition = "none";
}

function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentSlide < totalSlides - 1) {
    currentSlide++;
  }

  if (movedBy > 100 && currentSlide > 0) {
    currentSlide--;
  }

  updateSliderPosition();
}

function drag(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

function updateSliderPosition() {
  const slideWidth = slides.children[0].clientWidth + 5; // Tambahkan margin
  currentTranslate = -currentSlide * slideWidth;
  prevTranslate = currentTranslate;
  slides.style.transition = "transform 0.5s ease";
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

function showRekomendasi() {
  document.querySelector(".grup-rekomen").classList.add("active");
  document.querySelector(".video-container").classList.remove("active");
}

function showPanduan() {
  document.querySelector(".video-container").classList.add("active");
  document.querySelector(".grup-rekomen").classList.remove("active");
}

function showPesanan1() {
  document.querySelector(".pesanan-container").classList.add("active");
  document.querySelector(".keranjang-container").classList.remove("active");
}

function showKeranjang() {
  document.querySelector(".pesanan-container").classList.remove("active");
  document.querySelector(".keranjang-container").classList.add("active");
}

function showBeranda() {
  document.querySelector(".container").classList.add("active");
  document.querySelector(".grup-rekomen").classList.add("active");
  document.querySelector(".video-container").classList.remove("active");
  document.querySelector(".halamanpesanan").classList.remove("active");
  document.querySelector(".halamanpromo").classList.remove("active");
  document.querySelector(".halamanakun").classList.remove("active");
}

function showPesanan() {
  document.querySelector(".container").classList.remove("active");
  document.querySelector(".halamanpesanan").classList.add("active");
  document.querySelector(".pesanan-container").classList.add("active");
  document.querySelector(".halamanpromo").classList.remove("active");
  document.querySelector(".halamanakun").classList.remove("active");
}

function showPromo() {
  document.querySelector(".container").classList.remove("active");
  document.querySelector(".halamanpesanan").classList.remove("active");
  document.querySelector(".halamanpromo").classList.add("active");
  document.querySelector(".halamanakun").classList.remove("active");
}

function showAkun() {
  document.querySelector(".container").classList.remove("active");
  document.querySelector(".halamanpesanan").classList.remove("active");
  document.querySelector(".halamanpromo").classList.remove("active");
  document.querySelector(".halamanakun").classList.add("active");
}

function showEdit() {
  document.querySelector(".editprofile-container").classList.add("active");
  document.querySelector(".akun-container").classList.remove("active");
}

function showMenuakun() {
  document.querySelector(".editprofile-container").classList.remove("active");
  document.querySelector(".akun-container").classList.add("active");
}

var cpnBtn = document.getElementById("cpnBtn");
var cpnCode = document.getElementById("cpnCode");

cpnBtn.onclick = function () {
  navigator.clipboard.writeText(cpnCode.innerHTML);
  cpnBtn.innerHTML = "Tercopy";
  setTimeout(function () {
    cpnBtn.innerHTML = "Copy";
  }, 3000);
};
