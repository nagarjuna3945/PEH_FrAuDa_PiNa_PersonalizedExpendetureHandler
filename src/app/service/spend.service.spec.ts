import { TestBed, inject } from '@angular/core/testing';

import { SpendService } from './spend.service';

describe('SpendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpendService]
    });
  });

  it('should be created', inject([SpendService], (service: SpendService) => {
    expect(service).toBeTruthy();
  }));
});
