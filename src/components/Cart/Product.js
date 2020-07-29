import React, { useContext } from 'react';
import StoreContext from "../../context/store"

const Product = ({ key, line_item }) => {

    const context = useContext(StoreContext)

    const imageItem = line_item.variant.image && (
        <figure className="image is-96x96" style={{margin: "auto"}}>
            <img
                src={line_item.variant.image.src}
                alt={line_item.variant.image.altText}
            />
        </figure>
    )

    const removeItem = () => {
        context.removeLineItem(context.client, context.checkout.id, line_item.id)
    }
    return (
        <>
            <tr className="is-hidden-touch">
                <th>
                    {imageItem}
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    <p className="has-text-weight-semibold is-size-5 has-text-black">{line_item.title} ({line_item.variant.title}) </p>
                    <button className="has-text-weight-normal has-text-danger link-button" type="button" onClick={removeItem}>Remove</button>
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    ${line_item.variant.price}
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    {line_item.quantity}
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    {`$${(line_item.quantity * line_item.variant.price).toFixed(2)}`}
                </th>
            </tr>
            <div className="is-hidden-desktop">
                <div className="columns is-mobile is-vcentered">
                    <div className="column">
                        {imageItem}
                    </div>
                    <div className="column">
                        <p className="has-text-weight-semibold is-size-5 has-text-black">{line_item.title}</p>
                        <p className="has-text-weight-normal has-text-black">{line_item.variant.title}</p>
                        <button className="has-text-weight-normal has-text-danger link-button" type="button" onClick={removeItem}>Remove</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;