import * as React from 'react';
import { CountryInfo } from '../models/CountryInfo';

export interface CardComponentProps {
	countries: CountryInfo[];
	title: string;
}

export interface CardComponentState {}

class CardComponent extends React.Component<CardComponentProps, CardComponentState> {
	getCountriesWithMostCases(sortBy: string) {
		let countries: CountryInfo[] = this.props.countries;
		countries = countries.sort((a, b) => {
			const comparable = this.getComparable(a, b, sortBy);
			return comparable;
		});

		countries.reverse();
		return countries;
	}

	getComparable(a: CountryInfo, b: CountryInfo, sortBy: string) {
		switch (sortBy) {
			case 'TOTAL':
				return a.cases.total - b.cases.total;
			case 'ACTIVE':
				return a.cases.active - b.cases.active;
			case 'RECOVERED':
				return a.cases.recovered - b.cases.recovered;
			case 'TOTAL DEATHS':
				return a.deaths.total - b.deaths.total;
			case 'DIED IN LAST 24h':
				if (a.deaths.new === null) {
					a.deaths.new = '0';
				}
				if (b.deaths.new === null) {
					b.deaths.new = '0';
				}
				return parseInt(a.deaths.new) - parseInt(b.deaths.new);
		}
		return 0;
	}

	renderSingleRowInInfoTable(country: string, value: any, index: number) {
		if (typeof value === 'string') {
			value = parseInt(value);
		}

		return (
			<div className='row text-left' key={index}>
				<div className='col-8'>{country}</div>
				<div className='col-4 pl-0 red'>{value}</div>
			</div>
		);
	}

	renderMostCasesResults(sortData: string) {
		const countries: CountryInfo[] = this.getCountriesWithMostCases(sortData);

		return countries.map((country, index) => {
			let data;
			switch (sortData) {
				case 'TOTAL':
					data = country.cases.total;
					break;
				case 'ACTIVE':
					data = country.cases.active;
					break;
				case 'RECOVERED':
					data = country.cases.recovered;
					break;
				case 'TOTAL DEATHS':
					data = country.deaths.total;
					break;
				case 'DIED IN LAST 24h':
					data = country.deaths.new;
					break;
			}

			if (country.country !== 'All') {
				return this.renderSingleRowInInfoTable(country.country, data, index);
			}
			return null;
		});
	}

	render() {
		return (
			<div className='card mb-3 transparent bottom-card'>
				<div className='card-header cvd-card-header'>{this.props.title}</div>
				<div className='card-body cvd-card-body bottom-card-list-data'>
					{this.renderMostCasesResults(this.props.title)}
				</div>
			</div>
		);
	}
}

export default CardComponent;
