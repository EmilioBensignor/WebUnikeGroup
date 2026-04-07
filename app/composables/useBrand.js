export const useBrand = () => {
    const route = useRoute()

    const brand = computed(() => {
        const path = route.path

        if (path.startsWith('/waterplast')) return 'waterplast'
        if (path.startsWith('/rohermet')) return 'rohermet'

        return 'default'
    })

    const isBrand = (brandName) => brand.value === brandName

    const isWaterplast = computed(() => brand.value === 'waterplast')
    const isRohermet = computed(() => brand.value === 'rohermet')

    return {
        brand,
        isBrand,
        isWaterplast,
        isRohermet
    }
}
