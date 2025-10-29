export default defineNuxtPlugin(() => {
  if (!process.client) return;

  const loadOffscreenImages = () => {
    const callback = () => {
      const offscreenImages = document.querySelectorAll('img[data-src], NuxtImg[data-src]');

      offscreenImages.forEach((img) => {
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-src');

                if (src) {
                  element.setAttribute('src', src);
                  element.removeAttribute('data-src');
                  observer.unobserve(element);
                }
              }
            });
          });

          observer.observe(img);
        } else {
          const src = img.getAttribute('data-src');
          if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
          }
        }
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2000 });
    } else {
      window.addEventListener('load', () => {
        setTimeout(callback, 2000);
      });
    }
  };

  if (process.client) {
    if (document.readyState === 'complete') {
      loadOffscreenImages();
    } else {
      window.addEventListener('load', loadOffscreenImages);
    }
  }
});