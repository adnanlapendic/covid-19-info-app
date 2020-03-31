import * as React from 'react';
import { Country } from '../models/Country';
const GIO = require('giojs');

export interface GlobeComponentProps {
	test: Country;
	ref: any;
	bindCountryFromMap: any;
}

export interface GlobeComponentState {
	currentCountry: string | undefined;
	rotateGlobe: boolean;
}

const config = {
	control: {
		stats: false,
		disableUnmentioned: false,
		lightenMentioned: true,
		inOnly: false,
		outOnly: false,
		initCountry: 'CN',
		halo: true,
		transparentBackground: true,
		autoRotation: false,
		rotationRatio: 1
	},
	color: {
		surface: 2481914,
		selected: 12199719,
		in: 0,
		out: 0,
		halo: 2141154
		// "background": 0
	},
	brightness: {
		ocean: 0.5,
		mentioned: 1,
		related: 0
	}
};

class GlobeComponent extends React.Component<
	GlobeComponentProps,
	GlobeComponentState
> {
	state = { currentCountry: '', rotateGlobe: true };
	controller: any = null;
	myThis: any = this;
	changeName = (country: Country) => {
		this.setState({
			currentCountry: country.code,
			rotateGlobe: false
		});
		const controller = this.getGioGlobeController();
		controller.setAutoRotation(this.state.rotateGlobe, 1);
		controller.switchCountry(country.code);
	};

	componentDidMount() {
		const controller = this.getGioGlobeController();

		// use the onCountryPicked() to set callback when clicked country changed
		controller.onCountryPicked(callback.bind(this));
		controller.switchCountry('VA');
		controller.setAutoRotation(this.state.rotateGlobe, 1);
		controller.setTransparentBackground(true);
		// defined a callback function, as a demo, this function simply output selectedCountry, relatedCountries which are passed parameters into console
		function callback(this: any, selectedCountry: any, relatedCountries: any) {
			this.setState({
				currentCountry: selectedCountry.ISOCode,
				rotateGlobe: false
			});
			controller.setAutoRotation(this.state.rotateGlobe, 1);
		}
	}

	getGioGlobeController() {
		if (this.controller == null) {
			const container = document.getElementById('globalArea');
			const controller = new GIO.Controller(container, config);
			this.controller = controller;
			controller.init();
			return controller;
		} else {
			return this.controller;
		}
	}

	render() {
		return (
			<div
				onClick={() => this.props.bindCountryFromMap(this.state.currentCountry)}
				id='globalArea'></div>
		);
	}
}

export default GlobeComponent;
