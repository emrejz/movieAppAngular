/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DirectorService } from './director.service';

describe('Service: Director', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectorService]
    });
  });

  it('should ...', inject([DirectorService], (service: DirectorService) => {
    expect(service).toBeTruthy();
  }));
});
