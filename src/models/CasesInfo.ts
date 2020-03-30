export class CasesInfo {
    readonly new: string;
    readonly active: number;
    readonly critical: number;
    readonly recovered: number;
    readonly total: number;

    constructor(newCases: any, active:any, critical:any, recovered:any, total:any) {
        this.new = newCases;
        this.active = active;
        this.critical = critical;
        this.recovered = recovered;
        this.total = total;
    }
}
