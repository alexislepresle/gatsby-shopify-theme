import React from 'react';
import { Link } from "gatsby"

const DefaultAddress = ({defaultAddress, addressesSize}) => {
    return (
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
                    View Addresses ({addressesSize})
                </button>
            </Link>
        </div>
    );
};

export default DefaultAddress;