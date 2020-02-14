var plugins = [{
      plugin: require('/Users/alex/Documents/freelance/Gatsby_Ecommerce/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/alex/Documents/freelance/Gatsby_Ecommerce/node_modules/gatsby-plugin-layout/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/alex/Documents/freelance/Gatsby_Ecommerce/node_modules/gatsby-plugin-apollo-shopify/gatsby-ssr'),
      options: {"plugins":[],"shopName":"gatsby-shop-course","accessToken":"52ac7057b919bddaa71b290aa21c7c4c"},
    },{
      plugin: require('/Users/alex/Documents/freelance/Gatsby_Ecommerce/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-146773242-1"},
    },{
      plugin: require('/Users/alex/Documents/freelance/Gatsby_Ecommerce/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-shopify-theme","short_name":"gatsby-shopify","start_url":"/","background_color":"#333","theme_color":"#333","display":"minimal-ui","icon":"src/images/gatsby-icon.png"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
