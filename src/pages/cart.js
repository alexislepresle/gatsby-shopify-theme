import React, { useContext } from 'react'; /* eslint-disable */
import Seo from "../components/seo"
import StoreContext from "../context/store"
import LineItem from "../components/line_item"
import LineItem_Mobile from "../components/line_item_mobile"

const Cart = () => {

    const context = useContext(StoreContext)
    const { checkout } = context
    const Line_item = checkout.lineItems.length !== 0 ? (

        <div className="table-container">
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr align="center">
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {checkout.lineItems.map(line_item => {
                        return <LineItem key={line_item.id.toString()} line_item={line_item} />
                    })}
                </tbody>
            </table>
        </div>
    )
    :
    <div className="has-text-centered">
        <p className="is-size-3">Your cart is currently empty.</p>
        <a className="button is-medium is-dark" style={{ marginTop: "50px" }} href="/">Continue shopping → </a>
    </div>
    
    const Line_item_Mobile = checkout.lineItems.length !== 0 ? (
            checkout.lineItems.map(line_item_mobile => {
                return <LineItem_Mobile key={line_item_mobile.id.toString()} line_item={line_item_mobile} />
            })
    )
    :
    <div className="has-text-centered">
        <p className="is-size-3">Your cart is currently empty.</p>
        <a className="button is-medium is-dark" style={{ marginTop: "50px" }} href="/">Continue shopping → </a>
    </div>


    return (
        <>
            <Seo />
            <section className="hero is-fullheight is-light is-bold">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <div className="box productBox">
                                    <h2 className="title has-text-weight-semibold">Card</h2>
                                    <div className="Line_item">
                                        {Line_item}
                                    </div>
                                    <div className="Line_itemMobile">
                                       {Line_item_Mobile}
                                    </div>
                                </div>
                            </div>
                            {
                                checkout.lineItems.length !== 0 ?
                                    <div className="column is-3">
                                        <div className="box productBox">
                                            <h2 className="subtitle has-text-weight-semibold is-size-4">Order Summary</h2>
                                            <hr />
                                            <p className="subtitle has-text-weight-semibold ">Subtotal :</p>
                                            <p className="has-text-right has-text-weight-semibold is-size-5">$ {checkout.subtotalPrice}</p>
                                            <p className="subtitle has-text-weight-semibold ">Taxes :</p>
                                            <p className="has-text-right has-text-weight-semibold is-size-5"> $ {checkout.totalTax}</p>
                                            <p className="subtitle has-text-weight-semibold ">Total :</p>
                                            <p className="has-text-right has-text-weight-semibold is-size-5">$ {checkout.totalPrice}</p>
                                            <hr />
                                            <a className="button is-medium is-fullwidth is-dark" href={checkout.webUrl}>Checkout</a>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default Cart;