import React from 'react';
import { DataService } from '../services/DataService';
import { ListComponent } from './ListComponent';
import { CountryInfo } from '../models/CountryInfo';
import GlobeComponent from './GlobeComponent';
import { Country } from '../models/Country';
import image from '../wallpaperflare.com_wallpaper.jpg';
import CardComponent from './CardComponent';
export interface MainComponentProps {
	selectCountry: any;
}

export interface MainComponentState {
	coronaInfoInCountries: CountryInfo[];
	selectedCountry: Country;
	newCases: string;
	activeCases: number;
	criticalCases: number;
	recoveredCases: number;
	totalCases: number;
	newDeaths: string;
	totalDeaths: number;
	dataForDisplay: CountryInfo;
}

export class MainComponent<
	MainComponentProps,
	MainComponentState
> extends React.Component {
	state = {
		coronaInfoInCountries: [],
		selectedCountry: { name: '', code: '' },
		dataForDisplay: {
			country: '',
			cases: { new: '', active: 0, critical: 0, recovered: 0, total: 0 },
			deaths: { new: '', total: 0 }
		}
	};

	gioRef = React.createRef<any>();

	async componentDidMount() {
		const data = await this.getAllDataInfo();
		const allData = this.getDataForTheWholeWorld(data);

		this.setState({
			coronaInfoInCountries: data,
			dataForDisplay: allData
		});
	}

	getDataForCountry(country: Country) {
		const data: CountryInfo[] = this.state.coronaInfoInCountries;
		for (let i = 0; i < data.length; i++) {
			if (data[i].country === country.name) {
				this.setState({ dataForDisplay: data[i] });
				return;
			}
		}

		this.setState({
			dataForDisplay: {
				country: country.name,
				cases: { new: 0, active: 0, critical: 0, recovered: 0, total: 0 },
				deaths: { new: 0, total: 0 }
			}
		});
	}

	getDataForTheWholeWorld(data: CountryInfo[]) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].country === 'All') {
				return data[i];
			}
		}
		return null;
	}

	async getAllDataInfo() {
		const dataService: DataService = new DataService();
		const data: CountryInfo[] = await dataService.getAllData();
		return data;
	}

	selectCountryfromList(country: Country) {
		this.setState({ selectedCountry: country });
		this.gioRef.current?.changeName(country);
		this.getDataForCountry(country);
	}

	bindCountryFromMap(countryCode: string) {
		const dataService: DataService = new DataService();
		const countries: Country[] = dataService.getCountries();
		let country: Country = new Country();
		for (let i = 0; i < countries.length; i++) {
			if (countries[i].code === countryCode) {
				country = countries[i];
			}
		}
		this.getDataForCountry(country);
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row my-row'>
					<img className='background-image' src={image} alt='' />
					<div className='overlay'></div>
					<div className='col-sm-2 pr-0'>
						<div className='row big-card'>
							<div className='card border-primary mb-3 transparent w-100 ml-5 mt-4'>
								<div className='card-header text-primary'>
									LIST OF COUNTRIES
								</div>
								<div className='card-body text-primary'>
									<ListComponent
										selectCountry={this.selectCountryfromList.bind(this)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='col-sm-8 pl-0'>
						<div className='row top-info-data'>
							<div className='col-12 info-data-2 text-center'>
								<h1>
									{this.state.dataForDisplay.country === 'All'
										? 'THE WORLD'
										: this.state.dataForDisplay.country}
								</h1>
							</div>
						</div>
						<GlobeComponent
							ref={this.gioRef}
							bindCountryFromMap={this.bindCountryFromMap.bind(this)}
							test={this.state.selectedCountry}
						/>
						<div className='row bottom-info-data'>
							<div className='col-3'>
								<CardComponent
									countries={this.state.coronaInfoInCountries}
									title={'TOTAL'}
								/>
							</div>
							<div className='col-3'>
								<CardComponent
									countries={this.state.coronaInfoInCountries}
									title={'ACTIVE'}
								/>
							</div>
							<div className='col-3'>
								<CardComponent
									countries={this.state.coronaInfoInCountries}
									title={'RECOVERED'}
								/>
							</div>
							<div className='col-3'>
								<CardComponent
									countries={this.state.coronaInfoInCountries}
									title={'DEATHS'}
								/>
							</div>
						</div>
					</div>
					<div className='col-sm-2 pr-0 mt-4'>
						<div className='row pl-0'>
							<div className='col-12 pl-0 mr-4 pr-4'>
								<div className='card border-primary mb-3 transparent bottom-card'>
									<div className='card-header'>DEVELOPER </div>
									<div className='card-body bottom-card-list-data'>
										<div className='row text-left'>
											<div className='col-12'>
												<a
													href='https://www.linkedin.com/in/adnan-lapendic-413805136/'
													target='_blank'>
													Adnan Lapendic
												</a>
											</div>
											<div className='col-12'>Bosnia and Herzegovina</div>
											<div className='col-12'>adnan.lapendic@gmail.com</div>
										</div>{' '}
									</div>
								</div>
							</div>
						</div>
						<div className='row right-big-card'>
							<div className='card border-primary transparent w-100 mr-4'>
								<div className='card-header text-center'>
									INFECTED
									<h2 className='red'>
										{this.state.dataForDisplay.cases.total}
									</h2>
								</div>
								<div className='card-body text-primary all-data-table'>
									<div className='col-12'>
										<div className='row'>
											<div className='col-7 text-left'>TODAY:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.cases.new}
											</div>
										</div>
										<div className='row text-left'>
											<div className='col-7 text-left'>ACTIVE:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.cases.active}
											</div>
										</div>
										<div className='row text-left'>
											<div className='col-7 text-left'>CRITICAL:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.cases.critical}
											</div>
										</div>
										<div className='row text-left'>
											<div className='col-7 text-left'>RECOV:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.cases.recovered}
											</div>
										</div>
										<div className='row text-left'>
											<div className='col-7 text-left'>DIED:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.deaths.new}
											</div>
										</div>
										<div className='row text-left'>
											<div className='col-7 text-left'>DEATHS:</div>
											<div className='col-5 text-right'>
												{this.state.dataForDisplay.deaths.total}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='row bottom-info-data pl-0'>
							<div className='col-12 pl-0 pr-2'>
								<CardComponent
									countries={this.state.coronaInfoInCountries}
									title={'DEATHS TODAY'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
