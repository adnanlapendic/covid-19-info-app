import { constants } from "buffer";
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from "../Constants";

const axios = require("axios");

const headers = {
    "content-type":"application/octet-stream",
    "x-rapidapi-host": RAPIDAPI_HOST,
    "x-rapidapi-key":RAPIDAPI_KEY
}

export class DataService {


    getAllData() {        
        return axios({
            "method":"GET",
            "url":"https://covid-193.p.rapidapi.com/statistics",
            "headers": headers
            }).then((response: any)=>{
            console.log(response)
            }).catch((error: any)=>{
            console.log(error)
            })
        }
}