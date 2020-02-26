// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-product-page-js": () => import("./../src/templates/product-page.js" /* webpackChunkName: "component---src-templates-product-page-js" */),
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-account-addresses-js": () => import("./../src/pages/account/addresses.js" /* webpackChunkName: "component---src-pages-account-addresses-js" */),
  "component---src-pages-account-index-js": () => import("./../src/pages/account/index.js" /* webpackChunkName: "component---src-pages-account-index-js" */),
  "component---src-pages-account-login-js": () => import("./../src/pages/account/login.js" /* webpackChunkName: "component---src-pages-account-login-js" */),
  "component---src-pages-account-logout-js": () => import("./../src/pages/account/logout.js" /* webpackChunkName: "component---src-pages-account-logout-js" */),
  "component---src-pages-account-register-js": () => import("./../src/pages/account/register.js" /* webpackChunkName: "component---src-pages-account-register-js" */),
  "component---src-pages-cart-js": () => import("./../src/pages/cart.js" /* webpackChunkName: "component---src-pages-cart-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-search-js": () => import("./../src/pages/search.js" /* webpackChunkName: "component---src-pages-search-js" */)
}

