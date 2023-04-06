import { LightningElement, track, api } from 'lwc';

export default class RatesDemoControllerCapacity extends LightningElement {

    @api tableData;
    @api tableColumns;
    nextIndex = 0;

    connectedCallback() {
        this.nextIndex = this.data ? this.data.length : 0;
    }    

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if ( actionName == 'delete') {
            this.deleteRow(row);
        }
    }

    deleteRow(row) {
        const index = this.tableData.findIndex( item => item.id == row.id );
        if ( index ) {
            const rows = this.tableData.slice(); // copy of table data
            rows.splice( index, 1 ); // delete index
            this.tableData = rows; // assign new data to table data
        }
    }

    addRow( event ) {
        this.tableData = this.tableData.concat( {id: this.nexIndex++, roomType: 'Default', guestCount: 0, rate: 0} );
    }

}