import { TestBed } from '@angular/core/testing';

import { FBCloudFirestore } from './cloud-firestore.service';

describe('FBCloudFirestore', () => {
  let service: FBCloudFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FBCloudFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
