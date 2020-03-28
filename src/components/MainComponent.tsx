import React, { Component } from 'react'
import { DataService } from '../services/DataService';
import GioComponent from './GioComponent';
var Gio = require('giojs');

export class MainComponent extends Component {

    constructor(props: any){
        super(props);
        const dataService: DataService = new DataService();
        dataService.getAllData();
    }
    

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                    One of three columns
                    </div>
                    <div className="col-sm">
                    One of three columns
                    </div>
                    <div className="col-sm">
                    One of three columns
                    </div>
                </div>
                <GioComponent />
            </div>
        );
    }
}