import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import Stepper from './components/Stepper'
import ProgressPage from './components/ProgressPage';
import ForecastsPage from './components/ForecastsPage';
import TablePage from './components/TablePage';

import Reports from './views/Reports/Reports';
import Login from './views/Auth/Login/Login';
import SignUp from './views/Auth/SignUp/SignUp';
import Billing from './views/Billing/Billing';
import Settings from './views/Settings/Settings';
import Pricing from './views/Pricing/Pricing';
import ConfirmRegistration from './views/Auth/Confirm/Confirm';

import { AuthContext } from './context/context';

function Routes() {
	const {
		state: { isAuthenticated },
	} = React.useContext(AuthContext);
	return isAuthenticated ? (
		<MenuBar>
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/stepper' />} />
				<Route path='/reports' component={Reports} />
				<Route path='/settings' component={Settings} />
				<Route path='/billing' component={Billing} />
				<Route path='/pricing' component={Pricing} />

				<Route path='/stepper' component={Stepper} />
				<Route path='/progress' component={ProgressPage} />
				<Route path='/forecasts' component={ForecastsPage} />
				<Route path='/table' component={TablePage} />

				<Route path='*' render={() => <Redirect to='/stepper' />} />
			</Switch>
		</MenuBar>
	) : (
		<Switch>
			<Route exact path='/' render={() => <Redirect to='/login' />} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={SignUp} />
			<Route exact path='/verify' component={ConfirmRegistration} />
			<Route path='*' render={() => <Redirect to='/login' />} />
		</Switch>
	);
}




export default Routes;