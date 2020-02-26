import React, { useState, useContext, useEffect } from 'react';
import StoreContext from '../../../context/store'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

const CUSTOMER_EDIT_ADDRESS = gql`
mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
  customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
    customerAddress {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_EDIT_DEFAULT_ADDRESS = gql`
mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const EditAddressForm = ({ address }) => {
    const [editAdressForm, setEditAdressForm] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState(address.firstName);
    const [lastNameInput, setLastNameInput] = useState(address.lastName);
    const [companyInput, setCompanyInput] = useState(address.company);
    const [addressInput, setAddressInput] = useState(address.address1);
    const [apartmentInput, setApartmentInput] = useState(address.address2);
    const [cityInput, setCityInput] = useState(address.city);
    const [countryInput, setCountryInput] = useState(address.country);
    const [zipInput, setZipInput] = useState(address.zip);
    const [phoneInput, setPhoneInput] = useState(address.phone);
    const [countriesAll, setCountriesAll] = useState([]);
    const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);

    const { customerAccessToken } = useContext(StoreContext);

    const getLocations = () => {
        return axios('https://restcountries.eu/rest/v2/all')
    }


    useEffect(() => {
        getLocations().then(({ data }) => { setCountriesAll(data) })
    }, []);
    console.log(checkDefaultAddress)
    return (
        <>
            <button className="button is-dark" onClick={() => setEditAdressForm(!editAdressForm)}>EDIT</button>
            {
                editAdressForm && (
                    <div className="columns is-centered">
                        <div className="column is-6 has-text-left">
                            <Mutation mutation={CUSTOMER_EDIT_ADDRESS}>
                                {( customerAddressUpdate ) => {
                                    return (
                                        <Mutation mutation={CUSTOMER_EDIT_DEFAULT_ADDRESS}>
                                            {( customerDefaultAddressUpdate ) => {
                                                return (
                                                    <form>
                                                        <h1 className="subtitle is-uppercase has-text-weight-semibold ">EDIT ADDRESS</h1>
                                                        <div className="columns">
                                                            <div className="column">
                                                                <div className="field">
                                                                    <label className="label" htmlFor="firstNameInput">First Name</label>
                                                                    <div className="control">
                                                                        <input className="input" value={firstNameInput} type="text" onChange={(e) => setFirstNameInput(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="column">
                                                                <div className="field">
                                                                    <label className="label" htmlFor="lastNameInput">Last Name</label>
                                                                    <div className="control">
                                                                        <input className="input" value={lastNameInput} type="text" onChange={(e) => setLastNameInput(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <label className="label" htmlFor="companyInput">Company</label>
                                                            <div className="control">
                                                                <input className="input" value={companyInput} type="text" onChange={(e) => setCompanyInput(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <label className="label" htmlFor="addressInput">Address</label>
                                                            <div className="control">
                                                                <input className="input" value={addressInput} type="text" onChange={(e) => setAddressInput(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <label className="label" htmlFor="apartmentInput">Apartment, suite, etc.</label>
                                                            <div className="control">
                                                                <input className="input" value={apartmentInput} type="text" onChange={(e) => setApartmentInput(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="columns">
                                                            <div className="column">
                                                                <div className="field">
                                                                    <label className="label" htmlFor="cityInput">City</label>
                                                                    <div className="control">
                                                                        <input className="input" value={cityInput} type="text" onChange={(e) => setCityInput(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="column">
                                                                <div className="field">
                                                                    <label className="label" htmlFor="countryInput">Country</label>
                                                                    <div className="control">
                                                                        <div className="select">
                                                                            <select value={countryInput} onChange={(e) => setCountryInput(e.target.value)} style={{ minWidth: "140px", maxWidth: "310px" }}>
                                                                                {
                                                                                    countriesAll.map((country) => (
                                                                                        <option key={country.name} value={country.name}>{country.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <label className="label" htmlFor="zipInput">Postal/Zip Code</label>
                                                            <div className="control">
                                                                <input className="input" value={zipInput} type="text" onChange={(e) => setZipInput(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <label className="label" htmlFor="phoneInput">Phone</label>
                                                            <div className="control">
                                                                <input className="input" value={phoneInput} type="text" onChange={(e) => setPhoneInput(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                            <div className="control">
                                                                <label className="checkbox" htmlFor="checkboxDefaultAddress">
                                                                    <input type="checkbox" onChange={() => setCheckDefaultAddress(!checkDefaultAddress)} value={checkDefaultAddress} />
                                                                    Set as default address
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="button is-dark"
                                                            onClick={() => {
                                                                
                                                                customerAddressUpdate({
                                                                    variables: {
                                                                        "customerAccessToken": customerAccessToken.accessToken,
                                                                        "id": address.id,
                                                                        "address": {
                                                                            address1: addressInput,
                                                                            city: cityInput,
                                                                            company: companyInput,
                                                                            country: countryInput,
                                                                            firstName: firstNameInput,
                                                                            lastName: lastNameInput,
                                                                            phone: phoneInput,
                                                                            zip: zipInput,
                                                                        }
                                                                    }
                                                                })
                                                                checkDefaultAddress &&
                                                                customerDefaultAddressUpdate({
                                                                    variables: {
                                                                        "customerAccessToken": customerAccessToken.accessToken,
                                                                        "addressId": address.id
                                                                    }
                                                                }).then((result)=>(alert(result)))
                                                            }}
                                                        >
                                                            Update address
                                                        </button>
                                                        <p onClick={() => setEditAdressForm(!editAdressForm)}>Cancel</p>
                                                    </form>
                                                )
                                            }}
                                        </Mutation>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                )}
        </>
    );
};

export default EditAddressForm;