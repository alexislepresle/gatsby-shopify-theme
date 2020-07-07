import React from 'react';

const Empty = () => {
    return (
        <div className="has-text-centered">
            <p className="is-size-3">Your cart is currently empty</p>
            <a className="button is-medium is-dark" style={{ marginTop: "50px" }} href="/">Continue shopping → </a>
        </div>
    );
};

export default Empty;