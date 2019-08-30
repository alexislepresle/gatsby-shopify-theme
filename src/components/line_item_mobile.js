import React, { useContext } from 'react';
import StoreContext from "../context/store"

const LineItem_Mobile = props => {
    const { line_item } = props
    const context = useContext(StoreContext)

    const imageItem = line_item.variant.image ? (
        <figure className="image is-96x96">
            <img
                src={line_item.variant.image.src}
                alt={line_item.variant.image.altText}
            />
        </figure>
    ) : null;

    const removeItem = () => {
        context.removeLineItem(context.client, context.checkout.id, line_item.id)
    }

    return (
    <div className="columns">
        <hr/>
        <div className="columns is-mobile is-vcentered">
            <div className="column is-centered">
                {imageItem}
            </div>
            <div className="column">
                <p className="has-text-weight-semibold is-size-5 has-text-black">{line_item.title}</p>
                <p className="has-text-weight-normal has-text-black">{line_item.variant.title}</p>
            </div>
            <div className="column is-1">
                <p className="has-text-weight-normal delete" onClick={removeItem}>Delete</p>
            </div>
        </div>
        <div className="columns is-mobile is-vcentered">
            <div className="column column has-text-left">
                <p><b>Quantity : </b>{line_item.quantity}</p>
            </div>
            <div className="column has-text-centered">
                <p><b>Price : </b>${line_item.variant.price}</p>
            </div>
            <div className="column has-text-right">
                <p><b>Total : </b>{`$${(line_item.quantity * line_item.variant.price).toFixed(2)}`}</p>
            </div>

        </div>
    </div>
    );
};

export default LineItem_Mobile;