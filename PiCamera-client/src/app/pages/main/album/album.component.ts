import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  public length: number = 0;
  public sizeOptions: number[] = [ 5, 10, 25, 50, 100 ];

  public files: { name: string, image: string, isError: boolean }[] = [];

  private pageConfig: { page: number, size: number } = { page: 0, size: 10 };

  constructor(private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public getData(page: number, size: number): void {
    const response1 = this.httpService.getPictureDirectoryCount();
    response1.subscribe(data => this.length = data.result);

    const response2 = this.httpService.getPictureDirectory(page, size);
    response2.subscribe(data => {
      this.files = data.result.map(item => ({ name: item, image: null, isError: false }));

      this.files.forEach(item => {
        const response = this.httpService.getPictureFile(item.name);
        response.subscribe(data => {
          if (data.code == 404 || data.result == null) {
            item.isError = true;
          } else {
            item.image = data.result;
          }
        });
      });
    });
  }

  public pager(event: { length: number, pageIndex: number, pageSize: number, previousPageIndex: number }): void {
    this.pageConfig = { page: event.pageIndex, size: event.pageSize };
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

}
