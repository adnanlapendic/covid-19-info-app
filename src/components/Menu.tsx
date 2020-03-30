import * as React from 'react';
// import { Component } from '../';
import logo from '../1294143.svg';

export interface MenuProps {
    
}
 
export interface MenuState {
    
}
 
class Menu extends React.Component<MenuProps, MenuState> {
   
    render() { 
        return ( 
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                    Covid-19 Info Application
                </a>
            </nav>
         );
    }
}
 
export default Menu;