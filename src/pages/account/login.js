import React, { useState, useContext } from 'react';
import SEO from "../../components/seo"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import StoreContext from '../../context/store'
import ConnexionLayout from "../../components/account/ConnexionLayout"
import { Link } from 'gatsby'

const CUSTOMER_LOGIN = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const LoginForm = ({ data }) => {
  const { setValue } = useContext(StoreContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleCustomerAccessToken = (value) => {
    setValue(value)
  }

  return (
    <section className="hero is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4 is-centered">
              <h2 className=" title has-text-centered">Login</h2>
              <Mutation mutation={CUSTOMER_LOGIN}>
                {(customerLogin) => {
                  return (
                    <>

                      <div className="field">
                        <label className="label has-text-white" htmlFor="loginEmail">Email</label>
                        <div className="control">
                          <input className="input" type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label has-text-white" htmlFor="loginPassword">Password</label>
                        <div className="control">
                          <input className="input" type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-text-centered">
                          <p>Forgot your password? </p>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-text-centered">
                          <button
                            className="button"
                            onClick={() => {
                              customerLogin({
                                variables: {
                                  "input": {
                                    "email": email,
                                    "password": password,
                                  }
                                }
                              }).then((result) => {
                                handleCustomerAccessToken(result.data.customerAccessTokenCreate.customerAccessToken)
                              }).catch((err) => {
                                alert(err)
                              })
                            }}
                          >SIGN IN</button>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-text-centered">
                          <Link to="account/register">
                            <p className="has-text-white">Create account</p>
                          </Link>
                        </div>
                      </div>
                    </>
                  )
                }}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const Login = () => {
  return (
    <>
      <SEO title="Login" />
      <ConnexionLayout log={false}>
        <LoginForm />
      </ConnexionLayout>
    </>
  );
};

export default Login;

