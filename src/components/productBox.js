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
                <p className="has-text-weight-light has-text-grey">
                    ${product.node.variants[0].price}
                </p>
            </Link>
        </div>
    );
};

export default ProductBox;