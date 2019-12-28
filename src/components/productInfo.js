import React from 'react';

const ProductInfo = ({ product }) => {
    return (
        <>
            <hr />
            <p className="has-text-weight-semibold is-size-2">{product.title}</p>
            <p className="has-text-left is-uppercase  is-size-5">{product.variants[0].title}</p>
            <p className=" has-text-right has-text-weight-bold is-size-3">${product.variants[0].price}</p>
        </>
    );
};

export default ProductInfo;