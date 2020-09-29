import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  public length: number = 0;
  public sizeOptions: number[] = [ 5, 10, 25, 50, 100 ];

  public files: string[] = [];

  private pageConfig: { page: number, size: number } = { page: 0, size: 10 };

  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public async getData(page: number, size: number): Promise<void> {
    const response1 = await this.httpService.getPictureDirectoryCount();
    response1.subscribe(data => this.length = data.result);

    const response2 = await this.httpService.getPictureDirectory(page, size);
    response2.subscribe(data => this.files = data.result);
  }

  public pager(event: { length: number, pageIndex: number, pageSize: number, previousPageIndex: number }): void {
    this.pageConfig = { page: event.pageIndex, size: event.pageSize };
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

}
