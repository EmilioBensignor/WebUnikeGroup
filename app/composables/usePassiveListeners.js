/**
 * Composable para manejar event listeners pasivos
 * Mejora la performance del scroll y otros eventos
 */

export const usePassiveListeners = () => {
  const listeners = [];

  /**
   * Agregar event listener pasivo
   * Los passive listeners permiten scroll fluido sin bloqueos
   */
  const addPassiveListener = (element, event, handler) => {
    if (!element) return;

    const options = { passive: true, capture: false };
    element.addEventListener(event, handler, options);

    // Guardar referencia para cleanup
    listeners.push({ element, event, handler, options });
  };

  /**
   * Remover event listener
   */
  const removeListener = (element, event, handler) => {
    if (!element) return;

    element.removeEventListener(event, handler, { passive: true });

    // Limpiar de la lista
    const index = listeners.findIndex(
      (l) => l.element === element && l.event === event && l.handler === handler
    );
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  /**
   * Remover todos los listeners agregados por este composable
   */
  const removeAllListeners = () => {
    listeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    listeners.length = 0;
  };

  /**
   * Agregar listeners para scroll con throttle integrado
   */
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

  /**
   * Agregar listeners para resize con throttle
   */
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

  /**
   * Cleanup on unmount
   */
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