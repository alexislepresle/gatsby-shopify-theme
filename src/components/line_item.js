import React, { useContext } from 'react';
import StoreContext from "../context/store"

const line_item = props => {
    const { line_item } = props
    const context = useContext(StoreContext)

    const imageItem = line_item.variant.image ? (
        <figure className="image is-96x96">
            <img 
                src={line_item.variant.image.src} 
                alt={line_item.variant.image.altText}
            />
        </figure>
    ):null;

    const removeItem = () => {
        context.removeLineItem(context.client, context.checkout.id, line_item.id)
    }

    return (
        <tr>
            <th>
                <div className="columns">
                    <div className="column">
                        {imageItem}
                    </div>
                    <div className="column">
                    <a href={`/product/${String(line_item.title).toLowerCase().replace(/\s+/g, '-')}`}>
                        <p className="has-text-weight-semibold is-size-5 has-text-black">{line_item.title}</p>
                        <p className="has-text-weight-normal has-text-black">{line_item.variant.title}</p>
                    </a>
                        <p className="has-text-weight-normal" onClick={removeItem}>Delete</p>

                    </div>
                </div>
            </th>
            <th>
                {line_item.quantity}
    </th>
            <th>
                ${line_item.variant.price}
    </th>
            <th>
                {`$${(line_item.quantity * line_item.variant.price).toFixed(2)}`}
    </th>
        </tr>

    );
};

export default line_item;