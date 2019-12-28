import React from 'react';
import Img from "gatsby-image"
import { Link } from "gatsby" /* eslint-disable */

const ProductBox = props => {
    const product = props.product
    return (

        <div className="box productBox" key={product.node.title}>
            <Link to={`/product/${product.node.handle}`} >
                <Img
                    fluid={product.node.images[0].localFile.childImageSharp.fluid}
                    key={product.node.images[0].localFile.id}
                    alt={product.node.title}
                />
                <p className="has-text-weight-semibold has-text-black">{product.node.title}</p>
                <div className="columns">
                    <div className="column has-text-left is-uppercase has-text-black">
                        {product.node.variants[0].title}
                    </div>
                    <div className="column has-text-right has-text-weight-bold is-size-5 has-text-black">
                        ${product.node.variants[0].price}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductBox;