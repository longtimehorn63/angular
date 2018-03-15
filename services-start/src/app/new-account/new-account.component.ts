import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from 'app/logging.service';
import { AccountsService } from 'app/account.service';


/*
    'The providers' tag below tells angular how to provide the service.
    the array is the 'type' of service
*/
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // removed for service
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  /*
    creating a dependency injection of the logging service.  By also
    add "private", it creates a local instance of this variable in the
    class.
  */
  constructor(private loggingService:LoggingService,
              private accountsService:AccountsService){
    // subscribing to an event or creating an event listner
    this.accountsService.statusUpdated.subscribe(
      (status : string) => alert('New Status: ' + status)
    );
              }

  onCreateAccount(accountName: string, accountStatus: string) {
    // removed for service
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.accountsService.addAccount(accountName, accountStatus);
  
  //  console.log('A server status changed, new status: ' + accountStatus);

    // implementing our service
    // this.loggingService.logStatusChange(accountStatus);

  }
}
