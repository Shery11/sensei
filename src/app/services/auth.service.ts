import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = afAuth.authState.pipe(
      switchMap(user => {
        return user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);
      })
    );
  }

  public loginUser(email: string, password: string): Promise<any> {
    // this.platform.loading(true);
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(credential => this.updateUser(credential.user, null))
      .then(() => this.router.navigate(['/dash']))
      // .finally(() => this.platform.loading(false))
      // .catch(error => this.notify.error(error));
      .catch(err => {
        console.log('Auth Service: Login Error');
        console.log('Error Code:', err.code);
        console.log(err);
      });
  }

  public logoutUser(): Promise<any> {
    return this.afAuth.signOut()
      .then(() => this.router.navigate(['/home']))
      .catch(err => {
        console.log('Auth Service: Logout Error');
        console.log('Error Code:', err.code);
        console.log(err);
      });
  }

  public resetPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Auth Service: Reset Password Email Sent'))
      .catch(err => {
        console.log('Auth Service: Reset Password Error');
        console.log('Error Code:', err.code);
        console.log(err);
      });
  }

  public signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => this.updateUser(credential.user, user))
      .then(() => this.router.navigate(['/dash']))
      .catch(err => {
        console.log('Auth Service: Signup Error');
        console.log('Error Code:', err.code);
        console.log(err);
      });
  }

  private updateUser(credential: any, user: any) {
    const userDoc: AngularFirestoreDocument<any> = this.afs.doc(`users/${credential.uid}`);
    userDoc.ref.get()
      .then(userRef => {
        if (!userRef.exists) {
          const data: User = {
            displayName: user.displayName,
            email: credential.email,
            lastLogin: new Date(),
            // loginType: user.loginType,
            // photoURL: user.photoURL || '',
            roles: { basic: true },
            uid: credential.uid
          };
          userRef.ref.set(data)
            .catch(err => {
              console.log('Auth Service: Update User Data Error');
              console.log('Error Code:', err.code);
              console.log(err);
            });
        } else {
          userRef.ref.update({ lastLogin: new Date() });
        }
      })
      .catch(err => {
        console.log('Auth Service: Update User Error');
        console.log('Error Code:', err.code);
        console.log(err);
      });
  }

  canAccess(user: User): boolean {
    const allowed: string[] = ['admin', 'basic'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles.hasOwnProperty(role)) return true;
    }
    return false;
  }

}
