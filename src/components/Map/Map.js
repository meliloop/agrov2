import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Circle } from "google-maps-react"
import { config } from "./Config"
import Spinner from "../UI/Spinner/Spinner";

export class MapContainer extends Component {
    render() {
        if (!this.props.google)
            return <Spinner />;
            
        return (
            <Map 
            styles={config.style}
            zoomControl={false}
            scaleControl={false}
            streetViewControl={false}
            panControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            google={this.props.google} 
            initialCenter={this.props.userLocation ? this.props.userLocation:config.default_center}
            zoom={this.props.zoom} 
            center={this.props.userLocation}
            onClick={this.props.mapClick}
            >
            {Object.keys(this.props.markers).map(key => 
                <Marker
                    key={key}
                    onClick={this.props.markerClick}
                    position={{ lat: (this.props.markers[key].ubicacion.lat+(this.props.markers[key].data.id/10000)), lng: (this.props.markers[key].ubicacion.lng+(this.props.markers[key].data.id/10000)) }}
                    name={this.props.markers[key].data.title}
                    data={this.props.markers[key].items}
                    icon={{
                        url: this.props.markers[key].data.icono,
                        anchor: new this.props.google.maps.Point(17, 46),
                        scaledSize: (this.props.activeMarker !== null && key === this.props.activeMarker ) ? new this.props.google.maps.Size(50, 50):new this.props.google.maps.Size(24, 24)
                    }}
                />
            )}

            {this.props.userLocation &&  <Marker 
                                                key="current" 
                                                position={this.props.userLocation} 
                                                name="Tu ubicación" 
                                                icon={config.userIcon} />}
            {(this.props.radius && this.props.userLocation) && <Circle
                                    radius={this.props.radius*1000}
                                    center={this.props.userLocation}
                                    strokeColor='transparent'
                                    strokeOpacity={0}
                                    strokeWeight={5}
                                    fillColor='#72B230'
                                    fillOpacity={0.1}
                                />}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    // eslint-disable-next-line no-undef
    apiKey: typeof firebase !== 'undefined' ? firebase.config().googlemaps.key : process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    v: "3.30",
    language: 'es',
    LoadingContainer: Spinner
})(MapContainer);