import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";



  
  const MapView = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const markers = [
   
    { address: "Health-Building-Entry1", lat: 37.335776, lng: -121.879080 },
    { address: "Health-Building-Exit", lat:  37.335652, lng: -121.879235 },
    { address: "Health-Building-Entry", lat:  37.335853, lng: -121.879241 },
    { address: "Health-Buildingr-NW-Exit", lat:  37.335529, lng:-121.879037 },
    { address: "Health-Building-Lobby", lat:  37.335678, lng:-121.879160 },
    { address: "Art-Building-LeftEntry", lat:  37.336210, lng:-121.880210},
    { address: "Art-Building-RightEntry", lat:  37.336423, lng:-121.879765},
    { address: "Art-Building-Exit", lat:  37.335826, lng:-121.880001},
    { address: "Art-Building-LeftLobby", lat:  37.336005, lng:-121.880173},
    { address: "Art-Building-LeftLobby", lat:   37.336193, lng:-121.879518},
    { address: "Music-Building-Entrance", lat:    37.335456, lng:-121.881129},
    { address: "Concert-Hall-Entrance", lat:     37.335439, lng:-121.880764},
    { address: "Music-Building-Exit", lat:     37.335860, lng:-121.880984},
    { address: "Dinning-Commons-Exit", lat:     37.334145, lng:-121.878285},
    { address: "Dinning-Commons-Entry", lat:      37.333949, lng:-121.8787255},
    { address: "Engineering-building-Entry", lat:      37.336700, lng:-121.881069},
    { address: "Engineering-building-exit(Street View)", lat:     37.337165,lng:-121.882475},
    { address: "Lobby", lat:     37.337361,lng:  -121.881964},
    

  

    
   

  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {markers.map(({ address, lat, lng }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat, lng }}
              icon = {{
                //url: 'https://freesvg.org/img/1499683972.png',
                url:'https://freesvg.org/img/tv_camera_sign.png',
                //url:'https://freesvg.org/img/jcartier-wireless-video-camera.png',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
              // {{
              //   url: './Images/camera.png',
              //   scaledSize: new window.google.maps.Size(50, 50),
              // }}
              
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  
                {<h6 style={{ color: '#6870fa' }}>{infoWindowData.address}</h6> }
                  
                </InfoWindow>

              )}
              
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};
  
  export default MapView;