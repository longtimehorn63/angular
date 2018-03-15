
// fake authentication service
export class AuthService {
    loggedIn: boolean = false;

    // simulate taking time as if calling out to a server
    isAuthenticated(){
       const promise = new Promise(
           (resolve, reject) => {
               setTimeout(
                   () =>{resolve( this.loggedIn)},
                   800)
           }
       );
       return promise;
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}