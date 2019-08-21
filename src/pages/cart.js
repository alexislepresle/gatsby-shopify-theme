import React, { useContext } from 'react';
import Layout from "../components/layout"
import Seo from "../components/seo"
import Store from '../context/store'

const cart = ( ) => {

    const context = useContext(Store);

    console.log(context)


        return (
            <Layout>
                <Seo />
                <section className="hero is-fullheight is-light is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column">
                                    <div className="box">
                                        <h2 className="title has-text-weight-semibold">Card</h2>
                                        <hr className="dark"/>
                                        <table className="table is-striped is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>Item Description</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <div className="columns">
                                                            <div className="column">
                                                                <p>coucou</p>
                                                            </div>
                                                            <div className="column">
                                                                <p>coucou of this book</p>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        1
                                                    </th>
                                                    <th>
                                                        $ 99.00
                                                    </th>
                                                    <th>
                                                        $ 99.00
                                                    </th>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="column is-3">
                                    <div className="box">
                                        <h2 className="subtitle">Order Summary</h2>
                                        <hr className="dark"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
}


export default cart;