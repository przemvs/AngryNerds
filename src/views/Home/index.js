import React, { Component } from 'react';
import {connect} from "react-redux";
import {getVehicles} from "../../state/actions/vozilla.actions";
import Map from "../../components/Map";

class Home extends Component {
  componentDidMount () {
    this.props.getVehicles()
  }

  render() {
    const {data, isLoading, isEmpty} = this.props

    return (
      <div>
        {
          !isLoading && !isEmpty ? (
            <Map vehicles={data}
                 loadingElement={<div style={{height: `80vh`}} />}
                 containerElement={<div style={{height: `80vh`, width: `100%`}} />}
                 mapElement={<div style={{height: `80vh`, width: `100%`}} />} />
          ) : (<div>...</div>)
        }
        container

      </div>
    );
  }
}

function mapStateToProps({vehicles}) {
  return {
    data: vehicles.vehicles.data,
    isLoading: vehicles.vehicles.isLoading,
    isEmpty: vehicles.vehicles.isEmpty
  }
}

export default connect(
  mapStateToProps,
  {getVehicles}
)(Home)
