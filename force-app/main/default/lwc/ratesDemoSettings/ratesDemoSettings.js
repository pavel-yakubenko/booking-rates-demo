import { LightningElement, track, api } from 'lwc';
import RatesDemoSettingModal from 'c/ratesDemoSettingModal';

export default class RatesDemoSettings extends LightningElement {

    @api tableName;
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
            this.notifyDataChange();
        }
    }

    async editRow( row ) {
        const fields = this.getFieldsForModal( row );
        const result = await RatesDemoSettingModal.open({
            label: 'Edit rate',
            fields: fields,
        });

        if( result ) {
            // find row by id, update its values
            result.id = row.id;
            const index = this.tableData.findIndex( item => item.id == row.id );
            const rows = this.tableData.slice(); // copy of table data
            rows.splice( index, 1, result ); // update index
            this.tableData = rows; // assign new data to table data
            this.notifyDataChange();
        }
    }

    async addRow() {
        const fields = this.getFieldsForModal();
        
        const result = await RatesDemoSettingModal.open({
            label: 'New rate',
            fields: fields,
        });

        if( result ) {
            result.id = this.nextIndex++;
            this.tableData = this.tableData.concat( JSON.parse( JSON.stringify( result ) ) );
            this.notifyDataChange();
        }
    }

    async copyRow( row ) {
        const fields = this.getFieldsForModal( row );
        
        const result = await RatesDemoSettingModal.open({
            label: 'Edit rate',
            fields: fields,
        });

        if( result ) {
            if( result ) {
                result.id = this.nextIndex++;
                this.tableData = this.tableData.concat( JSON.parse( JSON.stringify( result ) ) );
                this.notifyDataChange();
            }
        }
    }

    getFieldsForModal( row ) {
        const fields = JSON.parse( JSON.stringify( this.recordFields ) );
        if( row ) {
            for ( const field of fields ) {
                if ( row[ field.name ] ) {
                    if ( field.isMultiPicklist ) {
                        field.value = row[ field.name ].split(',');
                    } else if (field.formatter == 'percent-fixed') {
                        field.value = row[ field.name ]*100;
                    } else {
                        field.value = row[ field.name ];
                    }
                }
            }
        }
        return fields;
    }

    notifyDataChange() {
        // return changed data to parent
        this.dispatchEvent( 
            new CustomEvent( 
                this.tableName.toLowerCase()+'change',
                { detail: { tableName: this.tableName, tableData: this.tableData } } 
            ) 
        );
    }


}