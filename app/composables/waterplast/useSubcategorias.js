export const useWaterplastSubcategorias = () => {
    const supabase = useSupabaseClient()
    const loading = ref(false)
    const subcategorias = ref([])
    const currentSubcategoria = ref(null)
    const error = ref(null)

    const fetchSubcategorias = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-subcategorias')
                .select('*')
                .order('numero_orden', { ascending: true })

            if (supabaseError) throw supabaseError

            subcategorias.value = data || []
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener subcategorías:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchSubcategoriasByCategoria = async (categoriaId) => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-subcategorias')
                .select('*')
                .eq('categoria_id', categoriaId)
                .order('numero_orden', { ascending: true })

            if (supabaseError) throw supabaseError

            subcategorias.value = data || []
            return data || []
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener subcategorías por categoría:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchSubcategoriaById = async (id) => {
        loading.value = true
        error.value = null
        currentSubcategoria.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-subcategorias')
                .select('*')
                .eq('id', id)
                .single()

            if (supabaseError) throw supabaseError

            currentSubcategoria.value = data
            return data
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener subcategoría:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        subcategorias,
        currentSubcategoria,
        loading,
        error,
        fetchSubcategorias,
        fetchSubcategoriasByCategoria,
        fetchSubcategoriaById
    }
}
