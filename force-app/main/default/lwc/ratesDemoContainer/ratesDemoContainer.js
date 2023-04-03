import { LightningElement } from 'lwc';

const ROOM_TYPES = [
    {label: 'Standard', value: 'standard'},
    {label: 'Luxury', value: 'luxury'},
];

const GUEST_TYPES = [
    {label: 'Standard', value: 'standard'},
    {label: 'Employee', value: 'employee'},
    {label: 'Disabled', value: 'disabled'},
    {label: 'Group', value: 'group'},
];

export default class RatesDemoContainer extends LightningElement {

    roomTypes = ROOM_TYPES;
    guestTypes = GUEST_TYPES;

}