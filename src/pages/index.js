import React from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductList from '../components/productList';

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <ProductList data={data} />
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
          createdAt(fromNow: true)
          publishedAt
          productType
          vendor
          priceRange {
            maxVariantPrice {
              amount
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
