import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl'; // NOTE: react library; provides pre-built react components for mapbox api
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import axios from 'axios'; // NOTE: JS library used to make HTTP requests from a browser; used here to fetch data (pins) from Atlas db
import { format } from 'timeago.js'; // NOTE: JS library used to format datetime eg: '3 hours ago'

function App() {
  console.log('Loading map...')
  // Track all pins in db and set new pins
  const [pins, setPins] = useState([]);
  // Track the marker id that we click on
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  console.log('currentPlaceId: ', currentPlaceId);

  useEffect(() => {
    const getPins = async () => {
      try {
          console.log('Retrieving pins...')
          const res = await axios.get('/pins');
          console.log('Pins found: ', res.data);
          setPins(res.data);
      } catch(err) {
          console.log(err);
      }
    }
    getPins();
  }, []); // NOTE: useEffect allows you to perform side effects after react component is rendered (remember, rendering code must be pure)

  // Updates marker id to be the one we clicked on
  const handleMarkerClick = id => {
    console.log('id of selected marker: ', id);
    setCurrentPlaceId(id);
  }

  return (
    <Map
      initialViewState={ {longitude: -95.8, latitude: 40, zoom: 3.8} }
      style={ {width:'100vw', height:'100vh'} }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
    >
      { pins.map(p => {
        return (
          <>
            <Marker longitude={ p.long } latitude={ p.lat } color="red">
              <PlaceIcon style={ {fontSize:40, color:'slateblue'} } onClick={ () => handleMarkerClick(p._id) }/>
            </Marker>
            { 
              p._id === currentPlaceId && (
                <Popup longitude={ p.long } latitude={ p.lat } closeButton={ true } closeOnClick={ false } anchor="left" >
                  <div className='popup'>
                    <label>Place</label>
                    <h4 className='place'>{ p.title }</h4>
                    <label>Review</label>
                    <p className='review'>{ p.review }</p>
                    <label>Rating</label>
                      <div className='stars'>
                        <StarIcon className='stars' />
                        <StarIcon className='stars' />
                        <StarIcon className='stars' />
                        <StarIcon className='stars' />
                        <StarIcon className='stars' />
                      </div>
                    <label>Information</label>
                    <span className='username'>Created by <b>{ p.username }</b></span>
                    <span className='date'>{ format(p.createdAt) }</span>
                  </div>
                </Popup>
              )
            }
          </>
        )
      }) }
    </Map>
  );
}

export default App;
