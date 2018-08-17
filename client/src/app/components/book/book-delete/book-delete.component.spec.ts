import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeleteComponent } from './book-delete.component';

describe('BookDeleteComponent', () => {
  let component: BookDeleteComponent;
  let fixture: ComponentFixture<BookDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
