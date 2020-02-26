import React, { useContext } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import StoreContext from '../../context/store'
import Layout from "../../components/account/Layout"
import Logout from "./logout"
import OrdersList from "../../components/account/ordersList"
import DefaultAddress from "../../components/account/defaultAddress"


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
                    lineItems(first: 10) {
                        edges {
                            node {
                                title
                                quantity
                            }
                        }
                    }
                    shippingAddress {
                        address1
                        city
                        lastName
                        firstName
                        zip
                        country
                    }
                    subtotalPrice
                    totalPrice
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
                            <section className="hero is-medium">
                                <div className="hero-body">
                                    <div className="container">
                                        <div className="container">
                                            <div className="columns is-centered">
                                                <OrdersList orders={orders} />
                                                <DefaultAddress 
                                                    defaultAddress={defaultAddress} 
                                                    addressesSize={addresses.edges.length}
                                                />
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