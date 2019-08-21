import { Link } from "gatsby" /* eslint-disable */
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand" style={{marginLeft:"30px"}}>
      <h1 className="navbar-item has-text-black	has-text-weight-bold">
        <Link className="has-text-black" to="/">{siteTitle}</Link>
      </h1>
    </div>
    <div className="navbar-end is-active"  style={{marginRight:"30px"}}>
      <div className="navbar-item">
        <Link className="has-text-black" to="/cart">
          <button className="button is-rounded" data-badge="0"><i className="fas fa-shopping-bag" ></i></button>
        </Link>
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
