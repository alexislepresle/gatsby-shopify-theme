import { Link } from "gatsby" /* eslint-disable */
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand" style={{marginLeft:"30px"}}>
      <h1 className="navbar-item has-text-black	has-text-weight-bold">
        <Link className="has-text-black" to="/">{siteTitle}</Link>
      </h1>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-end"  style={{marginRight:"30px"}}>
      <div className="navbar-item">
        <i className="fas fa-shopping-bag"></i>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
