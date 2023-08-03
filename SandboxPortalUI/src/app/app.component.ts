import { BreakpointObserver } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NavigationEnd, Router } from '@angular/router';
import { SwaggerParameter } from '../shared/swagger-parameter.model'
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface MenuNode {
  name: string;
  routeLink? : string;
  swaggerParameter? : SwaggerParameter;
  children?: MenuNode[];
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Introdução',
    routeLink: 'home'
  },
  {
    name: 'Acessos',
    children: [
      {
        name: 'Endpoints - API Gateway',
        routeLink: 'endpoints'
      }, 
      {
        name: 'Autenticação/Autorização - API Gateway',
        routeLink: 'autenticacao'
      }, 
      {
        name: 'Segurança dos Dados',
        routeLink: 'seguranca'
      }
    ],
  },
  {
    name: 'Menu1',
    children: [
      {
        name: 'Menu1SubMenu1',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu1SubMenu1',
          jsonFileName : 'submenu1.swagger.json',
        }
      },
      {
        name: 'Menu1SubMenu2',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu1SubMenu2',
          jsonFileName : 'submenu2.swagger.json',
        }
      },
      {
        name: 'Menu1SubMenu3',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu1SubMenu3',
          jsonFileName : 'submenu3.swagger.json',
        }
      },
    ],
  },
  {
    name: 'Menu2',
    children: [
      {
        name: 'Menu2SubMenu1',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu2SubMenu1',
          jsonFileName : 'menu2submenu1.swagger.json',
        }
      },
      {
        name: 'Menu2Submenu2',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu2Submenu2',
          jsonFileName : 'menu2submenu2.swagger.json',
        }
      },
      {
        name: 'Menu2Submenu3',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu2Submenu3',
          jsonFileName : 'menu2submenu3.swagger.json',
        }
      },
      {
        name: 'Menu2Submenu4',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu2Submenu4',
          jsonFileName : 'menu2submenu4.swagger.json',
        }
      },
    ],
  },
  {
    name: 'Menu3',
    children: [
      {
        name: 'Menu3SubMenu1',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu3SubMenu1',
          jsonFileName : 'menu3submenu1.swagger.json',
        }
      },
      {
        name: 'Menu3SubMenu2',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu3SubMenu2',
          jsonFileName : 'menu3submenu2.swagger.json',
        }
      },
      {
        name: 'Menu3SubMenu3',
        swaggerParameter : {
          deepLinking : true,
          tagName: 'Menu3SubMenu3',
          jsonFileName : 'menu3submenu3.swagger.json',
        }
      },
    ],
  }
];

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuTreeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  loginDisplay = false;
  apiDocumentation: any;

  constructor(private authService: MsalService, 
                  private msalBroadcastService: MsalBroadcastService,
                    private observer: BreakpointObserver,
                      private router: Router) { 
    
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;
  
  ngOnInit() {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) =>  status === InteractionStatus.None || status === InteractionStatus.HandleRedirect),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        
        if(this.sidenav)
        {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {

        if(this.sidenav)
        {
          if (this.sidenav.mode === 'over') {
            this.sidenav.close();
          }
        }
      });
  }

  logout() { 
    this.authService.logoutRedirect({
      postLogoutRedirectUri: '/login'
    });
  }

  goToDocumentation(node: MenuNode){
   
    if(node.swaggerParameter)
    {
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigateByUrl('/swagger', {state: node.swaggerParameter}));
    }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;

    console.log(`this.loginDisplay: ${this.loginDisplay}`);
  }

  onExpand(node){
    this.menuTreeControl.collapseAll();
    this.menuTreeControl.expand(node);
  }
}
