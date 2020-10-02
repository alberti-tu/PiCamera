import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AlertData } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: MatSidenav;

  public pageList: { name: string, icon: string, action: () => void }[] = [];

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private router: Router) {}

  public ngOnInit(): void {
    this.pageList = [
      { name: 'Inicio', icon: 'home', action: () => this.navigateTo('/home') },
      { name: 'Álbum', icon: 'folder', action: () => this.navigateTo('/album') },
      { name: 'Ajustes', icon: 'settings', action: () => this.navigateTo('/settings') },
      { name: 'Cerrar sesión', icon: 'directions_run', action: () => this.closeSession() }
    ];
  }

  public navigateTo(url: string): void {
    this.sideMenu.close();
    this.router.navigateByUrl(url);
  }

  public closeSession(): void {
    const options: AlertData = {
      header: '¿Quieres cerrar la sesión?',
      message: 'La próxima vez que accedas deberás introducir tu usuario y contraseña',
      buttons: [
        { name: 'Cancelar', value: 'cancel' },
        { name: 'Aceptar', value: 'ok', isPrimary: true },
      ]
    };

    const result = this.adviceService.showAlert(options);
    result.subscribe(button => {
      if (button == null || button == 'cancel') {
        return;
      }

      this.authService.removeToken();
      this.adviceService.showToast('La sesión se ha cerrado correctamente');
    });
  }

}
