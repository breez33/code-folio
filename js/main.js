const theme = 'theme'
const dataTheme = 'data-theme'
const themeTab = '.theme-tab'
const switcherBtn = '.switcher-btn'
const dark = 'dark'
const light = 'light'
const open = 'open'
const active = 'active'


const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elem, selector) => {
  const activeElem = `${selector}.${active}`
  if (document.querySelector(activeElem) !== null) {
    document.querySelector(activeElem).classList.remove(active);
  }
  
  elem.classList.add(active);
}

const setTheme = (currentTheme) => {
  if (currentTheme === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark)
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
}

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  })

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function() {
  const tab = this.closest('.theme-panel');
  if (!tab.className.includes(open)) {
    tab.classList.add(open)
  } else {
    tab.classList.remove(open)
  }
})

for (const elem of switcher) {
  elem.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    // Set active state
    setActive(elem, switcherBtn);
    setTheme(toggle);
  })
}

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
