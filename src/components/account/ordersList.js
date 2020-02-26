import React, {useState} from 'react';
import Order from './order';

const OrdersList = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [onClickOrder, setOnClickOrder] = useState(false);
    return (
        <>
            <div className="column has-text-centered is-9">
                <h3 className="subtitle has-text-centered has-text-weight-semibold">ORDER HISTORY</h3>
                {
                    orders.edges.length === 0 ? (
                        <p className="has-text-grey">You haven't placed any orders yet.</p>
                    )
                        :
                        (
                            <table className="table is-bordered" style={{ margin: "auto" }}>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Payment Status</th>
                                        <th>Fulfillment Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.edges.map(order =>
                                            <tr key={order.node.id}>
                                                <td><button className="button is-dark" onClick={()=>( setSelectedOrder(order.node), setOnClickOrder(!onClickOrder))}>{order.node.name}</button></td>
                                                <td>{new Date(order.node.processedAt).toLocaleDateString()}</td>
                                                <td>Soon</td>
                                                <td>Soon</td>
                                                <td>{order.node.currencyCode} {order.node.totalPrice}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
            <div className={onClickOrder ? "modal is-active" : "modal"}>
                <div class="modal-background" onClick={() => setOnClickOrder(!onClickOrder)}></div>
                <div class="modal-content" style={{ width: "auto", padding: "10px" }}>
                    <section class="modal-card-body">
                    { selectedOrder != null &&
                    <Order order={selectedOrder} />}
                    </section>
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => setOnClickOrder(!onClickOrder)}></button>
            </div>
        </>
    );
};

export default OrdersList;