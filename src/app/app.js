import React from 'react/addons';
import AppRoot from './components/AppRoot';

/*
 * @class App
 */
class App {

	constructor(data) {
		this.data = data;
	}

	render(element) {

		var appRootElement = <AppRoot url="/api/signins" data={this.data} pollInterval={2000} />;

		// render to DOM
		if (element) {
			React.render(appRootElement, element);
			return;
		}
	}

	renderToDOM(element) {
		if (!element) {
			return debug(new Error('App.renderToDOM: element is required'));
		}

		this.render(element);
	}

}

export default App;
