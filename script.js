let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Show slide on hover
const heroSlider = document.querySelector(".hero-slider");
heroSlider.addEventListener("mouseenter", () => plusSlides(1)); // change on hover

// Main slide function
function showSlides(n) {
  let slides = document.querySelectorAll(".slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex - 1].style.display = "block";
}

// to play
const thumbnail = document.getElementById("thumbnail");
thumbnail.addEventListener("click", function () {
  this.outerHTML = `
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/C3LzJoHkS6Q?autoplay=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>`;
});

// form
// Get the modal element
const modal = document.getElementById("brochureModal");
function openModal() {
  const showForm = document.getElementById("brochureModal");
  showForm.style.display = "flex";
}


function closeModal()
{
    const closeForm = document.getElementById("brochureModal");
    closeForm.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
