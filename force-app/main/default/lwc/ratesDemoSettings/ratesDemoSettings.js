import { LightningElement, track, api } from 'lwc';
import RatesDemoSettingModal from 'c/ratesDemoSettingModal';

export default class RatesDemoControllerCapacity extends LightningElement {

    @api tableData;
    @api tableColumns;
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
        // this.tableData = this.tableData.concat( {id: this.nextIndex++, roomType: 'Default', guestCount: 0, rate: 0} );
        const result = await RatesDemoSettingModal.open({
            label: 'New rate',
        });
    }

    async editRow( event ) {
        // this.tableData = this.tableData.concat( {id: this.nextIndex++, roomType: 'Default', guestCount: 0, rate: 0} );
        const result = await RatesDemoSettingModal.open({
            label: 'Edit rate',
        });
    }

    async copyRow( event ) {
        // this.tableData = this.tableData.concat( {id: this.nextIndex++, roomType: 'Default', guestCount: 0, rate: 0} );
        const result = await RatesDemoSettingModal.open({
            label: 'New prefilled rate',
        });
    }

}