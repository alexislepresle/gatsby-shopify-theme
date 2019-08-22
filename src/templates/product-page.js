import React, { useContext, useState } from 'react' /* eslint-disable */

import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductInfo from "../components/productInfo"
import StoreContext from '../context/store'
import VariantSelectors from "../components/variantSelectors"
import PropTypes from 'prop-types'

const productPage = ({ data }) => {
    const product = data.shopifyProduct;
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState(product.variants[0]);

    const context = useContext(StoreContext);
    const productVariant = context.client.product.helpers.variantForOptions(product, variant) || variant;


    
    const handleAddToCart = () => {
        context.addVariantToCart(productVariant.shopifyId, quantity)
        console.log(context)
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
