/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps} from 'recompose'
import {withGoogleMap, withScriptjs, GoogleMap} from 'react-google-maps'
import VehicleMarker from './VehicleMarker'
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer'
import {carCluster, parkingCluster, poiCluster} from '../../constats/images'

const Map = compose(
  withScriptjs,
  withGoogleMap
)(({objects}) => {
  const mapStyle = require('./map-style.json')

  const vehicles = objects
    .map(object => object)
    .filter(criteria => criteria.discriminator === 'vehicle')
  const parkings = objects
    .map(object => object)
    .filter(criteria => criteria.discriminator === 'parking')
  const pois = objects.map(object => object).filter(criteria => criteria.discriminator === 'poi')

  const renderMarkers = types =>
    types.map((item, index) => (
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

    objects.map(item => {
      const latLng = new google.maps.LatLng(item.location.latitude, item.location.longitude)
      bounds.extend(latLng)
    })

    if (map) {
      map.fitBounds(bounds)
    }
  }

  const generateClusterStyle = type => {
    return [
      {
        url: type,
        height: 32,
        width: 32,
        textColor: '#fff'
      }
    ]
  }

  const centerMap = {
    lat: 51.107883,
    lng: 17.038538
  }

  return objects && objects.length !== 0 ? (
    <GoogleMap
      ref={fitMap}
      defaultZoom={12}
      defaultCenter={{
        lat: parseFloat(objects[0].location.latitude),
        lng: parseFloat(objects[0].location.longitude)
      }}
      defaultOptions={{styles: mapStyle}}
    >
      <MarkerClusterer enableRetinaIcons gridSize={25} styles={generateClusterStyle(carCluster)}>
        {renderMarkers(vehicles)}
      </MarkerClusterer>
      <MarkerClusterer
        enableRetinaIcons
        gridSize={25}
        styles={generateClusterStyle(parkingCluster)}
      >
        {renderMarkers(parkings)}
      </MarkerClusterer>
      <MarkerClusterer enableRetinaIcons gridSize={25} styles={generateClusterStyle(poiCluster)}>
        {renderMarkers(pois)}
      </MarkerClusterer>
    </GoogleMap>
  ) : objects.length === 0 ? (
    <GoogleMap defaultZoom={12} defaultCenter={centerMap} defaultOptions={{styles: mapStyle}} />
  ) : (
    <div>Loading...</div>
  )
})

Map.propTypes = {
  objects: PropTypes.array
}

export default withProps({
  googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ9nYm3T-adPKeHHUiEJP7lqfIeiJCZdo'
})(Map)
