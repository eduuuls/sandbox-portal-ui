import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { SwaggerComponent } from './swagger/swagger.component';
import { HomeComponent } from './home/home.component';
import { DocumentacaoSegurancaComponent } from './documentacao-seguranca/documentacao-seguranca.component';
import { DocumentacaoEndpointsComponent } from './documentacao-endpoints/documentacao-endpoints.component';
import { DocumentacaoAutenticacaoComponent } from './documentacao-autenticacao/documentacao-autenticacao.component';
import { LoginComponent } from './login/login.component';
import { EventosTransacaoComponent } from './eventos-transacao/eventos-transacao.component';
import { EventosPendenciaFaturamentoComponent } from './eventos-pendencia-faturamento/eventos-pendencia-faturamento.component';
import { EventosPendenciaMensalidadeComponent } from './eventos-pendencia-mensalidade/eventos-pendencia-mensalidade.component';
import { EventosAjustesComponent } from './eventos-ajustes/eventos-ajustes.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home',
  runGuardsAndResolvers: 'always',
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [MsalGuard],
  runGuardsAndResolvers: 'always',
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'seguranca',
  component: DocumentacaoSegurancaComponent,
  canActivate: [MsalGuard],
},
{
  path: 'endpoints',
  component: DocumentacaoEndpointsComponent,
  canActivate: [MsalGuard],
},
{
  path: 'autenticacao',
  component: DocumentacaoAutenticacaoComponent,
  canActivate: [MsalGuard],
},
{
  path: 'eventos-transacao',
  component: EventosTransacaoComponent,
  canActivate: [MsalGuard],
},
{
  path: 'eventos-pendencia-faturamento',
  component: EventosPendenciaFaturamentoComponent,
  canActivate: [MsalGuard],
},
{
  path: 'eventos-pendencia-mensalidade',
  component: EventosPendenciaMensalidadeComponent,
  canActivate: [MsalGuard],
},
{
  path: 'eventos-ajustes',
  component: EventosAjustesComponent,
  canActivate: [MsalGuard],
},
{
  path: 'swagger',
  component: SwaggerComponent,
  canActivate: [MsalGuard],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
