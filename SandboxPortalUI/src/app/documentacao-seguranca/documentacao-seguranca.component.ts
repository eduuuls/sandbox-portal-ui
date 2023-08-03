import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-documentacao-seguranca',
  templateUrl: './documentacao-seguranca.component.html',
  styleUrls: ['./documentacao-seguranca.component.css']
})
export class DocumentacaoSegurancaComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService, 
                private msalBroadcastService: MsalBroadcastService) { 
    
  }
  

  ngOnInit(): void {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) =>  status === InteractionStatus.None || status === InteractionStatus.HandleRedirect),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });

  }

  checkAndSetActiveAccount() {

    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
