import React from 'react/addons';

class SigninForm extends React.Component {

	constructor() {
		super();
		this.state = {name: "", email: ""};
	}

	handleNameChange(e) {
		this.setState({name: e.target.value})
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();
		var name = this.state.name.trim();
		var email = this.state.email.trim();
		if (!name || !email) {
			return;
		}
		this.props.onSigninSubmit({name: name, email: email});
		this.setState({name: '', email: ''});
	}

	render() {
		return (
			<div className="signinForm" onSubmit={this.handleSubmit.bind(this)}>
				<form>
					<input
						type="text"
						placeholder="Your name"
						value={this.state.name}
						onChange={this.handleNameChange.bind(this)}
					/>
					<input
						type="text"
						placeholder="Your email"
						value={this.state.email}
						onChange={this.handleEmailChange.bind(this)}
					/>
					<input
						type="submit"
						value="Done"
					/>
				</form>
			</div>
		)
	}

}


export default SigninForm;