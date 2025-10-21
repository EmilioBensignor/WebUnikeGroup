export const useWaterplastSeo = () => {
  const config = useRuntimeConfig()

  /**
   * Configura los meta tags SEO para una página de categoría
   * @param {Object} categoriaData - Datos de la categoría desde el CMS
   */
  const setSeoForCategoria = (categoriaData) => {
    if (!categoriaData) return

    const title = `${categoriaData.nombre} - Waterplast | Unike Group`
    
    const caracteristicas = [
      categoriaData.caracteristica1,
      categoriaData.caracteristica2,
      categoriaData.caracteristica3
    ].filter(Boolean).join('. ')
    
    const description = `Descubre nuestros productos de ${categoriaData.nombre} Waterplast en Argentina. ${caracteristicas}. Soluciones innovadoras para almacenamiento y tratamiento de agua con calidad garantizada.`
    
    const keywords = [
      categoriaData.nombre,
      'Waterplast',
      'Unike Group',
      categoriaData.caracteristica1,
      categoriaData.caracteristica2,
      categoriaData.caracteristica3,
      'tanques de agua Argentina',
      'almacenamiento de agua',
      'sistemas hídricos',
      'soluciones innovadoras'
    ].filter(Boolean).join(', ')

    const ogImage = categoriaData.imagen_menu 
      ? categoriaData.imagen_menu
      : `${config.public.siteUrl}/images/waterplast/og-default.jpg`

    useSeoMeta({
      title,
      description,
      keywords,
      
      ogTitle: `${categoriaData.nombre} - Waterplast`,
      ogDescription: description,
      ogImage,
      ogImageAlt: `${categoriaData.nombre} - Productos Waterplast`,
      ogSiteName: 'Waterplast - Unike Group',
      ogType: 'website',
      ogUrl: `${config.public.siteUrl}/waterplast/${categoriaData.slug}`,
      
      twitterCard: 'summary_large_image',
      twitterTitle: `${categoriaData.nombre} - Waterplast`,
      twitterDescription: description.length > 200 ? description.substring(0, 197) + '...' : description,
      twitterImage: ogImage,
      twitterImageAlt: `${categoriaData.nombre} - Productos Waterplast`,
      
      robots: 'index, follow',
      author: 'Unike Group',
      language: 'es-AR'
    })

    useHead({
      titleTemplate: null, 
      link: [
        {
          rel: 'canonical',
          href: `${config.public.siteUrl}/waterplast/${categoriaData.slug}`
        }
      ]
    })
  }

  /**
   * Configura los meta tags SEO para una página de producto
   * @param {Object} productoData - Datos del producto desde el CMS
   * @param {Object} categoriaData - Datos de la categoría del producto (opcional)
   */
  const setSeoForProducto = (productoData, categoriaData = null) => {
    if (!productoData) return

    const categoriaNombre = categoriaData?.nombre || productoData.categoria?.nombre || ''
    const categoriaSlug = categoriaData?.slug || productoData.categoria?.slug || ''
    
    const title = categoriaNombre 
      ? `${productoData.nombre} - ${categoriaNombre} Waterplast | Unike Group`
      : `${productoData.nombre} - Waterplast | Unike Group`
    
    let description = ''
    if (productoData.descripcion) {
      description = `${productoData.descripcion} - ${categoriaNombre} Waterplast. `
    } else {
      description = `${productoData.nombre} - ${categoriaNombre} Waterplast. `
    }
    
    const caracteristicas = []
    if (productoData.capacidad_lts) {
      caracteristicas.push(`Capacidad ${productoData.capacidad_lts} litros`)
    }
    if (productoData.orientacion) {
      caracteristicas.push(`Orientación ${productoData.orientacion}`)
    }
    if (productoData.color) {
      caracteristicas.push(`Color ${productoData.color}`)
    }
    
    if (caracteristicas.length > 0) {
      description += caracteristicas.join('. ') + '. '
    }
    
    description += 'Calidad, durabilidad y garantía en productos para almacenamiento de agua en Argentina.'
    
    const keywords = [
      productoData.nombre,
      categoriaNombre,
      'Waterplast',
      'Unike Group',
      productoData.capacidad_lts ? `${productoData.capacidad_lts} litros` : null,
      productoData.orientacion,
      productoData.tecnologia,
      'tanques de agua Argentina',
      'almacenamiento de agua',
      'calidad garantizada'
    ].filter(Boolean).join(', ')

    const ogImage = productoData.imagen_principal 
      ? productoData.imagen_principal
      : (productoData.imagen ? productoData.imagen : `${config.public.siteUrl}/images/waterplast/og-default.jpg`)

    useSeoMeta({
      title,
      description,
      keywords,
      
      ogTitle: categoriaNombre ? `${productoData.nombre} - ${categoriaNombre}` : productoData.nombre,
      ogDescription: description,
      ogImage,
      ogImageAlt: `${productoData.nombre} - ${categoriaNombre} Waterplast`,
      ogSiteName: 'Waterplast - Unike Group',
      ogType: 'product',
      ogUrl: categoriaSlug ? `${config.public.siteUrl}/waterplast/${categoriaSlug}/${productoData.slug}` : undefined,
      
      twitterCard: 'summary_large_image',
      twitterTitle: categoriaNombre ? `${productoData.nombre} - ${categoriaNombre}` : productoData.nombre,
      twitterDescription: description.length > 200 ? description.substring(0, 197) + '...' : description,
      twitterImage: ogImage,
      twitterImageAlt: `${productoData.nombre} - ${categoriaNombre} Waterplast`,
      
      robots: 'index, follow',
      author: 'Unike Group',
      language: 'es-AR'
    })

    if (categoriaSlug && productoData.slug) {
      useHead({
        titleTemplate: null, 
        link: [
          {
            rel: 'canonical',
            href: `${config.public.siteUrl}/waterplast/${categoriaSlug}/${productoData.slug}`
          }
        ]
      })
    } else {
      useHead({
        titleTemplate: null 
      })
    }
  }

  return {
    setSeoForCategoria,
    setSeoForProducto
  }
}
