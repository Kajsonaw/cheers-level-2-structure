import { TestBed } from '@angular/core/testing';

import { CocktailsServiceService } from './cocktails-service.service';

describe('CocktailsServiceService', () => {
  let service: CocktailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
