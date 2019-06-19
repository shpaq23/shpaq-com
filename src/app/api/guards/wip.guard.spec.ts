import { TestBed, inject } from '@angular/core/testing';

import { WipGuard } from './wip.guard';

describe('WipGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WipGuard]
    });
  });

  it('should ...', inject([WipGuard], (guard: WipGuard) => {
    expect(guard).toBeTruthy();
  }));
});
