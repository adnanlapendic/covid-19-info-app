import React, { Component } from 'react'
import { DataService } from '../services/DataService';
import SingleListComponent from './SingleListComponent';

const dataService: DataService = new DataService();

export interface ListComponentProps {
    selectCountry: any,
}
 
export interface ListComponentState {
    
}
 

export class ListComponent extends React.Component<ListComponentProps, ListComponentState> {

    state = {
        countries: []
    }

    constructor(props: any){
        super(props);
        // dataService.getAllData();
    }

    componentDidMount(){
        this.getCountries();
    }

    getCountries() {
        const countries =  dataService.getCountries();
        this.setState({countries: countries})
    }
    
    render() {
        const countries = this.state.countries;
        const selectCountry = this.props.selectCountry;
        
        return (
        <div className="list-of-countries">
            {countries.map((country, index) => {
                return (
                <div className="row" key={index}>
                    <SingleListComponent country={country} selectCountry={selectCountry}/>
                </div>
                );
            })}
        </div>
        );
    };
}