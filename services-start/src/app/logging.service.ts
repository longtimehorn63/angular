
/*
   Just a plain typescript file will be used as a service.
   There is no @Service tag for example.
*/

export class LoggingService {


    logStatusChange(status: string){
        console.log('A Service status changed, new status: ' + status);
    }
}