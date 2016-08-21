import React from 'react/addons';

class SigninItem extends React.Component {

	render() {
		var dateObj = new Date(this.props.date);
		var date = dateObj.getDate();
		var year = dateObj.getFullYear();
		var month = dateObj.getMonth();
		var dateStr = `${month}-${date}-${year}`;
		return (
			<li className="signinItem">
				{this.props.name} - {this.props.email} - {dateStr}
			</li>
		)
	}
}

export default SigninItem;