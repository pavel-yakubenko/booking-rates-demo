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
            // convert multi picklist values to string
            if ( field.isMultiPicklist  ) {
                this.record[ field.name ] = this.record[ field.name ].join();
            }
            // convert fixed percents to float
            if ( field.formatter == 'percent-fixed' ) {
                this.record[ field.name ] = this.record[ field.name ]/100;
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