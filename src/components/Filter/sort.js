import React from 'react';

const Sort = ({sort, setSort}) => {
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
    return (
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
    );
};

export default Sort;