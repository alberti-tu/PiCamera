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
  
  /*
  selectedValue: string;

  foods: { value: string, viewValue: string }[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  */

  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getSettings();
  }

  public async getSettings(): Promise<void> {
    const response = await this.httpService.getCameraSettings();
    response.subscribe(data => this.pictureOptions = data.result);
  }

  public async setSettings(): Promise<void> {
    console.log(this.pictureOptions);

    const response = await this.httpService.setCameraSettings(this.pictureOptions);
    response.subscribe(data => {});
  }

}
