import React from 'react';

const ProductInfo = ({ product }) => {
    return (
        <>
            <p className="has-text-weight-semibold is-size-2">{product.title}</p>
            <p className="is-size-4 has-text-grey-dark">${product.variants[0].price}</p>
        </>
    );
};

export default ProductInfo;