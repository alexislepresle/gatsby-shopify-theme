import React, { Component } from 'react';
import AuthenticationVerification from "./AuthenticationVerification"
import { navigate } from 'gatsby'


class ConnexionLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AuthenticationVerification props={this.props}>
                {({ isAuthenticated }) => (
                    (isAuthenticated)
                        ? (typeof window !== 'undefined') ? navigate(`/account`) : null
                        : this.props.children
                )}
            </AuthenticationVerification>
        );
    }
}

export default ConnexionLayout;