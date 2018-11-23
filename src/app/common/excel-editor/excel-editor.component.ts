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
    cellEdit;
    editedCell: any[] = [];

    constructor() {
        this.defaultColDef = {
            // editable: true,
            singleClickEdit: true
        };
        this.differ = _.cloneDeep(this.rowData);
    }

    ngOnInit() {
        this.columnDefs = this.dataHeader;
    }

    ngDoCheck() {
        // console.log('ngDoCheck', this.cellEdit);
        // const noChange = this.isArrayEqual(this.rowData, this.differ);
        // this.showSave = !noChange;
        
    }

    ngOnChanges(change: SimpleChanges) {
        this.rowData = change.dataList.currentValue;
    }

    isArrayEqual(x, y) {
        return _(x).differenceWith(y, _.isEqual).isEmpty();
    };

    saveChanges() {
        this.updateEditData.emit(this.rowData);
        this.showSave = false;
    }

    onFirstDataRendered(params) {
        this.tableGrid.api.sizeColumnsToFit();
    }

    onCellValueChanged(params) {
        console.log('value change', params);
        const noChange = this.isArrayEqual(this.rowData, this.differ);
        this.showSave = !noChange;
    }

}
