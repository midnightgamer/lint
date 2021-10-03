import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.init';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './request.interceptor';

import { HeaderComponent } from './global/header/header.component';
import { FooterComponent } from './global/footer/footer.component';
import { LoaderComponent } from './global/loader/loader.component';
import { ToasterComponent } from './global/toaster/toaster.component';
import { MenuComponent } from './global/menu/menu.component';
import { SearchPopupComponent } from './search-popup/search-popup.component'
import { FormsModule } from '@angular/forms';
import { LoginPopupComponent } from './global/login-popup/login-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ToasterComponent,
    MenuComponent,
    SearchPopupComponent,
    LoginPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
