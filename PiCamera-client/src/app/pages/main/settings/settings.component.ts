import { Component, OnInit } from '@angular/core';
import { PictureOptions } from 'src/app/models/responses';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public pictureOptions: PictureOptions = { quality: 0, rotation: 0 };

  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getSettings();
  }

  public async getSettings(): Promise<void> {
    const response = await this.httpService.getCameraSettings();
    response.subscribe(data => this.pictureOptions = data.result);
  }

  public async setSettings(form: PictureOptions): Promise<void> {
    form.rotation = form.rotation % 360;
    console.log(form);
    
    const response = await this.httpService.setCameraSettings(form);
    response.subscribe(data => {});
  }

}
