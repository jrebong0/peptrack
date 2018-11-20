import { Component, OnInit, DoCheck, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-excel-editor',
  templateUrl: './excel-editor.component.html',
  styleUrls: ['./excel-editor.component.css']
})
export class ExcelEditorComponent implements OnInit, DoCheck, OnChanges {
    @Input('headerName') headerName;
    @Input('dataList') dataList;
    @Input('dataHeader') dataHeader;
    @Output() updateEditData = new EventEmitter<any>();
    @ViewChild('tableGrid') tableGrid;

    private defaultColDef;
    rowData = [];
    columnDefs = [];
    differ: any;
    showSave: boolean = false;

    // columnDefs = [
    //     {headerName: 'Brand', field: 'brand'},
    //     {headerName: 'Model', field: 'model'},
    //     {headerName: 'Price', field: 'price'},
    //     {headerName: 'Location', field: 'location'}
    // ];

    // rowData = [
    //     { brand: 'Toyota', model: 'Celica', location: 'Laguna', price: 35000},
    //     { brand: 'Ford', model: 'Mondeo', location: 'Cavite', price: 32000},
    //     { brand: 'Porsche', model: 'Boxter', location: 'Manila', price: 72000},
    //     { brand: 'Mazda', model: 'Celica', location: 'Sta. Rosa', price: 35000},
    //     { brand: 'Honda', model: 'Mondeo', location: 'Laguna', price: 32000},
    //     { brand: 'Mitsubishi', model: 'Boxter', location: 'Pasig', price: 72000},
    //     { brand: 'Chevrolet', model: 'Celica', location: 'Marikina', price: 35000},
    //     { brand: 'Chrysler', model: 'Mondeo', location: 'Pampanga', price: 32000},
    //     { brand: 'BMW', model: 'Boxter', location: 'Batangas', price: 72000}
    // ];
    

    constructor() {
        this.defaultColDef = {
            editable: true,
            singleClickEdit: true
        };
        this.differ = _.cloneDeep(this.rowData);
    }

    ngOnInit() {
        this.columnDefs = this.dataHeader;
        // this.rowData = this.dataList;
    }

    ngDoCheck() {
        const noChange = this.isArrayEqual(this.rowData, this.differ);
        this.showSave = !noChange;
    }

    ngOnChanges(change: SimpleChanges) {
        console.log('onChange', change.dataList.currentValue);
        this.rowData = change.dataList.currentValue;
    }

    isArrayEqual(x, y) {
        return _(x).differenceWith(y, _.isEqual).isEmpty();
    };

    saveChanges() {
        console.log('Saving changes');
        this.updateEditData.emit(this.rowData);
    }

    onFirstDataRendered(params) {
        this.tableGrid.api.sizeColumnsToFit();
    }

}
