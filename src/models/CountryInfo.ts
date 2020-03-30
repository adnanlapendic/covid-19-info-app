import { CasesInfo } from "./CasesInfo";
import { DeathsInfo } from "./DeathsInfo";

export class CountryInfo {
    
    country: string;
    cases: CasesInfo;
    deaths: DeathsInfo;
    day: string;
    time: string;

    constructor(country: string, cases: CasesInfo, deaths:DeathsInfo, day: string, time: string) {
        this.country = country;
        this.cases = cases;
        this.deaths = deaths;
        this.day = day;
        this.time = time;
    }

}