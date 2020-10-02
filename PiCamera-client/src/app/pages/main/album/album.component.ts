import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { HttpService } from 'src/app/services/http/http.service';
import { AlertData } from 'src/app/components/alert/alert.component';

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

  constructor(private adviceService: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public getData(page: number, size: number): void {
    const response1 = this.httpService.getPictureDirectoryCount();
    response1.subscribe(data1 => this.length = data1.result);

    const response2 = this.httpService.getPictureDirectory(page, size);
    response2.subscribe(data2 => {
      this.files = data2.result.map(item => ({ name: item, image: null, isError: false }));

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

  public removeFile(name: string): void {
    const options: AlertData = {
      header: '¿Quieres borrar esta foto?',
      message: 'Esta acción no se puede revertir',
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

      const response = this.httpService.removePictureFile(name);
      response.subscribe(data => {
        if (data.code == 404) {
          this.adviceService.showToast('No se ha encontrado el fichero, sincronizando cambios');
        }

        this.getData(this.pageConfig.page, this.pageConfig.size);
      });
    });
  }

  public pager(event: { length: number, pageIndex: number, pageSize: number, previousPageIndex: number }): void {
    this.pageConfig = { page: event.pageIndex, size: event.pageSize };
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

}
