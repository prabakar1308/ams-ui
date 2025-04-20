import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { MetaState } from '@shared/models/meta-state';
import * as fromStore from '../state';
import * as authActions from '../state/auth.actions';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  userData$: Observable<AuthResponse>;
  meta$: Observable<MetaState>;
  public userSubject: BehaviorSubject<any>;
  public userData: Observable<any>;

  constructor(private store: Store<fromStore.AppState>) {
    this.userData$ = this.store.select(fromStore.getUserData);
    this.meta$ = this.store.select(fromStore.getMetaInfo);

    const user = localStorage.getItem('userData');
    this.userSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
    this.userData = this.userSubject.asObservable();
  }

  userLogin(userId: string, password: string) {
    this.store.dispatch(authActions.userLogin({ userId, password }));
  }

  userLoginSucess(response: AuthResponse) {
    this.store.dispatch(authActions.userLoginSuccess(response));
  }

  userLoginFailure(error: string) {
    this.store.dispatch(authActions.userLoginFailure({ error }));
  }

  logout() {
    localStorage.removeItem('userData');
    this.userSubject.next(null);
  }

  public get currentUserData() {
    return this.userSubject.value;
  }
}
