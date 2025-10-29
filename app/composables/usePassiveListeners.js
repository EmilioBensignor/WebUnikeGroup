export const usePassiveListeners = () => {
  const listeners = [];

  const addPassiveListener = (element, event, handler) => {
    if (!element) return;

    const options = { passive: true, capture: false };
    element.addEventListener(event, handler, options);

    listeners.push({ element, event, handler, options });
  };

  const removeListener = (element, event, handler) => {
    if (!element) return;

    element.removeEventListener(event, handler, { passive: true });

    const index = listeners.findIndex(
      (l) => l.element === element && l.event === event && l.handler === handler
    );
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  const removeAllListeners = () => {
    listeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    listeners.length = 0;
  };

  const addThrottledScrollListener = (handler, delay = 100) => {
    let lastRun = 0;

    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastRun >= delay) {
        handler();
        lastRun = now;
      }
    };

    addPassiveListener(window, 'scroll', throttledHandler);

    return () => removeListener(window, 'scroll', throttledHandler);
  };

  const addThrottledResizeListener = (handler, delay = 100) => {
    let lastRun = 0;

    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastRun >= delay) {
        handler();
        lastRun = now;
      }
    };

    addPassiveListener(window, 'resize', throttledHandler);

    return () => removeListener(window, 'resize', throttledHandler);
  };

  onUnmounted(() => {
    removeAllListeners();
  });

  return {
    addPassiveListener,
    removeListener,
    removeAllListeners,
    addThrottledScrollListener,
    addThrottledResizeListener
  };
};