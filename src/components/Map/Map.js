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
                            position={{ lat: marker.ubicacion.lat, lng: marker.ubicacion.lng }}
                            name={marker.title}
                            data={marker}
                            icon={{
                                url: marker.tipo_maquinaria.icono,
                                anchor: new this.props.google.maps.Point(17, 46),
                                scaledSize: new this.props.google.maps.Size(24, 24)
                            }}
                        />
                    );
                }
                return <></>;
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
    apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    v: "3.30",
    language: 'es',
    LoadingContainer: Spinner
})(MapContainer);