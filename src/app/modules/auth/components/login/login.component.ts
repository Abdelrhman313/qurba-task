import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  username: FormControl | any;
  password: FormControl | any;

  subscription: Subscription = new Subscription()

  logging: boolean = false
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    })
  }

  get LoginFormControls() {
    return this.loginForm.controls
  }

  login() {

    // test by username='atuny0' / password='9uQFF1Lh'

    if (this.loginForm.valid) {

      // const LOGIN_DATA = {
      //   ...this.loginForm.value
      // }

      this.subscription.add(
        this.authService.userLogin(this.loginForm.value['username'], this.loginForm.value['password']).subscribe({
          next: (res: any) => {

            localStorage.setItem('token', res?.token)
            localStorage.setItem('userId', res?.id)
            this.authService.userData.next(res)
            this.authService.userToken.next(res?.token);
            Swal.fire({
              title: 'Login',
              text: 'User Login Successfully!',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['/product'])
            })
          },
          error: (err: any) => {

            Swal.fire({
              title: 'Login',
              text: 'User Name Or Password Is Wrong',
              icon: 'error'
            })

          }
        })
      )
    } else {
      // alert for invalid Form
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
