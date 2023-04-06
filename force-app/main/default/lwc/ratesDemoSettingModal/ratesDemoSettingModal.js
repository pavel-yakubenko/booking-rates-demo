import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class RatesDemoSettingModal extends LightningModal {
    @api label;
    // @api fields;
    fields = [
        {
            isPicklist: true,
            name: 'picklist',
            label: 'Picklist',
            type: '',
            value: 'luxury',
            options: [
                {label: 'Standard', value: 'standard'},
                {label: 'Luxury', value: 'luxury'},
            ],
        },
        {
            isInput: true,
            name: 'input',
            label: 'Input',
            type: 'date',
            value: '',
            options: [],
        },
    ];

    fieldsChanged = {};

    handleSave() {
        this.close('save');
    }

    handleCancel() {
        this.close('cancel');
    }

    handleChange( event ) {

        this.fieldsChanged[event.target.name] = event.target.value;
    }

}