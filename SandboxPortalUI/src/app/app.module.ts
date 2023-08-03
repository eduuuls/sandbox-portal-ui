import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import MSAL and MSAL browser libraries. 
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

// Import the Azure AD B2C configuration 
import { msalConfig, protectedResources } from './auth-config';

// Import the Angular HTTP interceptor. 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

// Add the essential Angular materials.
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';

//App Components
import { SwaggerComponent } from './swagger/swagger.component';
import { HomeComponent } from './home/home.component';
import { DocumentacaoEndpointsComponent } from './documentacao-endpoints/documentacao-endpoints.component';
import { DocumentacaoAutenticacaoComponent } from './documentacao-autenticacao/documentacao-autenticacao.component';
import { DocumentacaoSegurancaComponent } from './documentacao-seguranca/documentacao-seguranca.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SwaggerComponent,
    DocumentacaoEndpointsComponent,
    DocumentacaoAutenticacaoComponent,
    DocumentacaoSegurancaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
    {
      // The routing guard configuration. 
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: protectedResources.backendPortalApi.scopes
      }
    },
    {
      // MSAL interceptor configuration.
      // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        [protectedResources.backendPortalApi.endpoint, protectedResources.backendPortalApi.scopes]
      ])
    })

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
