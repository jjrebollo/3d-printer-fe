import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RandomWordComponent } from './random-word.component';
import { environment } from '../../environments/environment';

const ENDPOINT = `${environment.apiBaseUrl}/api/random-word`;

describe('RandomWordComponent', () => {
  let component: RandomWordComponent;
  let fixture: ComponentFixture<RandomWordComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomWordComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomWordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise with word=null and loading=false', () => {
    expect(component.word).toBeNull();
    expect(component.loading).toBeFalse();
  });

  describe('fetchRandomWord()', () => {
    it('should set loading=true while the request is in flight', () => {
      component.fetchRandomWord();
      expect(component.loading).toBeTrue();
      httpMock.expectOne(ENDPOINT).flush({ word: 'printer' });
    });

    it('should send a GET request to the random-word endpoint', () => {
      component.fetchRandomWord();
      const req = httpMock.expectOne(ENDPOINT);
      expect(req.request.method).toBe('GET');
      req.flush({ word: 'filament' });
    });

    it('should set word and loading=false on success', () => {
      component.fetchRandomWord();
      httpMock.expectOne(ENDPOINT).flush({ word: 'nozzle' });

      expect(component.word).toBe('nozzle');
      expect(component.loading).toBeFalse();
    });

    it('should set word="Error fetching word" and loading=false on HTTP error', () => {
      component.fetchRandomWord();
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));

      expect(component.word).toBe('Error fetching word');
      expect(component.loading).toBeFalse();
    });

    it('should overwrite a previous word on a second successful fetch', () => {
      component.fetchRandomWord();
      httpMock.expectOne(ENDPOINT).flush({ word: 'first' });
      expect(component.word).toBe('first');

      component.fetchRandomWord();
      httpMock.expectOne(ENDPOINT).flush({ word: 'second' });
      expect(component.word).toBe('second');
    });
  });
});
