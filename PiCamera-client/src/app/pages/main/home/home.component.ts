import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public image: string = null;
  
  private imageSuscription: Subscription = null;

  constructor(private adviceService: AdviceService, private httpService: HttpService, private socketService: SocketService) { }

  public ngOnInit(): void {
    this.socketService.connect();
    this.imageSuscription = this.socketService.getImage()
      .subscribe(data => {
        if (data !== null) {
          this.image = data;
        }
      });
  }

  public ngOnDestroy(): void {
    this.imageSuscription.unsubscribe();
    this.socketService.disconnect();
  }

  public savePicture(): void {
    const response = this.httpService.savePicture();
    response.subscribe(data => {
      if (data.code === 200) {
        this.adviceService.showToast('Foto guardada correctamente');
      }
    });
  }

}
