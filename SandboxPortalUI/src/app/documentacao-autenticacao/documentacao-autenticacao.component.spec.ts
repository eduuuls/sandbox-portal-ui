import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoAutenticacaoComponent } from './documentacao-autenticacao.component';

describe('DocumentacaoAutenticacaoComponent', () => {
  let component: DocumentacaoAutenticacaoComponent;
  let fixture: ComponentFixture<DocumentacaoAutenticacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacaoAutenticacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacaoAutenticacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
