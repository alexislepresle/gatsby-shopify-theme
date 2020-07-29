import React, { useState, useContext, useEffect } from 'react';
import StoreContext from '../../../context/store'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

const CUSTOMER_CREATE_ADDRESS = gql`
mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
  customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
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


const AddAddressForm = () => {
    const [addAdressForm, setAddAdressForm] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [apartmentInput, setApartmentInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const { customerAccessToken } = useContext(StoreContext);

    const [countriesAll, setCountriesAll] = useState([]);

    const getLocations = () => {    
        return axios('https://restcountries.eu/rest/v2/all')
    }

    useEffect(() => {
        getLocations().then(({ data }) => {setCountriesAll(data)})
      }, []);

    return (
        <>
            <button className="button is-dark" onClick={() => setAddAdressForm(!addAdressForm)}>Add a new adress</button>
            {
            addAdressForm && (
            <div className="columns is-centered">
                <div className="column is-6 has-text-left">
                    <Mutation mutation={CUSTOMER_CREATE_ADDRESS}>
                        {(customerAddressCreate) => {
                            return (
                                <form>
                                    <h1 className="subtitle is-uppercase has-text-weight-semibold ">ADD A NEW ADDRESS</h1>
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
                                        <label className="label"  htmlFor="companyInput">Company</label>
                                        <div className="control">
                                            <input className="input" value={companyInput} type="text" onChange={(e) => setCompanyInput(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label"  htmlFor="addressInput">Address</label>
                                        <div className="control">
                                            <input className="input" value={addressInput} type="text" onChange={(e) => setAddressInput(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label"  htmlFor="apartmentInput">Apartment, suite, etc.</label>
                                        <div className="control">
                                            <input className="input" value={apartmentInput} type="text" onChange={(e) => setApartmentInput(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="field">
                                                <label className="label"  htmlFor="cityInput">City</label>
                                                <div className="control">
                                                    <input className="input" value={cityInput} type="text" onChange={(e) => setCityInput(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="field" >
                                                <label className="label"  htmlFor="countryInput">Country</label>
                                                <div className="control">
                                                    <div className="select">
                                                        <select value={countryInput} onChange={(e) => setCountryInput(e.target.value)} onBlur={(e) => setCountryInput(e.target.value)} style={{minWidth: "140px",maxWidth: "310px"}}>
                                                            {
                                                                countriesAll.map((country)=>(
                                                                    <option value={country.name}>{country.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label"  htmlFor="zipInput">Postal/Zip Code</label>
                                        <div className="control">
                                            <input className="input" value={zipInput} type="text" onChange={(e) => setZipInput(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label"  htmlFor="phoneInput">Phone</label>
                                        <div className="control">
                                            <input className="input" value={phoneInput} type="text" onChange={(e) => setPhoneInput(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <label className="checkbox"  htmlFor="checkboxDefaultAddress">
                                                <input type="checkbox" />
                                                Set as default address
                                        </label>
                                        </div>
                                    </div>
                                    <button
                                        className="button is-dark"
                                        onClick={() => {
                                            customerAddressCreate({
                                                variables: {
                                                    "customerAccessToken": customerAccessToken.accessToken,
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
                                            }).then((result) => {
                                                setAddAdressForm(!addAdressForm)
                                            })
                                        }}
                                    >
                                        Add adress</button>
                                    <button className="link-button" onClick={() => setAddAdressForm(!addAdressForm)} onKeyPress={() => setAddAdressForm(!addAdressForm)}>Cancel</button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
            )}
        </>
    );
};

export default AddAddressForm;