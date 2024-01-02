import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl'; // NOTE: react library; provides pre-built react components for mapbox api
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import StarIcon from '@mui/icons-material/Star';
import './app.css';

function App() {
  // const [showPopup, setShowPopup] = useState<boolean>(true);

  return (
    <Map
      initialViewState={{
        longitude: -95.8,
        latitude: 40,
        zoom: 3.8
      }}
      style={ { width:'100vw', height:'100vh' } }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
    >
      <Marker 
        longitude={ -73.97 } 
        latitude={ 40.78 } color="red"
      >
        <PlaceIcon style={ {fontSize:40, color:'slateblue'} }/> 
      </Marker>
      <Popup 
        longitude={ -73.97 } 
        latitude={ 40.78 }
        anchor="left"
      >
        <div className='popup'>
          <label>Place</label>
          <h4 className='place'>NYC</h4>
          <label>Review</label>
          <p className='review'>The best city.</p>
          <label>Rating</label>
            <div className='stars'>
              <StarIcon className='stars' />
              <StarIcon className='stars' />
              <StarIcon className='stars' />
              <StarIcon className='stars' />
              <StarIcon className='stars' />
            </div>
          <label>Information</label>
          <span className='username'>Created by <b>arthurtcheung</b></span>
          <span className='date'>1 hour ago</span>
        </div>
      </Popup>
    </Map>
  );
}

export default App;
