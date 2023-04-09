import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class RatesDemoSettingModal extends LightningModal {
    @api label;
    @api fields;
    record = {};

    handleSave() {
        // fill in absent object properties corresponding to fields
        for ( const field of this.fields ) {
            if ( this.record[ field.name ] === undefined ) {
                this.record[ field.name ] = field.value; // this value was not changed by user. set default
            }
        }
        this.close(this.record);
    }

    handleCancel() {
        this.close(undefined);
    }

    handleChange( event ) {
        this.record[event.target.name] = event.target.value;
    }

}