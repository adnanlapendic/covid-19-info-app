import * as React from 'react';
import { Country } from '../models/Country';

export interface SingleListComponentProps {
    country: Country,
    selectCountry: any
}
 
export interface SingleListComponentState {
    
}
 
class SingleListComponent extends React.Component<SingleListComponentProps, SingleListComponentState> {
    // state = { :  }
    test() {
        console.log('asdad');
        
    }
    render() { 
        const country = this.props.country;
        const selectCountry = this.props.selectCountry;
        return ( 
            <button type="button" className="btn btn-secondary w-100" onClick={()=>selectCountry(country)}>{country.name}</button>
         );
    }
}
 
export default SingleListComponent;