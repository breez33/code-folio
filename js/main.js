const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Full Site Modal 'open buttons'
for (const elem of openModal) {
  elem.addEventListener('click', function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible)
  });
}

for (const elem of closeModal) {
  elem.addEventListener('click', function() {
    this.closest('.is-visible').classList.remove(isVisible);
  })
}
