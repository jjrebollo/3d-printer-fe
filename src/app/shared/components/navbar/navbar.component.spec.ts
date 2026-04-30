import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';

import { NavbarComponent } from './navbar.component';

@Component({ selector: 'app-stub', template: '', standalone: true })
class StubRouteComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([{ path: '**', component: StubRouteComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise with menuOpen=false', () => {
    expect(component.menuOpen).toBeFalse();
  });

  describe('toggleMenu()', () => {
    it('should open the menu when it is closed', () => {
      component.toggleMenu();
      expect(component.menuOpen).toBeTrue();
    });

    it('should close the menu when it is open', () => {
      component.menuOpen = true;
      component.toggleMenu();
      expect(component.menuOpen).toBeFalse();
    });

    it('should toggle back and forth correctly', () => {
      component.toggleMenu();
      component.toggleMenu();
      expect(component.menuOpen).toBeFalse();
    });
  });

  describe('auto-close on navigation', () => {
    it('should set menuOpen=false after a NavigationEnd event', fakeAsync(() => {
      component.menuOpen = true;
      const router = TestBed.inject(Router);

      router.navigate(['/']);
      tick();

      expect(component.menuOpen).toBeFalse();
    }));

    it('should leave menuOpen=false unchanged when it is already false', fakeAsync(() => {
      const router = TestBed.inject(Router);

      router.navigate(['/']);
      tick();

      expect(component.menuOpen).toBeFalse();
    }));
  });
});
