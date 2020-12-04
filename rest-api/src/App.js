import React from 'react';
import './App.css';
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory,  useParams } from 'react-router-dom';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {TextBlock, RoundShape} from 'react-placeholder/lib/placeholders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export const UserList = (props) => {

	const awesomePlaceholder = (
		<div className='my-awesome-placeholder' style={{width: '80vw'}}>
		    <RoundShape color='silver' className='roundShapeStyle'/>
    		<TextBlock rows={7} color='silver'/>
		</div>
	);
	return(
		<div className="main-list">
			<ReactPlaceholder showLoadingAnimation ready={!!props.data} customPlaceholder={awesomePlaceholder}>
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


export const User = (props) => {
	const { name, surname, adress, email, registration, image, uuid } = props;
	const dateFormated = moment(registration).format('YYYY-MM-DD HH:ss');
	return(
		<Link to={{ pathname: `${uuid}` }}>
			<div className='userBox'> {/* creating context object with data for clicked userDetails */}
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


export const UserDetails = (props) => {
	let history = useHistory();
	const handleBackClick = () => {
		history.push('/');
	}

	if (props.data === undefined){
		window.location.reload();
		history.push('/');
	}

	const params = useParams();
	const filteredData = props.data.filter( el => el.login.uuid === params.id);
    const data = Object.assign(...filteredData);

	const position = [data.location.coordinates.latitude, data.location.coordinates.longitude];
	return(
		<div className='userContainer'>
			<h1>{data.name.first} {data.name.last}</h1>
			<p><img alt={data.name.first} src={data.picture.large}/></p>
			<h3>City: {data.location.city}</h3>

			<MapContainer style={{width: '90%', height: '300px'}} center={position} zoom={2} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				<Marker position={position}>
					<Popup>
					Hello from <br /> {data.location.city}!
					</Popup>
				</Marker>
			</MapContainer>
			<button onClick={handleBackClick}>back</button>
		</div>
	)
}

