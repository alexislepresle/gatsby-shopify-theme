import React, { useState, useEffect} from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductBox from "../components/productBox"

const IndexPage = ({ data }) => {
    const { edges: products } = data.allShopifyProduct

    const [search, setSearch] = useState("")

    useEffect(
        () => {
            if(search = ""){
                setSearch(document.location.search.substring(7).split('=')[0])
            }
        },
        [search],
      );

    return (
        <>
            <SEO title="Home" />
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <div className="field">
                            <p className="control has-icons-right">
                                <input className="input is-large" name="value" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
                                <span className="icon is-right">
                                    <i className="fas fa-search"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="hero-body">
                        <h1 className="is-size-5 has-text-medium">RESULTS FOR "{search.toUpperCase()}" :</h1>
                    </div>

                    <div className="container">
                        <div className="columns is-multiline ">

                            {products
                                .filter(p =>
                                    p.node.title.toUpperCase().includes(search.toUpperCase()) ||
                                    p.node.productType.toUpperCase().includes(search.toUpperCase()) ||
                                    (p.node.title.toUpperCase().includes(search.toUpperCase()) &&
                                        p.node.productType.toUpperCase().includes(search.toUpperCase()))

                                )
                                .map((p, i) => {

                                    return (
                                        !p ?
                                            <p>Nothings with : {search} </p>
                                            :
                                            <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                                                <ProductBox product={p} />
                                            </div>
                                    )
                                })}


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
