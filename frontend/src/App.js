import Map from 'react-map-gl';

function App() {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // NOTE: Mapbox access token stored in .env file
      initialViewState={{
        longitude: -73.9712,
        latitude: 40.7831,
        zoom: 14
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default App;
