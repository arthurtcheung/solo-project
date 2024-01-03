import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl'; // NOTE: react library; provides pre-built react components for mapbox api
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import axios from 'axios'; // NOTE: JS library used to make HTTP requests from a browser; used here to fetch data (pins) from Atlas db
import { format } from 'timeago.js'; // NOTE: JS library used to format datetime eg: '3 hours ago'

function App() {
  console.log('Rendering map...')

  const currentUser = 'arthurtcheung';

  // Track when user double clicks map to add a new marker
  const [newPlace, setNewPlace] = useState(null);

  // Track all pins in db and set new pins
  const [pins, setPins] = useState([]);

  // Track the marker id that we click on
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  console.log('currentPlaceId: ', currentPlaceId);

  // Track viewport and change its center
  const [viewState, setViewState] = useState({longitude: -95.8, latitude: 40, zoom: 3.8})

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
  const handleMarkerClick = (id, long, lat) => {
    console.log('id of selected marker: ', id);
    setCurrentPlaceId(id);
    console.log('long: ', long);
    console.log('lat: ', lat);
    setViewState({...viewState, longitude: long, latitude: lat});
  }

  // Updates long and lat to be the long and lat of the user's pointer when map is double clicked
  const handleMapDoubleClick = (e) => {
    // console.log('double click event: ', e);
    const { lng, lat } = e.lngLat;
    console.log('long: ', lng);
    console.log('lat: ', lat);
    setNewPlace({lat, lng});
  }

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={ {width:'100vw', height:'100vh'} }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
      onDblClick={ handleMapDoubleClick }
      transitionDuration='200'
    >
      { pins.map(p => {
        return (
          <>
            <Marker longitude={ p.long } latitude={ p.lat }>
              <PlaceIcon style={ {fontSize:40, color: p.username === currentUser ? 'tomato' : 'slateblue', cursor:'pointer'} } onClick={ () => handleMarkerClick(p._id, p.long, p.lat) }/>
            </Marker>
            { 
              p._id === currentPlaceId && (
                <Popup longitude={ p.long } latitude={ p.lat } closeButton={ true } closeOnClick={ false } anchor="left" onClose={ () => setCurrentPlaceId(null) }>
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
      { newPlace && (
        <Popup longitude={ newPlace.lng } latitude={ newPlace.lat } closeButton={ true } closeOnClick={ false } anchor="left" onClose={ () => setNewPlace(null) }>
          <div>
            <form>
              <label>Title</label>
              <input placeholder='Enter a Title'/>
              <label>Review</label>
              <textarea placeholder='Tell us something about this place'/>
              <label>Rating</label>
              <select>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <button className='submitButton' type='submit'>Add Pin</button>
            </form>
          </div>
        </Popup>
      ) }
    </Map>
  );
}

export default App;
