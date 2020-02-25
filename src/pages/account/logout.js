import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { Link, navigate } from 'gatsby'
import { Mutation } from 'react-apollo'
import StoreContext from '../../context/store'

const CUSTOMER_LOGOUT = gql`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
            field
            message
        }
    }
}
`


const Logout = () => {
    const {setValue, customerAccessToken} = useContext(StoreContext);
    return (
        <Mutation 
            mutation={CUSTOMER_LOGOUT}
            onCompleted={(data)=> {
                if (data.customerAccessTokenDelete.userErrors.length) return
                    setValue({
                        customerAccessToken: ''
                    })
                    navigate('/account/login')

              }}
        >
            {(customerLogout) => {
                return(
                    <Link 
                        to={`/`}
                        onClick={e => {
                            e.preventDefault()
                            customerLogout({
                                variables: {
                                    "customerAccessToken": customerAccessToken.accessToken,
                                }
                            })
                        }}
                    >
                        <p 
                            className="has-text-centered has-text-underlined has-text-black"
                            style={{textDecoration: "underline"}}
                        >
                            Log out
                        </p>
                    </Link>
                )
            }}
        </Mutation>
    );
};

export default Logout;