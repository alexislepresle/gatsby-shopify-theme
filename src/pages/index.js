import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const IndexPage = ({data}) => {
  const { edges: products } = data.allShopifyProduct
 
  return(
    <>
    <SEO title="Home" />
    <section className="hero is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
        <div className="columns is-multiline ">
          {products.map(product => ( 
          <div className="column is-3" style={{marginBottom:"40px"}}>
            <a href={`/product/${product.node.handle}`}>
              <div className="box">
                  <Img
                      fluid={product.node.images[0].localFile.childImageSharp.fluid}
                      key={product.node.images[0].localFile.id}
                      alt={product.node.title}
                  />          
                  <p className="has-text-weight-semibold">{product.node.title}</p>
                  <div className="columns">
                    <div className="column has-text-left is-uppercase">
                      {product.node.variants[0].title}
                    </div>
                    <div className="column has-text-right has-text-weight-bold is-size-5">
                      ${product.node.variants[0].price}
                    </div>
                  </div>
              </div>  
            </a>
          </div> 
          ))}
        </div>   
        </div>
      </div>
    </section>
  </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyProduct {
      edges {
        node {
          id
          title
          handle
          productType
          vendor
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
          variants {
            id
            title
            price
          }
        }
      }
    }
  }
`
