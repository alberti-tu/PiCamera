import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/responses';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;

  foods: { value: string, viewValue: string }[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getSettings();
  }

  public async getSettings(): Promise<void> {
    const response = await this.httpService.getCameraSettings();
    response.subscribe(data => {});
  }

  public async setSettings(form: Settings): Promise<void> {

    console.log(form);

    /*
    const response = await this.httpService.setCameraSettings();
    response.subscribe(data => {});
    */
  }

}
