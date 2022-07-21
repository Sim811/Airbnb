import {Map, Marker, Popup} from 'react-map-gl';
import { useState } from 'react';
import getCenter from "geolib/es/getCenter";



function Maps( {searchResults} ) {

  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((e) => ({
    longitude: e.long,
    latitude: e.lat,
  }) );


  const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
      width: '100',
      height: '100',
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: 8,
    });

  return (
    <Map
    mapStyle='mapbox://styles/simidev/cl4yq2kue000114oeo5v9m1d9'
    mapboxAccessToken={process.env.mapbox_key}
    {...viewport}
    onMove={(nextViewport) => setViewPort(nextViewport.viewport)}
    >

    {searchResults.map(e => (
      <div key={e.long} >
        

        <Marker
          longitude={e.long}
          latitude={e.lat}
          offsetLeft={-20}
          offsetTop={-10}
          >
          <p 
            onClick={() => setSelectedLocation(e)} 
            className="cursor-pointer text-2xl animate-bounce"
            role="img"          
            aria-label="push-pin"
          >📌</p>
          {/* 
            added import 'mapbox-gl/dist/mapbox-gl.css'
            to fix the markers not appearing on the map
           */}
        </Marker>
      
           
        {selectedLocation.long === e.long ? (
          <Popup
            onClose={() => setSelectedLocation({})}
            closeOnClick={true}
            latitude={e.lat}
            longitude={e.long}
          >
            {e.title}
          </Popup>
        ) : (
          false
        )}
      </div>
    ))}
  </Map>
  );
}


export default Maps;