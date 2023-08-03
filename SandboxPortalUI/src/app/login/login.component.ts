import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(@Inject(MSAL_GUARD_CONFIG) 
              private msalGuardConfig: MsalGuardConfiguration, 
                private authService: MsalService,
                  private router: Router) { 

  }

  login() {

    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.router.navigate(['/home']);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
            this.router.navigate(['/home']);
      });
    }
  }
}
