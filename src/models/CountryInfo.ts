import { CasesInfo } from "./CasesInfo";
import { DeathsInfo } from "./DeathsInfo";

export class CountryInfo {
    
    country: string | undefined;
    cases: CasesInfo | undefined;
    deaths: DeathsInfo | undefined;
    day: string | undefined;
    time: string | undefined;

}