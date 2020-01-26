import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportMessagesPage } from './report-messages.page';

describe('ReportMessagesPage', () => {
  let component: ReportMessagesPage;
  let fixture: ComponentFixture<ReportMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
