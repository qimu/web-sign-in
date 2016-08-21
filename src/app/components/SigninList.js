import React from 'react/addons';
import SigninItem from './SigninItem';

class SigninList extends React.Component {

	render() {
		var signNodes = this.props.data.map(function (signin) {
			return (
				<SigninItem key={signin.date} date={signin.date} name={signin.name} email={signin.email}/>
			)
		});
		return (
			<div className="signinList">
				{signNodes}
			</div>
		)
	}
}

export default SigninList;