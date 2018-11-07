/* eslint-disable no-undef */
import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Marker} from 'react-google-maps'
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'

import {CloseBox} from './Content'

class VehicleMarker extends Component {
  state = {
    isOpen: false
  }

  handleToggle = () => {
    this.setState(prev => {
      return {isOpen: !prev.isOpen}
    })
  }

  render() {
    const {coordinates, data} = this.props
    console.log(data)
    return (
      <Marker position={coordinates} onClick={this.handleToggle}>
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
