import React from 'react';
import { DataService } from '../services/DataService';
import { ListComponent } from './ListComponent';
import { CountryInfo } from '../models/CountryInfo';
import GlobeComponent from './GlobeComponent';
import { Country } from '../models/Country';
import image from '../background.jpg';
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

export class MainComponent<MainComponentProps, MainComponentState> extends React.Component {
	state = {
		coronaInfoInCountries: [],
		selectedCountry: { name: '', code: '' },
		dataForDisplay: {
			country: '',
			cases: { new: '0', active: 0, critical: 0, recovered: 0, total: 0 },
			deaths: { new: '0', total: 0 }
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
		this.gioRef.current.changeName(country);
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

	showInfoAboutApp(country: Country) {
		if (this.state.dataForDisplay.country === 'All') {
			return (
				<div>
					<h1>THE WORLD</h1>
					<div>
						Select country on the globe, or from the list on left side to display COVID-19 related
						information.
					</div>
				</div>
			);
		} else {
			return <h1>{this.state.dataForDisplay.country}</h1>;
		}
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row my-row'>
					<img className='background-image' src={image} alt='' />
					<div className='overlay' />
					<div className='col-sm-2 pr-0'>
						<div className='row big-card pl-4 pt-4'>
							<div className='card mb-3 transparent w-100'>
								<div className='card-header cvd-card-header'>
									<h5 className='pt-2'>LIST OF COUNTRIES</h5>
								</div>
								<div className='card-body cvd-card-body'>
									<ListComponent selectCountry={this.selectCountryfromList.bind(this)} />
								</div>
							</div>
						</div>
					</div>
					<div className='col-sm-8 pl-0'>
						<div className='row top-info-data'>
							<div className='col-12 info-data-2 text-center'>
								{this.showInfoAboutApp(this.state.selectedCountry)}
							</div>
						</div>
						<GlobeComponent
							ref={this.gioRef}
							bindCountryFromMap={this.bindCountryFromMap.bind(this)}
							test={this.state.selectedCountry}
						/>
						<div className='row bottom-info-data'>
							<div className='col-3'>
								<CardComponent countries={this.state.coronaInfoInCountries} title={'TOTAL'} />
							</div>
							<div className='col-3'>
								<CardComponent countries={this.state.coronaInfoInCountries} title={'ACTIVE'} />
							</div>
							<div className='col-3'>
								<CardComponent countries={this.state.coronaInfoInCountries} title={'RECOVERED'} />
							</div>
							<div className='col-3'>
								<CardComponent countries={this.state.coronaInfoInCountries} title={'TOTAL DEATHS'} />
							</div>
						</div>
					</div>
					<div className='col-sm-2 mt-4 pr-5'>
						<div className='row justify-content-center h-100'>
							<div className='col-12'>
								<div className='h-100 d-flex flex-column'>
									<div className='row justify-content-center pb-4'>
										<div className='card transparent w-100'>
											<a
												className='link-lapa'
												href='https://www.linkedin.com/in/adnan-lapendic-413805136/'
												target='_blank'>
												<div className='card-body'>
													<div className='row'>
														<div className='col-12'>Created by</div>
														<div className='col-12'>Adnan Lapendic</div>
													</div>
												</div>
											</a>
										</div>
									</div>
									<div className='row flex-grow-1 pb-4'>
										<div className='card transparent w-100'>
											<div className='card-body flex-grow-1'>
												<div className='col-12'>
													<div className='big-card-data-title'>INFECTED</div>
													<div className='big-card-data-text'>
														{' '}
														{this.state.dataForDisplay.cases.total}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>NEW CASES</div>
													<div className='big-card-data-text'>
														{' '}
														{parseInt(this.state.dataForDisplay.cases.new)}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>ACTIVE</div>
													<div className='big-card-data-text'>
														{' '}
														{this.state.dataForDisplay.cases.active}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>CRITICAL</div>
													<div className='big-card-data-text'>
														{' '}
														{this.state.dataForDisplay.cases.critical}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>RECOVERED</div>
													<div className='big-card-data-text'>
														{' '}
														{this.state.dataForDisplay.cases.recovered}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>NEW DEATHS</div>
													<div className='big-card-data-text'>
														{' '}
														{parseInt(this.state.dataForDisplay.deaths.new)}
													</div>
												</div>
												<div className='col-12'>
													<div className='big-card-data-title'>TOTAL DEATHS</div>
													<div className='big-card-data-text'>
														{' '}
														{this.state.dataForDisplay.deaths.total}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='row justify-content-center'>
										<div className='col-12 right-bottom-card'>
											<CardComponent
												countries={this.state.coronaInfoInCountries}
												title={'DIED IN LAST 24h'}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
