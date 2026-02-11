/* ------------------ tailwind dark mode ------------------ */

if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const toggleThemeBtn = document.getElementById('theme-toggle');

toggleThemeBtn.addEventListener('click', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
});

/* ------------------ get menus ------------------ */

const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const userBtn = document.getElementById("user-menu-btn");
const userMenu = document.getElementById("user-menu");

/* ------------------ mobile menu ------------------ */

dropDownMenu({ btn: mobileBtn, menu: mobileMenu, closeMenu: userMenu });

/* ------------------ user menu ------------------ */

dropDownMenu({ btn: userBtn, menu: userMenu, closeMenu: mobileMenu });

/* ------------------ close when clicking outside ------------------ */

document.addEventListener("click", () => {
  mobileMenu?.classList.add("opacity-0", "invisible", "translate-y-2");
  userMenu?.classList.add("opacity-0", "invisible", "translate-y-2");
});

/* ------------------ dropDownMenu Function ------------------ */

function dropDownMenu({ btn, menu, closeMenu } = {}) {
  if (btn && menu) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      menu.classList.toggle("opacity-0");
      menu.classList.toggle("invisible");
      menu.classList.toggle("translate-y-2");

      closeMenu?.classList.add("opacity-0", "invisible", "translate-y-2");
    });
  }
}