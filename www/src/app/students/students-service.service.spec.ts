import { TestBed } from '@angular/core/testing';

import { StudentsServiceService } from './students.service';

describe('StudentsServiceService', () => {
  let service: StudentsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
