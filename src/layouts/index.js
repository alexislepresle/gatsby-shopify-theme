import React, { Component } from 'react';
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from 'gatsby'
import StoreContext, { defaultStoreContext } from '../context/store'
import Header from "../components/header"
import "../components/all.sass"
import { navigate } from "@reach/router"
class Layout extends Component {
    state = {
        store: {
            ...defaultStoreContext,
            addVariantToCart: (variantId, quantity) => {

                this.setState(state => ({
                    store: {
                        ...state.store,
                        adding: true,
                    },
                }))

                const { checkout, client } = this.state.store
                const checkoutId = checkout.id
                const lineItemsToUpdate = [
                    { variantId, quantity: parseInt(quantity, 10) },
                ]

                return client.checkout
                    .addLineItems(checkoutId, lineItemsToUpdate)
                    .then(checkout => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout,
                                adding: false,
                            },
                        }))
                    })
            },
            addVariantToCartAndBuyNow: (variantId, quantity) => {
                this.setState(state => ({
                    store: {
                        ...state.store,
                        adding: true,
                    },
                }))

                const { checkout, client } = this.state.store
                const checkoutId = checkout.id
                const lineItemsToUpdate = [
                    { variantId, quantity: parseInt(quantity, 10) },
                ]
                return client.checkout
                    .addLineItems(checkoutId, lineItemsToUpdate)
                    .then(checkout => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout,
                                adding: false,
                            },
                        }))
                        navigate(checkout.webUrl)
                    })
            },
            removeLineItem: (client, checkoutID, lineItemID) => {
                return client.checkout
                    .removeLineItems(checkoutID, [lineItemID])
                    .then(resultat => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout: resultat,
                            },
                        }))
                    })
            },
            updateLineItem: (client, checkoutID, lineItemID, quantity) => {
                const lineItemsToUpdate = [
                    { id: lineItemID, quantity: parseInt(quantity, 10) },
                ]
                return client.checkout
                    .updateLineItems(checkoutID, lineItemsToUpdate)
                    .then(resultat => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout: resultat,
                            },
                        }))
                    })
            },
            updateFilterType: type => {
                this.setState(state => ({
                    store: {
                        ...state.store,
                        filteredType: type,
                    },
                }))
            },
            updateFilterSort: sort => {
                this.setState(state => ({
                    store: {
                        ...state.store,
                        filteredSort: sort,
                    },
                }))
            }
        }
    }

    async initializeCheckout() {
        // Check if card exits already
        const isBrowser = typeof window !== 'undefined'
        const existingCheckoutID = isBrowser
            ? localStorage.getItem('shopify_checkout_id')
            : null

        const setCheckoutInState = checkout => {
            if (isBrowser) {
                localStorage.setItem('shopify_checkout_id', checkout.id)
            }

            this.setState(state => ({
                store: {
                    ...state.store,
                    checkout,
                },
            }))
        }

        const createNewCheckout = () => this.state.store.client.checkout.create()
        const fetchCheckout = id => this.state.store.client.checkout.fetch(id)

        if (existingCheckoutID) {
            try {
                const checkout = await fetchCheckout(existingCheckoutID)

                // Make sure this cart hasn’t already been purchased.
                if (!checkout.completedAt) {
                    setCheckoutInState(checkout)
                    return
                }
            } catch (e) {
                localStorage.setItem('shopify_checkout_id', null)
            }
        }

        const newCheckout = await createNewCheckout()
        setCheckoutInState(newCheckout)
    }

    componentDidMount() {
        this.initializeCheckout()
    }

    render() {
        const { children } = this.props

        return (
            <StoreContext.Provider value={this.state.store}>

                <StaticQuery
                    query={graphql`
                        query SiteTitleQuery {
                        site {
                            siteMetadata {
                            title
                            }
                        }
                        }
                    `}
                    render={data => (
                        <>
                            <Header siteTitle={data.site.siteMetadata.title} />

                            {children}
                            <footer className="footer">
                                <div className="content has-text-centered">
                                    <p><strong>Gatsby x Shopify</strong> by <Link className="has-text-danger" to="https://www.alexislepresle.com" target="_blank" rel="noopener noreferrer">Alexis Lepresle</Link> (Fake store with <Link className="has-text-danger"  target="_blank" rel="noopener noreferrer" to="https://www.shop.dev.to">Dev.to</Link> products)</p>
                                        <Link className="button is-dark" style={{marginRight:"10px"}} target="_blank" rel="noopener noreferrer" to="https://github.com/alexislepresle/Gatsby-E-commerce-course">Github</Link>
                                        <Link className="button is-dark" target="_blank" rel="noopener noreferrer" to="https://school.alexislepresle.com/courses/build-an-ecommerce-website-with-gatsby-js-1/">Online Course</Link>
                                </div>
                            </footer>
                        </>
                    )}
                />
            </StoreContext.Provider>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;