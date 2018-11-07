/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps} from 'recompose'
import {withGoogleMap, withScriptjs, GoogleMap} from 'react-google-maps'
import VehicleMarker from './VehicleMarker'
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const Map = compose(
  withScriptjs,
  withGoogleMap
)(({vehicles}) => {
  const mapStyle = require('./map-style.json')

  const renderMarkers = () =>
    vehicles.map((item, index) => (
      <VehicleMarker
        key={index}
        data={item}
        coordinates={{
          lat: parseFloat(item.location.latitude),
          lng: parseFloat(item.location.longitude)
        }}
      />
    ))

  const fitMap = map => {
    const bounds = new google.maps.LatLngBounds()

    vehicles.map(item => {
      const latLng = new google.maps.LatLng(item.location.latitude, item.location.longitude)
      bounds.extend(latLng)
    })

    if (map) {
      map.fitBounds(bounds)
    }
  }

  return vehicles && vehicles.length !== 0 ? (
    <GoogleMap
      ref={fitMap}
      defaultZoom={12}
      defaultCenter={{
        lat: parseFloat(vehicles[0].location.latitude),
        lng: parseFloat(vehicles[0].location.longitude)
      }}
      defaultOptions={{styles: mapStyle}}
    >
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
      {renderMarkers()}
      </MarkerClusterer>
    </GoogleMap>
  ) : (
    <div>...</div>
  )
})

Map.propTypes = {
  vehicles: PropTypes.array
}

export default withProps({
  googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ9nYm3T-adPKeHHUiEJP7lqfIeiJCZdo'
})(Map)
