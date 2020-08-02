import { Link } from "gatsby" /* eslint-disable */
import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from 'react'
import StoreContext from '../context/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  });
  return quantity
}


const Header = ({ siteTitle }) => {
  const context = useContext(StoreContext)
  const { checkout } = context.store
  const [quantity, setQuantity] = useState(countQuantity(checkout ? checkout.lineItems : []))
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState("")


  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const openSearchBar = () => {
    setModal(true)
  }
  const closeSearchBar = () => {
    setModal(false)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{ display: "flex" }}>
        <div className="navbar-start" style={{ marginLeft: "30px", width: "100%", alignItems: "center", display: "flex" }}>
          <h1 className="subtitle">
            <Link aria-label="search" className="has-text-black has-text-weight-bold" to="/">{siteTitle}</Link>
          </h1>
        </div>
        <div className="navbar-end" style={{ marginRight: "30px", display: "flex" }}>
          <div className="navbar-item">
            <FontAwesomeIcon className="has-text-dark is-size-5" onClick={openSearchBar} icon={faSearch} />
          </div>
          <div className="navbar-item">
            <Link aria-label="cart" to="/account/login">
              <FontAwesomeIcon icon={faUser} className="is-size-5 has-text-dark" />
            </Link>
          </div>
          <div className="navbar-item">
            <Link aria-label="cart" to="/cart">
              {
                quantity > 0 ?
                <>
                  <div className="shopping-bag-quantity">{quantity}</div>
                  <FontAwesomeIcon icon={faShoppingBag} className="is-size-5 has-text-dark" />
                </>
                  :
                  <FontAwesomeIcon icon={faShoppingBag} className="is-size-5 has-text-dark" />
              }
            </Link>
          </div>
        </div>

      </nav>
      <div className={` ${modal === true ? "modal is-active" : "modal"}`}>
        <div className="modal-background" onClick={closeSearchBar}></div>
        <div className="modal-content">
          <div className="field">
            <div className="control has-icons-right">
              <form action="../search" method="GET">
                <input className="input is-large" name="value" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
                <span className="icon is-right">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <label className="has-text-white">ENTER ↵</label>
              </form>
            </div>
          </div>
        </div>

        <button className="modal-close is-large" onClick={closeSearchBar} aria-label="close"></button>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
