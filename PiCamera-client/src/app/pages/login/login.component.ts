import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private httpService: HttpService) { }

  public ngOnInit(): void {}

  public login(form: { username: string, password: string }): void {
    const passwordHash = this.authService.hash(form.password);
    const response = this.httpService.login(form.username, passwordHash);
    response.subscribe(data => {
      if (data.code === 200) {
        this.authService.saveToken(data.result);
      } else {
        this.authService.removeToken();
        this.adviceService.showToast('Usuario y/o contraseña incorrecto');
      }
    });
  }

}
