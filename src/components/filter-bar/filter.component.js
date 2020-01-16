import React from 'react';
import PropTypes from 'prop-types';
import './filter.component.scss';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterString: ''};
  }

  handleChange(filterString) {
    this.setState({filterString});
    this.props.onFilter(filterString);
  }

  render() {
    return (
      <div className={`filter-bar ${this.props.className}`}>
        <input type="text"
               value={ this.state.filterString }
               placeholder={this.props.placeholder}
               onChange={(e) => this.handleChange(e.currentTarget.value)} />

        {!!this.state.filterString &&
          <span className="filter-bar__clear util-clickable"
                onClick={() => this.handleChange('')}> Clear </span> }
      </div>
    );
  }
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default Filter;