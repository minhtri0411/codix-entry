import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

const apiUrl = "http://localhost:4000";

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<any>
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService,
    ) { }

    getAll() {
        return this.http.get<any[]>(`${apiUrl}/users`);
    }

    register(user) {
        return this.http.post(`${apiUrl}/users/register`, user);
    }

    updateProfile(user) {
        const that = this;
        return this.http.post(`${apiUrl}/users/update`, user)
        .pipe(map(user => {
            that.authenticationService.setCurrentUserValue(user);
        }));;
    }
}