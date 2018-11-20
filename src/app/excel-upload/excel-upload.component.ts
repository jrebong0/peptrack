import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {
    arrayBuffer:any;
    file:File;
    activateUpload: boolean = false;
    uploadFileName = "Choose file";
    @Output() processUpload = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    incomingfile(event) 
    {
        this.file= event.target.files[0];
        this.activateUpload = true;
        this.uploadFileName =  this.file.name;
    }

    Upload() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            let data = new Uint8Array(this.arrayBuffer);
            let arr = new Array();
            for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            let bstr = arr.join("");
            let workbook = XLSX.read(bstr, {type:"binary"});
            let first_sheet_name = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[first_sheet_name];
            let updatedData = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            console.log('updatedData', updatedData);
            this.processUpload.emit(updatedData);
        }
        fileReader.readAsArrayBuffer(this.file);
    }

}
