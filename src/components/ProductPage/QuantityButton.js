import React from 'react';

const QuantityButton = ({ quantity, setQuantity }) => {
    const increaseQuantity = () => {
        setQuantity(q => q + 1);
    }
    const decreaseQuantity = () => {
        setQuantity(q => (q <= 1 ? 1 : q - 1));
    }
    return (
        <div className="field">
            <label className="label" htmlFor="quantity" >Quantity </label>
            <div className="control" id="quantity">
                <div className="field has-addons">
                    <div className="control">
                        <button className="button" onClick={decreaseQuantity}>
                            -
                    </button>
                    </div>
                    <div className="control">
                        <button className="button">
                            {quantity}
                        </button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={increaseQuantity}>
                            +
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantityButton;