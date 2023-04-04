import { LightningElement, track } from 'lwc';

const TABLE_ACTIONS = [
    { label: 'Delete', name: 'delete' },
];

const TABLE_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Guest Count', fieldName: 'guestCount', type: 'number', editable: true },
    { label: 'Rate', fieldName: 'rate', type: 'percent', editable: true },
    {
        type: 'action',
        typeAttributes: { rowActions: TABLE_ACTIONS },
    },
];

const TABLE_DATA = [
    {id: '0', roomType: 'Default', guestCount: 1, rate: -0.1},
    {id: '1', roomType: 'Default', guestCount: 2, rate: 0},
    {id: '2', roomType: 'Default', guestCount: 3, rate: 0.1},
    {id: '3', roomType: 'Default', guestCount: 4, rate: 0.15},
    {id: '4', roomType: 'Standard', guestCount: 1, rate: -0.15},
    {id: '5', roomType: 'Standard', guestCount: 3, rate: 0.2},
    {id: '6', roomType: 'Luxury', guestCount: 4, rate: 0.25},
];

export default class RatesDemoControllerCapacity extends LightningElement {

    @track data = TABLE_DATA.slice();
    columns = TABLE_COLUMNS.slice();
    nextIndex = TABLE_DATA.length+1;

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if ( actionName == 'delete') {
            this.deleteRow(row);
        }
    }

    deleteRow(row) {
        const index = this.data.findIndex( item => item.id == row.id );
        if ( index ) {
            const rows = this.data.slice(); // copy of table data
            rows.splice( index, 1 ); // delete index
            this.data = rows; // assign new data to table data
        }
    }

    addRow( event ) {
        this.data = this.data.concat( {id: this.nexIndex++, roomType: 'Default', guestCount: 0, rate: 0} );
    }

}