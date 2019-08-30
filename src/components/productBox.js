import React from 'react';
import Img from "gatsby-image"

const productBox = props => {
    const product = props.product
    return (

        <div className="box productBox">
            <a href={`/product/${product.node.handle}`} key={product.node.title}>
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
            </a>
        </div>
    );
};

export default productBox;