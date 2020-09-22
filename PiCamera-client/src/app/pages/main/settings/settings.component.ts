import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';
import { PictureOptions } from 'src/app/models/responses';

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

  public async setSettings(): Promise<void> {
    const response = await this.httpService.setCameraSettings(this.pictureOptions);
    response.subscribe(data => {});
  }

}
