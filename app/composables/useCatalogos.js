export const useCatalogos = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const getCatalogoPdfUrl = (storagePath) => {
        if (!storagePath) return null
        return `${config.public.supabase.url}/storage/v1/object/public/catalogos/${storagePath}`
    }

    const fetchCatalogoByMarca = async (marca) => {
        const { data, error } = await supabase
            .from('catalogos')
            .select('catalogo_pdf')
            .eq('marca', marca)
            .single()

        if (error || !data?.catalogo_pdf) return null
        return getCatalogoPdfUrl(data.catalogo_pdf)
    }

    return {
        fetchCatalogoByMarca,
        getCatalogoPdfUrl,
    }
}
