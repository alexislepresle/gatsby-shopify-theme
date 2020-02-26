import React, { useState } from 'react';
import SEO from "../../components/seo"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import ConnexionLayout from "../../components/account/ConnexionLayout"
import { navigate } from 'gatsby'

const CUSTOMER_REGISTER = gql`
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
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

const RegisterForm = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <section className="hero is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4 is-centered">
              <h2 className=" title has-text-centered">Login</h2>
              <Mutation mutation={CUSTOMER_REGISTER}>
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
                                navigate(`/account/login`)
                              })
                            }}
                          >CREATE</button>
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



const Register = () => {
  return (
    <>
      <SEO title="Register" />
      <ConnexionLayout log={false}>
        <RegisterForm />
      </ConnexionLayout>
    </>
  );
};

export default Register;

