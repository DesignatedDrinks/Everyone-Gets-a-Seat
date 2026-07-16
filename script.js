document.getElementById('year').textContent = new Date().getFullYear();

async function loadBookCover() {
  const image = document.getElementById('book-cover-image');
  if (!image) return;

  try {
    const directResponse = await fetch('assets/book-cover.jpg', { cache: 'no-store' });
    if (directResponse.ok) {
      image.src = URL.createObjectURL(await directResponse.blob());
      return;
    }
  } catch (error) {
    // Fall back to rebuilding the image from the repository source chunks.
  }

  try {
    const partNames = Array.from({ length: 8 }, (_, index) =>
      `.build/book-cover.part${String(index + 1).padStart(2, '0')}`
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
    image.alt = 'The Everyone Gets a Seat book cover could not be loaded.';
  }
}

loadBookCover();
