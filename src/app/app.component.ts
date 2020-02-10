import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LightHouseData';
  selectedFile;
  dataObject: object;
  dataArray: object[] = [];
  skuName: string;

  readFile(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');

    fileReader.onload = () => {
      if (fileReader.result instanceof ArrayBuffer) {
        console.log('error');
      } else {
        this.dataObject  = JSON.parse(fileReader.result);
        console.log(this.dataObject);
        this.initArray(this.dataObject);
      }
    };

    fileReader.onerror = (error) => {
      console.log(error);
    };

    // this.initArray(this.dataObject);
  }


  initArray(data: any) {
    this.skuName = data.finalUrl;

    this.dataArray.push(data.audits['mainthread-work-breakdown']);
    this.dataArray.push(data.audits['main-thread-tasks']);
  }
}
