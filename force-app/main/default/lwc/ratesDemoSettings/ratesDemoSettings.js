import { LightningElement, track, api } from 'lwc';
import RatesDemoSettingModal from 'c/ratesDemoSettingModal';

export default class RatesDemoControllerCapacity extends LightningElement {

    @api tableData;
    @api tableColumns;
    @api recordFields;
    nextIndex = 0;

    connectedCallback() {
        this.nextIndex = this.tableData ? this.tableData.length : 0;
    }    

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if ( actionName == 'delete') {
            this.deleteRow( row );
        } else if ( actionName == 'copy' ) {
            this.copyRow( row );
        } else if ( actionName == 'edit' ) {
            this.editRow( row );
        }
    }

    deleteRow(row) {
        const index = this.tableData.findIndex( item => item.id == row.id );
        if ( index >= 0 ) {
            const rows = this.tableData.slice(); // copy of table data
            rows.splice( index, 1 ); // delete index
            this.tableData = rows; // assign new data to table data
        }
    }

    async addRow( event ) {
        const row = {};
        for (const field of this.recordFields) {
            row[field.name] = field.value;
        }

        console.log( 'Open modal with row ' );
        console.log( row );
        console.log( JSON.stringify( row ) );

        const result = await RatesDemoSettingModal.open({
            label: 'New rate',
            fields: this.recordFields,
            record: row,
        });

        if( result ) {
            result.id = this.nextIndex++;
            this.tableData = this.tableData.concat( result );
        }
    }

    async editRow( row ) {
        console.log( 'Open modal with row ' );
        console.log( row );
        console.log( JSON.stringify( row ) );
        const result = await RatesDemoSettingModal.open({
            label: 'Edit rate',
            fields: this.recordFields,
            record: row,
        });

        if( result ) {
            // find row by id, update its values
        }
    }

    async copyRow( row ) {
        const result = await RatesDemoSettingModal.open({
            label: 'Edit rate',
            fields: this.recordFields,
            record: row,
        });

        if( result ) {
            result.id = this.nextIndex++;
            this.tableData = this.tableData.concat( result );
        }
    }

}