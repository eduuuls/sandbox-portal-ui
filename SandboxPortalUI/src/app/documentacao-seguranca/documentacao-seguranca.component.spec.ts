import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoSegurancaComponent } from './documentacao-seguranca.component';

describe('DocumentacaoSegurancaComponent', () => {
  let component: DocumentacaoSegurancaComponent;
  let fixture: ComponentFixture<DocumentacaoSegurancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacaoSegurancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacaoSegurancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
