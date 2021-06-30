import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  hasUpdated: boolean;
  isLoggedIn: boolean;
  user: User | null | undefined;

  constructor(private authService: AuthService) {
    this.hasUpdated = false;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user && user.email) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.hasUpdated = true;
    });
  }

}
