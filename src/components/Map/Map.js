import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
import { config } from "./Config"
import Spinner from "../UI/Spinner/Spinner";
// google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
// var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2)); 
// https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3

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
            initialCenter={this.props.userLocation}
            zoom={this.props.zoom} 
            center={this.props.userLocation}
            onClick={this.props.mapClick}
            >
            {this.props.markers.map(marker =>
                <Marker
                    key={marker.id}
                    onClick={this.props.markerClick}
                    position={{ lat: marker.ubicacion.lat, lng: marker.ubicacion.lng }}
                    name={marker.title}
                    data={marker}
                    icon={{
                        url: marker.tipo_maquinaria.icono,
                        anchor: new this.props.google.maps.Point(17, 46),
                        scaledSize: new this.props.google.maps.Size(24, 24)
                    }}
                />
            )}
            {this.props.userLocation &&  <Marker 
                                                key="current" 
                                                position={this.props.userLocation} 
                                                name="Tu ubicación" 
                                                icon={config.userIcon} />}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    v: "3.30",
    language: 'es',
    LoadingContainer: Spinner
})(MapContainer);