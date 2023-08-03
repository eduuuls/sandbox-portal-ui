import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import { backendPortalApiService } from '../../core/services/backend-portal-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwaggerParameter } from '../../shared/swagger-parameter.model';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})

export class SwaggerComponent implements AfterViewInit  {
  @ViewChild('swagger',{static: false}) custApiDocElement: ElementRef | undefined;
  parameter: SwaggerParameter;

  constructor(private service: backendPortalApiService,
              private route: ActivatedRoute,
              private router: Router) { 

      if(router.getCurrentNavigation())
        this.parameter = router.getCurrentNavigation().extras.state as SwaggerParameter
  }

  ngAfterViewInit () {

    if(this.parameter)
    {
      this.service.getDocumentation(this.parameter.jsonFileName)
        .subscribe((jsonDoc) => {

          jsonDoc["servers"] = [{
            "url": "<URL API GATEWAY QA>",
            "description": "API Gateway - QA"
          },
          {
            "url": "<URL API GATEWAY Homologação>",
            "description": "API Gateway - Homologação"
          }];

          jsonDoc['components']['securitySchemes'] = {
            "Bearer":{
              "type": "http",
              "scheme": "bearer"
            },
            "ApiKey":{
              "type": "apiKey",
              "name": "Api-Gateway-Subscription-Key",
              "in": "header"
              }
          };

          jsonDoc['security'] = [{
            "ApiKey":[],
            "Bearer":[]
          }];
          
          const ui = SwaggerUI({
            spec: jsonDoc,
            deepLinking: true,
            filter: this.parameter.tagName,
            domNode: this.custApiDocElement?.nativeElement,
            presets: [
              SwaggerUI.presets.apis
            ],
          })
        });
    }
  }
}
