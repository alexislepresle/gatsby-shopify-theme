import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductInfo from "../components/productInfo"
import Store from '../context/store'
import VariantSelectors from "../components/variantSelectors"

const productPage = ({ data }) => {
    const product = data.shopifyProduct;
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState(product.variants[0]);

    const context = useContext(Store);
    const productVariant = context.client.product.helpers.variantForOptions(product, variant) || variant;
    const [available, setAvailable] = useState(productVariant.availableForSale)

    const handleSubmit = callback => event => {
        event.preventDefault();
        callback(productVariant.shopifyId, quantity);
        console.log(context.checkout.lineItems)
      };
    

    useEffect(() => {
        CheckIfAvailable(product.shopifyId)
    }, [productVariant])

    const CheckIfAvailable = (shopifyId) => {
        context.client.product.fetch(shopifyId).then((product) => {
            const result = product.variants.filter(
                variant => variant.id === productVariant.shopifyId
            )
            setAvailable(result[0].available)
        })
    }

    const handleOptionChange = event => {
        const { target } = event
        setVariant(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }


    function increaseQuantity() {
        setQuantity(q => q + 1);
    }

    function decreaseQuantity() {
        setQuantity(q => (q <= 1 ? 1 : q - 1));
    }


    return (
        <Store.Consumer>
            {({ addVariantToCart }) => (

            <Layout>
                <SEO title={product.title} />
                <section className="hero is-dark is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-multiline is-vcentered">
                                <div className="column" style={{ marginBottom: "40px" }}>
                                    <div className="box">
                                        <figure>
                                            <img src={product.images[0].originalSrc} alt={product.title} />
                                        </figure>
                                    </div>
                                </div>
                                <div className="column is-5" style={{ marginBottom: "40px" }}>
                                    <div className="box">
                                        <ProductInfo
                                            product={product}
                                        />
                                        {
                                            product.options.map(options => (
                                                <VariantSelectors
                                                    onChange={handleOptionChange}
                                                    options={options}
                                                />
                                            ))
                                        }
                                        <div className="field is-horizontal" style={{ marginTop: "10px" }}>
                                            <div className="field-label is-normal">
                                                <label className="label">Quantity :</label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field has-addons">
                                                    <div className="control">
                                                        <button className="button is-link" onClick={decreaseQuantity}>
                                                            -
                                                        </button>
                                                    </div>
                                                    <div className="control">
                                                        <button className="button">
                                                            {quantity}
                                                        </button>
                                                    </div>
                                                    <div className="control">
                                                        <button className="button is-link" onClick={increaseQuantity}>
                                                            +
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />
                                        <button
                                            className="button is-link is-medium is-fullwidth"
                                            type="submit"
                                            disabled={!available}
                                            onClick={handleSubmit(addVariantToCart)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
            )}
        </Store.Consumer>
    )
}

export default productPage

export const query = graphql`
  query($id: String!){
                shopifyProduct(handle: {eq: $id}) {
                handle
        images {
                originalSrc
            }
            title
            productType
        options {
                id
            name
            values
        }
        variants {
                price
            title
            shopifyId
            availableForSale
            selectedOptions {
                value
            }
            }
        } 
      }
    `
