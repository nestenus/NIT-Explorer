import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { TxComponent } from './tx/tx.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	// { path: 'login', component: LoginComponent },
	// { path: 'dashboard', component: DashboardComponent },
	{ path: 'block/:id', component: BlockComponent },
	{ path: 'tx/:id', component: TxComponent },
	{ path: 'address/:id', component: AddressComponent },
	// {path: '404', component: HomeComponent},
	{path: '**', redirectTo: '/home'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
