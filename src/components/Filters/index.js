import React, {Component} from 'react'
import Checkbox from "../Checkbox";

class Filters extends Component {
  render() {
    const {filters, changeFilter} = this.props

    return (
      <div>
        Filtry
        {
          filters.map((item, index) =>
            <div className="filter__element" key={index}>
              <Checkbox onChange={changeFilter} name={item.value} label={item.label} checked={item.checked} />
              </div>
          )
        }
      </div>
    )
  }
}

export default Filters
