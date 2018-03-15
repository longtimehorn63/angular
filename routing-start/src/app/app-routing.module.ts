import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeacitvateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    { path: '', component:HomeComponent },  // localhost:4200/
    { path: 'users', component:UsersComponent, children:[  // localhost:4200/users
      { path: 'id/:name', component:UserComponent }// localhost:4200/users/{id}
  
    ] },
    { path: 'servers', 
        // canActivate:[AuthGuard], 
        canActivateChild[AuthGuard],
        component:ServersComponent, children[   //localhost:4200/servers
      { path: ':id', component:ServerComponent, resolve: {server:ServerResolver} }, //localhost:4200/servers/{id}
      { path: ':id/edit', component:EditServerComponent, canDeactivate:[CanDeacitvateGuard] } //localhost:4200/servers/{id}/edit
    ] },
//    { path: 'not-found', component:PageNotFoundComponent }, 
    { path: 'not-found', component:ErrorPageComponent , data:{message: 'Page not found!'}}, 
    { path: '**', redirectTo: '/not-found' },  // wild card - all paths that aren't defined
  ];
/*
  the useHash parameter below is used to add a '#' before all the angular 
  routes.  This should only be used if the application server cannot route
  to index.html in stead of a 404 error
*/
@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
      // RouterModule.forRoot(appRoutes), {useHash:true}
    ],
    exports : [
        RouterModule
    ]

})
export class AppRoutingModule {

}