import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import {getObjects} from "../../state/actions/vozilla.actions";
import Map from "../../components/Map";
import Wrapper from "./Wrapper";
import Filters from "../../components/Filters";

class Home extends Component {
  state = {
    filters: [
      {
        value: 'vehicle',
        checked: true,
        label: 'Samochody'
      },
      {
        value: 'parking',
        checked: true,
        label: 'Parkingi'
      },
      {
        value: 'poi',
        checked: true,
        label: 'POI'
      }
    ]
  }

  componentDidMount () {
    this.customFilters()
  }

  customFilters = filter => {
    const basicFilters = [
      {field: 'objectType', value: 'vehicle'},
      {field: 'objectType', value: 'parking'},
      {field: 'objectType', value: 'poi'}
    ]

    this.props.getObjects(basicFilters)
  }

  changeFilters = e => {
    const {name, checked} = e.target
    const newFilters = this.state.filters
    const singleFilter = newFilters.map(item => item).filter(item => item.value === name)
    singleFilter[0].checked = checked;

    this.setState({filters: newFilters})
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.state

    console.log(filters)
    console.log(prevState.filters)

    let currentFilters = []
    filters.map(item => {
      currentFilters.push(item)
    })

    // console.log(currentFilters)
      // this.props.getObjects(currentFilters)

  }

  render() {
    const {data, isLoading, isEmpty} = this.props

    return (
      <Wrapper>
        {
          !isLoading && !isEmpty ? (
            <Fragment>
              <Filters filters={this.state.filters}
                       changeFilters={this.changeFilters} />
              <Map objects={data.objects}
                   loadingElement={<div style={{height: `90vh`}} />}
                   containerElement={<div style={{height: `90vh`, width: `100%`}} />}
                   mapElement={<div style={{height: `90vh`, width: `100%`}} />} />
            </Fragment>
          ) : (<div>Loading...</div>)
        }
      </Wrapper>
    );
  }
}

function mapStateToProps({objects}) {
  return {
    data: objects.objects.data,
    isLoading: objects.objects.isLoading,
    isEmpty: objects.objects.isEmpty
  }
}

export default connect(
  mapStateToProps,
  {getObjects}
)(Home)
