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

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const searchBox = document.querySelector('#search')
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);

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
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
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

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach(card => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none'
    }
  });
})

for (const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(link, '.filter-link');
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
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
