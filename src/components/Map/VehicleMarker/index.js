/* eslint-disable no-undef */
import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Marker} from 'react-google-maps'
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'

import {CloseBox} from './Content'

import {parkingMarker, poiMarker} from '../../../constats/images'

class VehicleMarker extends Component {
  state = {
    isOpen: false
  }

  handleToggle = () => {
    this.setState(prev => {
      return {isOpen: !prev.isOpen}
    })
  }

  markerType = type => {
    switch(type) {
      case 'parking':
        return parkingMarker
      case 'poi':
        return poiMarker
      case 'vehicles':

      default:
        return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          scale: 1.25,
          strokeOpacity: 0,
          strokeWeight: 1.0,
          fillColor:'red',
          fillOpacity: 1
        }
    }
  }
  render() {
    const {coordinates, data} = this.props

    return (
      <Marker position={coordinates}
              onClick={this.handleToggle}
              icon={this.markerType(data.discriminator)}>
        {this.state.isOpen && (
          <InfoBox
            onCloseClick={this.handleToggle}
            defaultPosition={new google.maps.LatLng(coordinates)}
            options={{
              pane: 'overlayLayer',
              pixelOffset: new google.maps.Size(-146.5, -42),
              alignBottom: true,
              maxWidth: 500,
              boxStyle: {
                boxShadow: `0em 0.125em 0.625em 0em #bbc3cf`
              },
              closeBoxURL: '',
              enableEventPropagation: true
            }}
          >
            <Fragment>
              <CloseBox onClick={this.handleToggle}>
                close
              </CloseBox>

              <div>{data.name}</div>

            </Fragment>
          </InfoBox>
        )}
      </Marker>
    )
  }
}

VehicleMarker.propTypes = {
  coordinates: PropTypes.object,
  data: PropTypes.object,
}

export default VehicleMarker
