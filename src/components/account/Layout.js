import React,{ useContext} from 'react';
import { navigate } from 'gatsby'
import StoreContext from "../../context/store"

const Layout = (props) => {
    const { customerAccessToken } = useContext(StoreContext);
    let isAuthenticated = false
    customerAccessToken != null &&
        (isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() && true )

    return (
        <>
        {
            (!isAuthenticated)
                ? (typeof window !== 'undefined') ? navigate(`/account/login`) : null
                : props.children
        }
    </>
    );
};

export default Layout;