const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-product-page-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/templates/product-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/404.js"))),
  "component---src-pages-account-addresses-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/account/addresses.js"))),
  "component---src-pages-account-index-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/account/index.js"))),
  "component---src-pages-account-login-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/account/login.js"))),
  "component---src-pages-account-logout-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/account/logout.js"))),
  "component---src-pages-account-register-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/account/register.js"))),
  "component---src-pages-cart-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/cart.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/index.js"))),
  "component---src-pages-search-js": hot(preferDefault(require("/Users/alex/Documents/freelance/Gatsby_Ecommerce/src/pages/search.js")))
}

