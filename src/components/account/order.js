import React from 'react';


const Order = ({ order }) => {

    return (
        <div className="columns">
            <div className="column">
                <table className="table" style={{ margin: "auto" }}>
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>SKU</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th><p className="has-text-weight-semibold">TOTAL</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.lineItems&&
                            order.lineItems.edges.map(lineItem =>
                                <tr key={lineItem.node.title}>
                                    <td><p style={{width: "200px"}}>{lineItem.node.title}</p></td>
                                    <td>Soon</td>
                                    <td>Soon</td>
                                    <td>{lineItem.node.quantity}</td>
                                    <td>Soon</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td>Subtotal</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{order.subtotalPrice}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><p className="has-text-weight-semibold">{order.totalPrice}</p></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="column">
                <h3 className="subtitle has-text-centered has-text-weight-semibold">Shipping Address</h3>
                <div className="has-text-left">
                {order.shippingAddress&&
                <>
                    <p className="has-text-grey">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="has-text-grey">{order.shippingAddress.address1}</p>
                    <p className="has-text-grey">{order.shippingAddress.zip}, {order.shippingAddress.city}</p>
                    <p className="has-text-grey">{order.shippingAddress.country}</p>
                </>
                }
                </div>
            </div>
        </div>
    );
};

export default Order;