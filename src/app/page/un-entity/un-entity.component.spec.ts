import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnEntityComponent } from './un-entity.component';

describe('UnEntityComponent', () => {
  let component: UnEntityComponent;
  let fixture: ComponentFixture<UnEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnEntityComponent]
    });
    fixture = TestBed.createComponent(UnEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
