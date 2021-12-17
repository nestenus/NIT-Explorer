import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DecimalPipe } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { TxComponent } from './tx/tx.component';
import { AddressComponent } from './address/address.component';

import { HelperService } from './service/helper/helper.service';
import { AuthService } from './service/auth/auth.service';
import { ApiService } from './service/api/api.service'
import { NitPipe } from './nit.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ClipboardModule } from 'ngx-clipboard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // DashboardComponent,
    // LoginComponent,
    HomeComponent,
    TxComponent,
    BlockComponent,
    AddressComponent,
    NitPipe,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgxQRCodeModule,
    MatDialogModule,
    ClipboardModule,
    AngularFontAwesomeModule,
    HttpModule
  ],
  providers: [
    HelperService,
    AuthService,
    ApiService,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
