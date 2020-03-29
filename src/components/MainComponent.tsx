import React from 'react'
import { DataService } from '../services/DataService';
import GioComponent from './GioComponent';
import { ListComponent } from './ListComponent';
import { CountryInfo } from '../models/CountryInfo';
import GlobeComponent from './GlobeComponent';
import { Country } from '../models/Country';

export interface MainComponentProps {
    selectCountry: any,
}
 
export interface MainComponentState {
    coronaInfoInCountries: CountryInfo[],
    selectedCountry: Country
}
 

export class MainComponent<MainComponentProps, MainComponentState> extends React.Component {

    state = {
        coronaInfoInCountries : [],
        selectedCountry: {name: '', code: ''}
    }

    gioRef = React.createRef<any>();

    async componentDidMount() {
        const data =await this.getAllDataInfo();
        this.setState({coronaInfoInCountries: data})
    }

    async getAllDataInfo() {
        const dataService: DataService = new DataService();
        const data: CountryInfo[] = await dataService.getAllData();
        return data;
    }

    selectCountryfromList(country:Country) {
        this.setState({selectedCountry: country});
        this.gioRef.current?.changeName(country);
        console.log(this.state.selectedCountry);
    }


    render() {
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <ListComponent selectCountry={this.selectCountryfromList.bind(this)} />
                    </div>
                    <div className="col-sm-9">
                        <GlobeComponent ref={this.gioRef} test={this.state.selectedCountry}/>
                    </div>
                </div>
            </div>
        );
    }
}