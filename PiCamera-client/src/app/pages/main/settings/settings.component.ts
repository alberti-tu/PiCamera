import { Component, OnInit } from '@angular/core';
import { FilterOptions, PictureOptions } from 'src/app/models/responses';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public pictureOptions: PictureOptions = { filter: null, quality: 0, rotation: 0 };
  public filters: FilterOptions[] = [];

  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.filters = [
      { name: 'Seleccionar filtro', value: null },
      { name: 'Opción 1', value: 'op1' },
      { name: 'Opción 2', value: 'op2' },
      { name: 'Opción 3', value: 'op3' }
    ];

    this.getSettings();
  }

  public getSettings(): void {
    const response1 = this.httpService.getCameraSettings();
    response1.subscribe(data => this.pictureOptions = data.result);

    // const response2 = this.httpService.getFilterOptionsList();
    // response2.subscribe(data => this.filters = data.result);
  }

  public setSettings(form: PictureOptions): void {
    form.rotation = form.rotation % 360;

    const response = this.httpService.setCameraSettings(form);
    response.subscribe(data => {
      if (data.code == 200) {
        this.adviceService.showToast('Configuración guardada correctamente');
      }
    });
  }

}
