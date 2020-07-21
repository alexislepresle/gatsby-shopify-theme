import React from 'react';

const Collection = ({type, setType, products}) => {
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
    );
};

export default Collection;