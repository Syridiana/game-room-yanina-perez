import { TestBed } from '@angular/core/testing';

import { ImagenesAPIService } from './imagenes-api.service';

describe('ImagenesAPIService', () => {
  let service: ImagenesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
