import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguineoConversationComponent } from './linguineo-conversation.component';

describe('LinguineoConversationComponent', () => {
  let component: LinguineoConversationComponent;
  let fixture: ComponentFixture<LinguineoConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinguineoConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinguineoConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
