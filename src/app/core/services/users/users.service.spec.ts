import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../../../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [
      { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user' },
      { id: 2, username: 'jane_doe', email: 'jane@example.com', role: 'admin' },
    ];

    service.findAll().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should delete a user by ID', () => {
    const userId = 1;

    service.delete(userId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
