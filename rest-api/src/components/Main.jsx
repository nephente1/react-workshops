import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserList, UserDetails } from '../App';


const Main = () => {
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
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <UserList data={data}/>}/>
                    <Route path="/:id" children={<UserDetails data={data} />}/>
                </Switch>
            </Router>
		</div>
	);
}
export default Main;
