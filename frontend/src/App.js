import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl'; // NOTE: react library; provides pre-built react components for mapbox api
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import axios from 'axios'; // NOTE: JS library used to make HTTP requests from a browser; used here to fetch data (pins) from Atlas db
import { format } from 'timeago.js'; // NOTE: JS library used to format datetime eg: '3 hours ago'
import Register from './components/Register.jsx';

function App() {
  console.log('Rendering map...')

  // Track the current user logged in
  const [currentUser, setCurrentUser] = useState(null);

  // Track where user double clicks map
  const [newPlace, setNewPlace] = useState(null);

  // Track all pins in db
  const [pins, setPins] = useState([]);

  // Track the marker id that user clicks on
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  console.log('currentPlaceId: ', currentPlaceId);

  // Track viewport
  const [viewState, setViewState] = useState({longitude: -95.8, latitude: 40, zoom: 3.8})

  // Track user-entered title, review, and rating when creating new marker
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);

  // Grab all pins as side-effect on app render
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
  }, []);

  // Update marker id to be the one user clicked on
  const handleMarkerClick = (id, long, lat) => {
    console.log('id of selected marker: ', id);
    setCurrentPlaceId(id);
    console.log('long: ', long);
    console.log('lat: ', lat);
    setViewState({...viewState, longitude: long, latitude: lat});
  }

  // Handle update long and lat to where map is double clicked
  const handleMapDoubleClick = (e) => {
    // console.log('double click event: ', e);
    const { lng, lat } = e.lngLat;
    console.log('long: ', lng);
    console.log('lat: ', lat);
    setNewPlace({lat, lng});
  }

  // Handle logic when user clicks 'submit' button
  const handleSubmit = async (e) => {
    // Prevent page from reloading
    e.preventDefault();
    // Create a new marker object w/ user entered info
    const newMarker = {
      username: currentUser,
      title,
      review,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng
    }
    try {
        console.log('new marker being added: ', newMarker);
        // Make a POST request to the '/pins' endpoint w/ new marker object (adds new marker to db)
        const res = await axios.post('/pins', newMarker);
        setPins([...pins, res.data]);
        setNewPlace(null);
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <div>
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={ {width:'100vw', height:'100vh'} }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
      onDblClick={ handleMapDoubleClick }
      // transitionDuration='200'
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
                          { Array(p.rating).fill(<StarIcon className='stars' />) }
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
              <form onSubmit={ handleSubmit }>
                <label>Title</label>
                <input placeholder='Enter a Title' onChange={ (e) => setTitle(e.target.value) }/>
                <label>Review</label>
                <textarea placeholder='Tell us something about this place' onChange={ (e) => setReview(e.target.value) }/>
                <label>Rating</label>
                <select onChange={ (e) => setRating(e.target.value) }>
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
      { currentUser ?
        <button className='logoutButton'>Log out</button> 
        :  
        <div>
          <button className='loginButton'>Login</button>
          <button className='registerButton'>Register</button>
        </div>
      }
      <div className='registerForm'>
        <Register />
      </div>
    </div>
  );
}

export default App;