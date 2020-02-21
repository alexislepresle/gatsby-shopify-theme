import React from 'react';
import AuthenticationVerification from "./AuthenticationVerification"
import { navigate } from 'gatsby'


const Layout = (props) => {
    return(
        <AuthenticationVerification>
            {({ isAuthenticated }) => (
                (isAuthenticated)
                    ? props.children
                    : (typeof window !== 'undefined') ? navigate(`/account/login`) : null
            )}
        </AuthenticationVerification>
    );
};

export default Layout;