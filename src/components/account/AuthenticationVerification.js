import {useContext} from 'react';
import StoreContext from "../../context/store"
import PropTypes from 'prop-types';

const AuthenticationVerification = (props) => {
    const { customerAccessToken } = useContext(StoreContext);
    const isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() ? true : false
    console.log(JSON.parse(customerAccessToken))

    return(props.children({
        isAuthenticated,
    }));
};

AuthenticationVerification.propTypes = {
    children: PropTypes.func.isRequired,
}

export default AuthenticationVerification;