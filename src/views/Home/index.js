import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getObjects} from '../../state/actions/vozilla.actions'
import Map from '../../components/Map'
import Filters from '../../components/Filters'

class Home extends Component {
  state = {
    filters: [
      {
        value: 'vehicle',
        checked: true,
        label: 'Samochody',
        field: 'objectType'
      },
      {
        value: 'parking',
        checked: true,
        label: 'Parkingi',
        field: 'objectType'
      },
      {
        value: 'poi',
        checked: true,
        label: 'POI',
        field: 'objectType'
      }
    ]
  }

  componentDidMount() {
    this.customFilters(this.state.filters)
  }

  customFilters = filters => {
    const mapFilters = filters.map(item => item).filter(item => item.checked)
    this.props.getObjects(mapFilters)
  }

  changeFilter = e => {
    const {name, checked} = e.target
    const {filters} = this.state

    const singleFilter = filters.map(item => item).filter(item => item.value === name)
    singleFilter[0].checked = checked

    this.setState({filters: filters})
    this.customFilters(filters)
  }

  render() {
    const {data, isLoading, isEmpty} = this.props

    return (
      <div>
        <Filters filters={this.state.filters} changeFilter={this.changeFilter} />
        {!isLoading && !isEmpty ? (
          <Map
            objects={data.objects}
            loadingElement={<div style={{height: `90vh`}} />}
            containerElement={<div style={{height: `90vh`, width: `100%`}} />}
            mapElement={<div style={{height: `90vh`, width: `100%`}} />}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

function mapStateToProps({objects}) {
  return {
    data: objects.objects.data,
    isLoading: objects.objects.isLoading,
    isEmpty: objects.objects.isEmpty
  }
}

Home.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  isEmpty: PropTypes.bool,
  getObjects: PropTypes.func
}

export default connect(
  mapStateToProps,
  {getObjects}
)(Home)
