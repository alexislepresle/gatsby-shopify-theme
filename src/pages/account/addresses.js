import React, { useContext } from 'react';
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import StoreContext from '../../context/store'
import Layout from "../../components/account/Layout"
import AddAddressForm from "../../components/account/adresses/addAddressForm"
import DeleteAddress from "../../components/account/adresses/deleteAddress"
import EditAddressForm from "../../components/account/adresses/editAddressForm"

const CUSTOMER_ADDRESS = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        defaultAddress {
            id
        }
        addresses(first: 10) {
            edges {
                node {
                    id
                    address1
                    address2
                    city
                    phone
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

const Addresses = () => {
    const { customerAccessToken } = useContext(StoreContext);

    return (
        <Layout>
            <Query
                query={CUSTOMER_ADDRESS}
                variables={{
                    customerAccessToken: customerAccessToken.accessToken
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    const { defaultAddress, addresses } = data.customer
                    return (
                        <div className="has-text-centered">
                            <h2 className="title is-uppercase">Your Addresses</h2>
                            <Link to={"/account"}><p className="has-text-black" style={{ textDecoration: "underline" }}>Return to Account Details</p></Link>
                            <br />
                            <AddAddressForm />
                                <div>
                                    {
                                    addresses != null && (
                                        addresses.edges.map((address => (
                                            <div key={address.node.id} className="columns is-centered">
                                                <div className="column">
                                                    <br/>
                                                    {
                                                        defaultAddress.id === address.node.id && 
                                                            <h1 className="subtitle">DEFAULT</h1>                                                
                                                    }
                                                    <p className="has-text-grey">{address.node.firstName} {address.node.lastName}</p>
                                                    <p className="has-text-grey">{address.node.address1}</p>
                                                    <p className="has-text-grey">{address.node.zip}, {address.node.city}</p>
                                                    <p className="has-text-grey">{address.node.country}</p>
                                                    <EditAddressForm address={address.node} />
                                                    <DeleteAddress id={address.node.id}/>
                                                </div>
                                            </div>
                                        )))
                                    )
                                }
                            </div>
                            <br/>
                        </div>
                    )
                }}
            </Query>
        </Layout>
    );
};

export default Addresses;