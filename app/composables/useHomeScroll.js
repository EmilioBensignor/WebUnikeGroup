export const useHomeScroll = () => {
    const scrollToSection = (sectionHash) => {
        const element = document.querySelector(sectionHash)
        if (element) {
            const headerElement = document.querySelector('header')
            const headerHeight = headerElement ? headerElement.offsetHeight : 0

            const elementPosition = element.getBoundingClientRect().top + window.scrollY

            const isFooter = sectionHash === '#footer'
            const offset = isFooter ? headerHeight : (headerHeight + 20)
            const offsetPosition = Math.max(0, elementPosition - offset)

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
