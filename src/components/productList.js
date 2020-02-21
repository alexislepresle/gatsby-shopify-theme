import React , { useContext, useState, useEffect }from 'react';
import StoreContext from '../context/store'
import ProductBox from "./productBox"

const ProductList = ({data}) => {
    const { edges: products } = data.allShopifyProduct

  const context = useContext(StoreContext);
  const [type, setType] = useState(context.filteredType)
  const [sort, setSort] = useState(context.filteredSort)


  useEffect(() => {
    context.updateFilterType(type)
  }, [type])

  useEffect(() => {
    context.updateFilterSort(sort)
  }, [sort])

  const sorts = []

  sorts.push(
    <>
      <option key={0} value="featured">
        Featured
      </option>
      <option key={1} value="A-Z">
        Alphabetically, A-Z
      </option>
      <option key={2} value="Z-A">
        Alphabetically, Z-A
      </option>
      <option key={3} value="low">
        Price, low to high
      </option>
      <option key={4} value="high">
        Price, high to low
      </option>
    </>
  )
  const productTypes = []
  const types = []
  types.push(
    <option value="all" key="-1">
      All
    </option>
  )
  products.map((t, i) => {
    let type = t.node.productType
    if (!productTypes.includes(type) && type.length > 0) {
      productTypes.push(type)
      types.push(
        <option key={i} value={type}>
          {type}
        </option>
      )
    }
    return null
  })
  productTypes.sort()
    return (
<section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-mobile" style={{ marginBottom: "60px", margin:"0", padding:"10px"}}>
              <div className="column is-2-desktop is-6-mobile">
                <label htmlFor="sortBy" className="has-text-weight-semibold is-uppercase" style={{ margin: "-20px" }}>SORT BY :
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          defaultvalues={sort}
                          onChange={e => setSort(e.target.value)}
                          id="sortBy"
                        >
                          {sorts}
                        </select>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div className="column is-2-desktop is-6-mobile">
                <label htmlFor="filter" className="has-text-weight-semibold is-uppercase" style={{ margin: "-20px" }}>FILTER BY :
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          defaultvalues={type}
                          onChange={e => setType(e.target.value)}
                          id="filter"
                        >
                          {types}
                        </select>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="columns is-multiline" style={{margin:"0"}}>
              {
                context.filteredType === 'all'
                  ? products
                    .sort(

                      context.filteredSort === "low" ? ((a, b) => a.node.variants[0].price - b.node.variants[0].price)
                        : context.filteredSort === "high" ? ((a, b) => b.node.variants[0].price - a.node.variants[0].price)
                          : context.filteredSort === "Z-A" ? ((a, b) => b.node.title.localeCompare(a.node.title))
                            : ((a, b) => a.node.title.localeCompare(b.node.title))
                    )
                    .map((p, i) => {
                      let product = p
                      return (
                        <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                          <ProductBox product={product} />
                        </div>
                      )
                    })
                  : products
                    .filter(p => p.node.productType.includes(context.filteredType))
                    .sort(
                      context.filteredSort === "featured" ? (a) => (a)
                        : context.filteredSort === "low" ? ((a, b) => a.node.variants[0].price - b.node.variants[0].price)
                          : context.filteredSort === "high" ? ((a, b) => b.node.variants[0].price - a.node.variants[0].price)
                            : context.filteredSort === "Z-A" ? ((a, b) => b.node.title.localeCompare(a.node.title))
                              : context.filteredSort === "A-Z" ? ((a, b) => a.node.title.localeCompare(b.node.title)) : null
                    )
                    .map((p, i) => {
                      let product = p
                      return (
                        <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                          <ProductBox product={product} />
                        </div>
                      )
                    })}
            </div>
          </div>
        </div>
      </section>
    );
};


export default ProductList;