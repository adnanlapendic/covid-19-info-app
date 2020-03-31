export class DeathsInfo {
    new: string;
    total: number;

    constructor(newDeaths: string, total: number) {
        this.new = newDeaths;
        this.total = total;
    }
}