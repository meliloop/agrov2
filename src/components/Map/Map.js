import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
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
            {this.props.markers.map(marker => {
                if( marker.ubicacion ){
                    return (
                        <Marker
                            key={marker.id}
                            onClick={this.props.markerClick}
                            position={{ lat: (marker.ubicacion.lat+(marker.id/10000)), lng: (marker.ubicacion.lng+(marker.id/10000)) }}
                            name={marker.title}
                            data={marker}
                            icon={{
                                url: marker.tipo_maquinaria.icono,
                                anchor: new this.props.google.maps.Point(17, 46),
                                scaledSize: (this.props.activeMarker !== null && marker.id === this.props.activeMarker.data.id ) ? new this.props.google.maps.Size(50, 50):new this.props.google.maps.Size(24, 24)
                            }}
                        />
                    );
                }
                return <div></div>;
            })}
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
    // eslint-disable-next-line no-undef
    apiKey: firebase.config().googlemaps.key,
    v: "3.30",
    language: 'es',
    LoadingContainer: Spinner
})(MapContainer);