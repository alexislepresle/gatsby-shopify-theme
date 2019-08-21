import React from 'react'; /* eslint-disable */
import PropTypes from 'prop-types'

const VariantSelector = props => {
    const name = props.options.name
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{props.options.name} : </label>
            </div>
            <div className="field-body">
                <div className="select">
                    <select onChange={props.onChange} name={props.options.name}>
                        {
                            props.options.values.map(value => (
                                <option 
                                    key={value} 
                                    value={value}
                                    className="is-medium"
                                >
                                    {`${value}`}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default VariantSelector;

VariantSelector.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.shape({
        values: PropTypes.string,
    }),
  }