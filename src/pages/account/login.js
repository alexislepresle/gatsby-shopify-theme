import React, { useState, useContext } from 'react';
import SEO from "../../components/seo"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'

const CUSTOMER_LOGIN = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        customerAccessToken {
            accessToken
            expiresAt
        }
        customerUserErrors {
            field
            message
        }
    }
}
`

const Login = () => {
  const {} = useContext(StoreContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <>
      <SEO title="Home" />
      <section className="hero is-dark is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4 is-centered">
                <h2 className=" title has-text-centered">Login</h2>
                <Mutation mutation={CUSTOMER_LOGIN}>
                  {(customerLogin) => {
                    return (
                      <form
                        onSubmit={() => (
                          customerLogin({
                            variables: {
                              input: {
                                "email": email,
                                "password": password,
                              }
                            }
                          }).then((result) => {
                            if (result.data.customerAccessTokenCreate.customerAccessToken) {
                              console.log(result.data.customerAccessTokenCreate.customerAccessToken)
                            } else {
                              console.log(result.data.customerAccessTokenCreate.customerUserErrors)
                            }
                          })
                        )}
                      >
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
                            <button type="submit" className="button">SIGN IN</button>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control has-text-centered">
                            <p>Create account</p>
                          </div>
                        </div>
                      </form>
                    )
                  }}
                </Mutation>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Login;