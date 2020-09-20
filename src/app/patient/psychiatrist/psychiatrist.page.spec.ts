import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsychiatristPage } from './psychiatrist.page';

describe('PsychiatristPage', () => {
  let component: PsychiatristPage;
  let fixture: ComponentFixture<PsychiatristPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychiatristPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsychiatristPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
