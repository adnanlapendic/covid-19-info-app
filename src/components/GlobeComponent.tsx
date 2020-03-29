import * as React from 'react';
import { Country } from '../models/Country';
const GIO = require('giojs');

export interface GlobeComponentProps {
    test: Country,
    ref: any
}
 
export interface GlobeComponentState {
    currentCountry: string | undefined
}
 
class GlobeComponent extends React.Component<GlobeComponentProps, GlobeComponentState> {
    state = { currentCountry: '' }
    controller:any = null;

    changeName = (country: Country) => {
        console.log(country);
        
        this.setState({
            currentCountry: country.code
        });
        const controller = this.getGioGlobeController();

       controller.switchCountry( country.code);

      };

    componentDidMount() {                                
        const controller = this.getGioGlobeController();
        controller.setSurfaceColor( 0x00FF00 );
    
        // use the onCountryPicked() to set callback when clicked country changed
        controller.onCountryPicked( callback );
        controller.switchCountry( 'CN');
        // defined a callback function, as a demo, this function simply output selectedCountry, relatedCountries which are passed parameters into console
        function callback ( selectedCountry:any, relatedCountries:any ) {
        
            console.log(selectedCountry);
            console.log(relatedCountries);
    
    }
      }

      getGioGlobeController() {
          if(this.controller == null){
            const container = document.getElementById( "globalArea" );
            const controller = new GIO.Controller( container );
            this.controller = controller;
            controller.init();
            return controller;
          } else {
              return this.controller;
          }
      }
      


    render() {             
        return ( 
            <div>
                <div id="globalArea" style={{width: 1000, height: 1000}}></div>

            </div>

         );
    }
}
 
export default GlobeComponent;