import React from 'react';
import Img from "gatsby-image"

const ProductBox = props => {
    const product = props.product
    return (
        <div className="box productBox" key={product.node.title}>
            <a href={`/product/${product.node.handle}`} >
                <Img
                    fluid={product.node.images[0].localFile.childImageSharp.fluid}
                    key={product.node.images[0].localFile.id}
                    fadeIn={false} 
                    loading="eager"
                    alt={product.node.title}
                />
                <p className="has-text-weight-semibold has-text-black">{product.node.title}</p>
                <p className="has-text-weight-light has-text-grey-dark">
                    ${product.node.variants[0].price}
                </p>
            </a>
        </div>
    );
};

export default ProductBox;