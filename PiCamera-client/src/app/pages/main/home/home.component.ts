import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private socketService: SocketService) { }

  public ngOnInit(): void {
    this.imageSuscription = this.socketService.getImage().subscribe(data => {
      this.image = data;
    });
  }

  public ngOnDestroy(): void {
    this.imageSuscription.unsubscribe();
  }

}
