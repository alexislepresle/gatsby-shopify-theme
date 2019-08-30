import React, { Component } from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductBox from "../components/productBox"
import PropTypes from 'prop-types'

export class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document: "",
        };
    }
    componentDidMount() {
        this.setState({
            document: document.location.search.substring(7).split('=')[0]
        });
    }

    render() {

        const { edges: products } = this.props.data.allShopifyProduct

        return (
            <>
                <SEO title="Home" />
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <div className="field">
                                <p className="control has-icons-right">
                                    <input className="input is-large" name="value" type="text" value={this.state.document} onChange={e => this.setState({ document: e.target.value })} placeholder="Search" />
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
                            <h1 className="is-size-5 has-text-medium">RESULTS FOR "{this.state.document.toUpperCase()}" :</h1>
                        </div>

                        <div className="container">
                            <div className="columns is-multiline ">

                                {products
                                    .filter(p =>
                                        p.node.title.toUpperCase().includes(this.state.document.toUpperCase()) ||
                                        p.node.productType.toUpperCase().includes(this.state.document.toUpperCase()) ||
                                        (p.node.title.toUpperCase().includes(this.state.document.toUpperCase()) &&
                                            p.node.productType.toUpperCase().includes(this.state.document.toUpperCase()))

                                    )
                                    .map((p, i) => {

                                        return (
                                            !p ?
                                                <p>Nothings with : {this.state.document} </p>
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
}

export default SearchPage

SearchPage.propTypes = {
    data: PropTypes.shape({
        allShopifyProduct: PropTypes.object
    }),
}
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
