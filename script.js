document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-navigation');

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
  navigation.classList.add('is-open');
  document.body.classList.add('menu-open');
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

async function loadImageWithFallback(imageId, directPath, partPrefix, partCount) {
  const image = document.getElementById(imageId);
  if (!image) return;

  try {
    const directResponse = await fetch(directPath, { cache: 'no-store' });
    if (directResponse.ok) {
      image.src = URL.createObjectURL(await directResponse.blob());
      return;
    }
  } catch (error) {
    // Rebuild from source chunks below.
  }

  try {
    const partNames = Array.from({ length: partCount }, (_, index) =>
      `${partPrefix}${String(index + 1).padStart(2, '0')}`
    );
    const parts = await Promise.all(
      partNames.map(async (path) => {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return (await response.text()).trim();
      })
    );

    const binary = atob(parts.join(''));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    image.src = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  } catch (error) {
    image.alt = `${image.alt} The image could not be loaded.`;
  }
}

loadImageWithFallback('book-cover-image', 'assets/book-cover.jpg', '.build/book-cover.part', 8);
loadImageWithFallback('authors-photo-image', 'assets/authors-photo.jpg', '.build/authors-photo.part', 3);
