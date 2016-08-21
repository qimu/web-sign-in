import React from 'react/addons';
import SigninForm from './SigninForm';
import SigninList from './SigninList';
import $ from 'jquery';

import config from '../../../config/app';

class AppRoot extends React.Component {

	constructor() {
		super();
		this.state = {
			data: []
		}
	}

	render() {
		return (
			<div className="SigninBox">
				<h1>Please Sign In</h1>
				<SigninForm onSigninSubmit={this.handleSigninSubmit.bind(this)}/>
				<SigninList data={this.state.data}/>
			</div>
		);
	}

	getSignins() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({data: data});
			}.bind(this),
			error: function (err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	componentDidMount() {
		this.getSignins();
	}

	handleSigninSubmit(signin) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: signin,
			success: function (signins) {
				this.setState({data: signins});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}
		})
	}

}

// Prop types validation
AppRoot.propTypes = {
	url: React.PropTypes.string.isRequired
};

export default AppRoot;
