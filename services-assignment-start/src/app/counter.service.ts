export class CounterService{

    onLogUsercount(activeCount:number, inactiveCount : number){
        console.log('Active users : ' + activeCount + ' Inactive Users: ' + inactiveCount)
    }
}