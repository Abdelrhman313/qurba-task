import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean
  openMenu: boolean

  constructor(private authService: AuthService) {
    this.isLogin = false
    this.openMenu = false
  }

  ngOnInit(): void {
    this.checkUserLogin()
  }

  checkUserLogin() {
    if (this.authService.isLogin()) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }

  // using subscription if logout is exist to change state in header
}
