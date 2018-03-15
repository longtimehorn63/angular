import { LoggingService } from "app/logging.service";
import { Injectable, EventEmitter } from "@angular/core";

/*
  @Injectable allows for the insertion of meta data for a service within
  a service.  Angular requires the meta data to hook everything together.
  However a @Component or @Directive would be inappropriate.  Injecting
  INTO this service.
*/
@Injectable()
export class AccountsService {

    constructor(private loggingService:LoggingService){}
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];
      // new status updated status event
      statusUpdated = new EventEmitter<string>();

      addAccount(name : string, status : string){
          // using the {} creates a new object made up of these items
          this.accounts.push({name : name, status : status});
          this.loggingService.logStatusChange(status);
      }

      updateStatus(id : number, status : string){
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
      }
}