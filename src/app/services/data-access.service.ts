import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private static BASE_URL = 'https://gongfetest.firebaseio.com';
  private usersObservable: Observable<User[]>;
  users: User[];

  constructor(private http: HttpClient) {
    this.usersObservable = this.http.get(`${DataAccessService.BASE_URL}/users/.json`).pipe(
      tap((users: User[]) => this.users = users)
    );
    this.usersObservable.subscribe();
  }

  public getUserId(secret: string): Observable<any> {
    return forkJoin(this.usersObservable, this.http.get(`${DataAccessService.BASE_URL}/secrets/${secret}.json`)).pipe(
      map(res => res[1])
    );
  }
}
