import React,{ useContext} from 'react';
import { navigate } from 'gatsby'
import StoreContext from "../../context/store"

const Layout = (props) => {
    const { customerAccessToken } = useContext(StoreContext);
    const isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() ? true : false

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