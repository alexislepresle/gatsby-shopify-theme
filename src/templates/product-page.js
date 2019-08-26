import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */

import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductInfo from "../components/productInfo"
import StoreContext from '../context/store'
import VariantSelectors from "../components/variantSelectors"
import PropTypes from 'prop-types'
import Img from "gatsby-image"

const productPage = ({ data }) => {
    const product = data.shopifyProduct;
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState(product.variants[0]);
    const context = useContext(StoreContext);
    const productVariant = context.client.product.helpers.variantForOptions(product, variant) || variant;
    //const [available, setAvailable] = useState(productVariant.availableForSale)


    useEffect(() => {
        let defaultOptionValues = {}
        product.options.forEach(selector => {
            defaultOptionValues[selector.name] = selector.values[0]
        })
        setVariant(defaultOptionValues)
    }, [])

    useEffect(() => {
        checkAvailability(product.shopifyId)
    }, [productVariant])

    const checkAvailability = productId => {
        context.client.product.fetch(productId).then((product) => {
            // this checks the currently selected variant for availability
            const result = product.variants.filter(
                variant => variant.id === productVariant.shopifyId
            )
            //setAvailable(result[0].available)
        })
    }

    const handleAddToCart = () => {
        console.log(context.client.product.helpers)
        context.addVariantToCart(productVariant.shopifyId, quantity)
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
        <>
            <SEO title={product.title} />
            <section className="hero is-dark is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-multiline is-vcentered">
                            <div className="column" style={{ marginBottom: "40px" }}>
                                <div className="box">
                                    {product.images.map(x => (
                                        <Img
                                            fluid={x.localFile.childImageSharp.fluid}
                                            key={x.localFile.id}
                                            alt={product.title}
                                        />
                                    ))}
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
                                                key={options.id.toString()}
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
                                        //disabled={!available}
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
productPage.propTypes = {
    addVariantToCart: PropTypes.func,
}
export default productPage

export const query = graphql`
  query($id: String!){
                shopifyProduct(handle: {eq: $id}) {
                handle
            id
            title
            handle
            productType
            descriptionHtml
            shopifyId
            options {
              id
              name
              values
            }
            variants {
                id
                title
                price
                availableForSale
                shopifyId
                selectedOptions {
                  name
                  value
                }
              }
              images {
                originalSrc
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
        } 
      }
    `
