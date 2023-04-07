import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class RatesDemoSettingModal extends LightningModal {
    @api label;
    @api fields;
    @api record; // {id: this.nextIndex++, roomType: result.roomType, guestCount: result.guestCount, rate: 0}

    handleSave() {
        this.close(record);
    }

    handleCancel() {
        this.close(undefined);
    }

    handleChange( event ) {
        console.log( 'record before ---------');
        console.log( this.record );
        this.record[event.target.name] = event.target.value;
        console.log( 'record after ---------');
        console.log( this.record );
    }

}