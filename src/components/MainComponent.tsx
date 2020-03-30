import React from 'react'
import { DataService } from '../services/DataService';
import { ListComponent } from './ListComponent';
import { CountryInfo } from '../models/CountryInfo';
import GlobeComponent from './GlobeComponent';
import { Country } from '../models/Country';
import Menu from './Menu';

export interface MainComponentProps {
    selectCountry: any,
}
 
export interface MainComponentState {
    coronaInfoInCountries: CountryInfo[],
    selectedCountry: Country,
    newCases: string;
    activeCases: number;
    criticalCases: number;
    recoveredCases: number;
    totalCases: number;
    newDeaths: string;
    totalDeaths: number;
    dataForDisplay: CountryInfo

} 

export class MainComponent<MainComponentProps, MainComponentState> extends React.Component {

    state = {
        coronaInfoInCountries : [],
        selectedCountry: {name: '', code: ''},
        dataForDisplay: {country: '', cases:{new: '', active: 0, critical: 0, recovered: 0, total: 0}, deaths: {new: '', total: 0}}
    }

    gioRef = React.createRef<any>();

    async componentDidMount() {
        const data =await this.getAllDataInfo();
        const allData = this.getDataForTheWholeWorld(data);
        console.log(allData);
        
        this.setState({
            coronaInfoInCountries: data,
            dataForDisplay: allData
        })
    }

    getDataForCountry(country: Country){
        const data: CountryInfo[] = this.state.coronaInfoInCountries;
        for(let i = 0; i < data.length; i++) {
            if(data[i].country === country.name) {
               this.setState({dataForDisplay: data[i]});
               return;
            }
        } 
        
        this.setState({dataForDisplay : {country: country.name, 
            cases:{new:0, active: 0, critical: 0, recovered: 0, total: 0}, 
            deaths: {new: 0, total: 0}}})
    }

    getDataForTheWholeWorld(data: CountryInfo[]){
       for(let i = 0; i < data.length; i++) {
           if(data[i].country === 'All') {
               return data[i];
           }
       }  
       return null;      
    }

    async getAllDataInfo() {
        const dataService: DataService = new DataService();
        const data: CountryInfo[] = await dataService.getAllData();
        console.log(data.sort((a,b) => {
            return a.country.localeCompare(b.country)
        }));
        
        return data;
    }

    selectCountryfromList(country:Country) {
        this.setState({selectedCountry: country});
        this.gioRef.current?.changeName(country);
        this.getDataForCountry(country);
        console.log(this.state.selectedCountry);
    }

    bindCountryFromMap(countryCode: string) {
        const dataService: DataService = new DataService();
        const countries: Country[] = dataService.getCountries();
        let country: Country = new Country();
            for(let i = 0; i < countries.length; i++) {
                if(countries[i].code === countryCode) {
                    country = countries[i];
                }
            }
            this.getDataForCountry(country);
    }

    getCountriesWithMostCases(){
        let countries: CountryInfo[] = this.state.coronaInfoInCountries;
        countries =  countries.sort((a, b) => {
           return a.cases.total - b.cases.total
        });        
        countries.reverse();
        return countries.slice(1,6)
    }


    renderTopFiveResults(){
        const countries: CountryInfo[]  = this.getCountriesWithMostCases();
        return(
                countries.map(country => {
                    return (
                        <div className="row text-left">
                            <div className="col-5">{country.country}</div>
                            <div className="col-5 pl-0 red">{country.cases.total}</div>
                        </div>
                    );
                })
        )
    }


    render() {
       
        return (
            <div className="">
                {/* <Menu /> */}
                <div className="row">
                    <div className="col-sm-2 pr-0">
                        <ListComponent selectCountry={this.selectCountryfromList.bind(this)} />
                    </div>
                    <div className="col-sm-10 pl-0">
                        <div className="row top-info-data">
                            <div className="col-3 info-data-1 text-center">
                                PEOPLE INFECTED 
                                <h2 className="red">{this.state.dataForDisplay.cases.total}</h2>
                                <div className="row text-left">
                                        <div className="col-9">NEW CASES:</div>
                                        <div className="col-3 pl-0 red">{this.state.dataForDisplay.cases.new }</div>
                                    </div>
                                    <div className="row text-left">
                                        <div className="col-9">ACTIVE CASES:</div>
                                        <div className="col-3 pl-0 red">{this.state.dataForDisplay.cases.active}</div>
                                    </div>
                                    <div className="row text-left">
                                        <div className="col-9">CRITICAL CASES:</div>
                                        <div className="col-3 pl-0 red">{this.state.dataForDisplay.cases.critical}</div>
                                    </div>
                                    <div className="row text-left">
                                        <div className="col-9">RECOVERED:</div>
                                        <div className="col-3 pl-0 green">{this.state.dataForDisplay.cases.recovered}</div>
                                    </div>
                                    <div className="row text-left">
                                    <div className="col-9"> TODAY DIED:</div>
                                    <div className="col-3 pl-0 red">{this.state.dataForDisplay.deaths.new}</div>
                                </div>
                                <div className="row text-left">
                                <div className="col-9"> TOTAL DEATHS:</div>
                                    <div className="col-3 pl-0 red">{this.state.dataForDisplay.deaths.total}</div>
                                </div>
                            </div>
                        <div className="col-6 info-data-2 text-center">
                            <h2>{this.state.dataForDisplay.country === 'All' ? 'THE WORLD' : this.state.dataForDisplay.country}</h2>
                        </div>
                        </div>
                        <GlobeComponent ref={this.gioRef} bindCountryFromMap={this.bindCountryFromMap.bind(this)} test={this.state.selectedCountry}/>
                            <div className="row bottom-info-data">
                            <div className="col-3">
                                <h4>TOP 5</h4>
                                {this.renderTopFiveResults()}
                            </div>
                            <div className="col-6">asdasd</div>
                            <div className="col-3">sdasddd</div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}