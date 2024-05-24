/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsercreateComponent } from './usercreate.component';

describe('UsercreateComponent', () => {
  let component: UsercreateComponent;
  let fixture: ComponentFixture<UsercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
