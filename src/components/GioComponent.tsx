import React, {Component} from 'react';
import axios from 'axios';
import { DataService } from '../services/DataService';
// import Gio from '../../src/Gio.js';
const GIO = require('giojs');

class GioComponent extends Component {

    componentDidMount() {
        const dataService: DataService = new DataService();
        const result = dataService.getAllData();
        
        const container = document.getElementById( "globalArea" );
        const controller = new GIO.Controller( container );
        // controller.addData( data );
        controller.setSurfaceColor( 0x00FF00 );
    
        controller.init();
    
        // use the onCountryPicked() to set callback when clicked country changed
    controller.onCountryPicked( callback );
    
    // defined a callback function, as a demo, this function simply output selectedCountry, relatedCountries which are passed parameters into console
    function callback ( selectedCountry:any, relatedCountries:any ) {
    
            console.log(selectedCountry);
            console.log(relatedCountries);
    
    }
      }
      
      
      render(){
      return (
          <div id="globalArea" style={{width: 1000, height: 1000}}></div>
      );
    }
}

export default GioComponent;