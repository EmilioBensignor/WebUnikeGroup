export const useRohermetSeo = () => {
  const config = useRuntimeConfig()

  const getBaseUrl = () => {
    return config.public.siteUrl || 'https://web-unike-group.vercel.app'
  }

  const setSeoForCategoria = (categoriaData) => {
    if (!categoriaData) return

    const title = `${categoriaData.nombre} - Rohermet | Unike Group`

    const caracteristicas = [
      categoriaData.caracteristica1,
      categoriaData.caracteristica2,
      categoriaData.caracteristica3
    ].filter(Boolean).join('. ')

    const description = `Descubre nuestros productos de ${categoriaData.nombre} Rohermet en Argentina. ${caracteristicas}. Soluciones en acero inoxidable con calidad y durabilidad garantizada.`

    const keywords = [
      categoriaData.nombre,
      'Rohermet',
      'Unike Group',
      categoriaData.caracteristica1,
      categoriaData.caracteristica2,
      categoriaData.caracteristica3,
      'acero inoxidable Argentina',
      'tanques de acero',
      'soluciones industriales'
    ].filter(Boolean).join(', ')

    const baseUrl = getBaseUrl()
    const ogImage = categoriaData.imagen_xl_categorias
      || categoriaData.imagen
      || `${baseUrl}/images/rohermet/og-default.jpg`

    useSeoMeta({
      title,
      description,
      keywords,

      ogTitle: `${categoriaData.nombre} - Rohermet`,
      ogDescription: description,
      ogImage,
      ogImageAlt: `${categoriaData.nombre} - Productos Rohermet`,
      ogSiteName: 'Rohermet - Unike Group',
      ogType: 'website',
      ogUrl: `${baseUrl}/rohermet/${categoriaData.slug}`,

      twitterCard: 'summary_large_image',
      twitterTitle: `${categoriaData.nombre} - Rohermet`,
      twitterDescription: description.length > 200 ? description.substring(0, 197) + '...' : description,
      twitterImage: ogImage,
      twitterImageAlt: `${categoriaData.nombre} - Productos Rohermet`,

      robots: 'index, follow',
      author: 'Unike Group',
      language: 'es-AR'
    })

    useHead({
      titleTemplate: null,
      link: [
        {
          rel: 'canonical',
          href: `${baseUrl}/rohermet/${categoriaData.slug}`
        }
      ]
    })
  }

  const setSeoForProducto = (productoData, categoriaData = null) => {
    if (!productoData) return

    const categoriaNombre = categoriaData?.nombre || productoData.categoria?.nombre || ''
    const categoriaSlug = categoriaData?.slug || productoData.categoria?.slug || ''

    const title = categoriaNombre
      ? `${productoData.nombre} - ${categoriaNombre} Rohermet | Unike Group`
      : `${productoData.nombre} - Rohermet | Unike Group`

    let description = ''
    if (productoData.descripcion) {
      description = `${productoData.descripcion} - ${categoriaNombre} Rohermet. `
    } else {
      description = `${productoData.nombre} - ${categoriaNombre} Rohermet. `
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

    description += 'Calidad, durabilidad y garantía en productos de acero inoxidable en Argentina.'

    const keywords = [
      productoData.nombre,
      categoriaNombre,
      'Rohermet',
      'Unike Group',
      productoData.capacidad_lts ? `${productoData.capacidad_lts} litros` : null,
      productoData.orientacion,
      productoData.tecnologia,
      'acero inoxidable Argentina',
      'tanques de acero',
      'calidad garantizada'
    ].filter(Boolean).join(', ')

    const baseUrl = getBaseUrl()
    const ogImage = productoData.imagen_principal
      || productoData.imagen
      || `${baseUrl}/images/rohermet/og-default.jpg`

    useSeoMeta({
      title,
      description,
      keywords,

      ogTitle: categoriaNombre ? `${productoData.nombre} - ${categoriaNombre}` : productoData.nombre,
      ogDescription: description,
      ogImage,
      ogImageAlt: `${productoData.nombre} - ${categoriaNombre} Rohermet`,
      ogSiteName: 'Rohermet - Unike Group',
      ogType: 'product',
      ogUrl: categoriaSlug ? `${baseUrl}/rohermet/${categoriaSlug}/${productoData.slug}` : undefined,

      twitterCard: 'summary_large_image',
      twitterTitle: categoriaNombre ? `${productoData.nombre} - ${categoriaNombre}` : productoData.nombre,
      twitterDescription: description.length > 200 ? description.substring(0, 197) + '...' : description,
      twitterImage: ogImage,
      twitterImageAlt: `${productoData.nombre} - ${categoriaNombre} Rohermet`,

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
            href: `${baseUrl}/rohermet/${categoriaSlug}/${productoData.slug}`
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

export const useWaterplastSeo = () => {
  const config = useRuntimeConfig()

  const getBaseUrl = () => {
    return config.public.siteUrl || 'https://web-unike-group.vercel.app'
  }
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

    const baseUrl = getBaseUrl()
    const ogImage = categoriaData.imagen_menu
      ? categoriaData.imagen_menu
      : `${baseUrl}/images/waterplast/og-default.jpg`

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
      ogUrl: `${baseUrl}/waterplast/${categoriaData.slug}`,

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
          href: `${baseUrl}/waterplast/${categoriaData.slug}`
        }
      ]
    })
  }

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

    const baseUrl = getBaseUrl()
    const ogImage = productoData.imagen_principal
      ? productoData.imagen_principal
      : (productoData.imagen ? productoData.imagen : `${baseUrl}/images/waterplast/og-default.jpg`)

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
      ogUrl: categoriaSlug ? `${baseUrl}/waterplast/${categoriaSlug}/${productoData.slug}` : undefined,

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
            href: `${baseUrl}/waterplast/${categoriaSlug}/${productoData.slug}`
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