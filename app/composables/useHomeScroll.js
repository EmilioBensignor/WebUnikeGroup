export const useHomeScroll = () => {
    const scrollToSection = (sectionHash) => {
        // Usar el comportamiento nativo del navegador con hash
        // Solo funciona cuando ya estamos en la home
        const element = document.querySelector(sectionHash)
        if (element) {
            const headerElement = document.querySelector('header')
            const headerHeight = headerElement ? headerElement.offsetHeight : 0

            // Obtener la posición exacta del elemento
            const elementPosition = element.getBoundingClientRect().top + window.scrollY

            // Para el footer, no restar tanto (solo altura del header)
            // Para otras secciones, restar header + padding adicional
            const isFooter = sectionHash === '#footer'
            const offset = isFooter ? headerHeight : (headerHeight + 20)
            const offsetPosition = Math.max(0, elementPosition - offset)

            // Hacer scroll suave
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return {
        scrollToSection
    }
}
