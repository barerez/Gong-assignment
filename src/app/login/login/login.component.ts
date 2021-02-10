import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;

  form: FormGroup;
  submitted = false;

  @ViewChild('formContent') reportContent: ElementRef;
  loginFailed = false;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get fields() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loginFailed = false;

    this.loading = true;
    this.authenticationService.login(this.fields.email.value, this.fields.password.value)
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.loginFailed = true;
        });
  }

}
