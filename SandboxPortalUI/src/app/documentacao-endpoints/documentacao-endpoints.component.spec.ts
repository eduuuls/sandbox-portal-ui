import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoEndpointsComponent } from './documentacao-endpoints.component';

describe('DocumentacaoEndpointsComponent', () => {
  let component: DocumentacaoEndpointsComponent;
  let fixture: ComponentFixture<DocumentacaoEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacaoEndpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacaoEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
