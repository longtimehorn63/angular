import { Subject } from "rxjs/Subject";

export class UsersService{

    /*
      Subject is an obervable and observer at the same time
    */
    userActivate = new Subject();
}