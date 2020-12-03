import React from 'react';
import './App.css';
import moment from "moment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {TextBlock, RoundShape} from 'react-placeholder/lib/placeholders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Context = React.createContext();

const App = () => {
	const [context, setContext] = React.useState(); //for context
	const [data, setData] = React.useState();

	React.useEffect( () => {
		const loadData = async() => {
			const response = await fetch(`https://randomuser.me/api/?results=10`);
			const respJson = await response.json();
			setData(respJson.results);
		}
		setTimeout(() => {
			loadData()
		}, 300);

	}, []);

	return (
		<div className="App">
			<h1>Random Users App</h1>

			<Context.Provider value={[context, setContext]}> {/* passing functions to create context */}
				<Router>
					<Switch>
						<Route exact path="/" render={() => <UserList data={data} />}/>
						<Route path="/:id" children={<UserDetails />}/>
					</Switch>
				</Router>
			</Context.Provider>

		</div>
	);
}
export default App;


const UserList = (props) => {
	const awesomePlaceholder = (
		<div className='my-awesome-placeholder' style={{width: '80vw'}}>
		    <RoundShape color='silver' style={{width: 120, height: 120, margin: '0 0 20px 0'}}/>
    		<TextBlock rows={7} color='silver'/>
		</div>
	);
	return(
		<div className="main-list">
			<ReactPlaceholder showLoadingAnimation ready={props.data !== undefined} customPlaceholder={awesomePlaceholder}>
			{props.data?.map(el =>
				<User
					key={el.login.uuid}
					name={el.name.first}
					surname={el.name.last}
					adress={el.location.city + ' - ' + el.location.country}
					email={el.email}
					registration={el.registered.date}
					image={el.picture}
					uuid={el.login.uuid}
					location={el.location}
				/>)
			}
			</ReactPlaceholder>
		</div>
	)
}


const User = (props) => {
	const [context, setContext] = React.useContext(Context);
	const { name, surname, adress, email, registration, image, uuid } = props;
	const dateFormated = moment(registration).format('YYYY-MM-DD HH:ss');
	return(
		<Link to={{ pathname: `${uuid}` }}>
			<div onClick={() => setContext(props)} className='userBox'> {/* creating context object with data for clicked userDetails */}
				<p>Name: {name}</p>
				<p>Surname: {surname}</p>
				<p>Adress: {adress}</p>
				<p>Email: {email}</p>
				<p>Registration date: {dateFormated}</p>
				<div><img alt={name} src={image.thumbnail} /></div>
			</div>
		</Link>
	)
}


const UserDetails = () => {
	let history = useHistory();
	const handleBackClick = () => {
		history.push('/');
	}

	const [context] = React.useContext(Context);
	const position = [context.location.coordinates.latitude, context.location.coordinates.longitude];
	return(
		<div className='userContainer'>
			<h1>{context.name} {context.surname}</h1>
			<p><img alt={context.name} src={context.image.large}/></p>
			<h3>City: {context.location.city}</h3>

			<MapContainer style={{width: '90%', height: '300px'}} center={position} zoom={2} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				<Marker position={position}>
					<Popup>
					Hello from <br /> {context.location.city}!
					</Popup>
				</Marker>
			</MapContainer>
			<button onClick={handleBackClick}>back</button>
		</div>
	)
}

