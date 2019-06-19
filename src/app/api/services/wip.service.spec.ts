import { TestBed } from '@angular/core/testing';

import { WipService } from './wip.service';

describe('WipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WipService = TestBed.get(WipService);
    expect(service).toBeTruthy();
  });
});
