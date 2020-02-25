import React, { useContext } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import StoreContext from '../../context/store'
import Layout from "../../components/account/Layout"
import Logout from "./logout"
import { Link } from "gatsby"

const CUSTOMER_INFO = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        email
        firstName
        phone
        defaultAddress {
            firstName
            lastName
            address1
            city
            zip
            country
        }
        orders(first: 10) {
            edges {
                node {
                    name
                    totalPrice
                    processedAt
                    statusUrl
                    currencyCode
                }
            }
        }
        addresses(first: 10) {
            edges {
                node {
                    address1
                    city
                    lastName
                    firstName
                    country
                    name
                    zip
                }
            }
        }
    }
}
`
const Index = () => {
    const { customerAccessToken } = useContext(StoreContext);
    return (
        <Layout>
            <Query
                query={CUSTOMER_INFO}
                variables={{
                    customerAccessToken: customerAccessToken.accessToken
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    const { defaultAddress, orders, addresses } = data.customer
                    return (
                        <>
                            <h1 className="title has-text-centered">My Account</h1>
                            <Logout />
                            <section class="hero is-medium">
                                <div class="hero-body">
                                    <div class="container">
                                        <div className="container">
                                            <div className="columns is-centered">
                                                <div className="column has-text-centered is-9">
                                                    <h3 className="subtitle has-text-centered has-text-weight-semibold">ORDER HISTORY</h3>
                                                    {
                                                        orders.edges.length == 0 ? (
                                                            <p className="has-text-grey">You haven't placed any orders yet.</p>
                                                        )
                                                            :
                                                            (
                                                                <table class="table is-bordered" style={{margin: "auto"}}>
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
                                                                                <tr>
                                                                                    <td><a className="button is-dark">{order.node.name}</a></td>
                                                                                    <td>{new Date(order.node.processedAt).toLocaleDateString()}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td>{order.node.currencyCode} {order.node.totalPrice}</td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            )
                                                    }
                                                </div>
                                                <div className="column has-text-centered">
                                                    <h3 className="subtitle has-text-centered has-text-weight-semibold">ACCOUNT DETAILS</h3>
                                                    {
                                                        defaultAddress != null && (
                                                            <div className="has-text-left">
                                                                <p className="has-text-grey">{defaultAddress.firstName} {defaultAddress.lastName}</p>
                                                                <p className="has-text-grey">{defaultAddress.address1}</p>
                                                                <p className="has-text-grey">{defaultAddress.zip}, {defaultAddress.city}</p>
                                                                <p className="has-text-grey">{defaultAddress.country}</p>
                                                            </div>
                                                        )
                                                    }
                                                    <br />
                                                    <Link to="account/addresses">
                                                        <button 
                                                            className="button is-dark"
                                                        >
                                                            View Addresses ({addresses.edges.length})
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </>
                    )
                }}
            </Query>
        </Layout>
    );
};

export default Index;