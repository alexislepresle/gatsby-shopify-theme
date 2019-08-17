import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const productPage = ({ data }) => {
    const product = data.shopifyProduct

    return (
        <Layout>
            <SEO title="Home" />
            <section className="hero is-dark is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-multiline ">
                            <div className="column" style={{ marginBottom: "40px" }}>
                                <div className="box">
                                    <figure>
                                        <img src={product.images[0].originalSrc} alt={product.title} />
                                    </figure>
                                </div>
                            </div>
                            <div className="column" style={{ marginBottom: "40px" }}>
                                <div className="box">
                                    <p className="has-text-weight-semibold is-size-2">{product.title}</p>
                                    <p className="has-text-left is-uppercase  is-size-5">{product.variants[0].title}</p>
                                    <p className=" has-text-right has-text-weight-bold is-size-3">${product.variants[0].price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
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
        variants {
            price
            title
            availableForSale
        }
    } 
  }
`
