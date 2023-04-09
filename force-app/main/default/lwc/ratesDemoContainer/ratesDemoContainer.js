import { LightningElement } from 'lwc';

const ROOM_TYPES = [
    {label: 'Default', value: 'Default'},
    {label: 'Standard', value: 'Standard'},
    {label: 'Luxury', value: 'Luxury'},
];

const GUEST_TYPES = [
    {label: 'Standard', value: 'Standard'},
    {label: 'Employee', value: 'Employee'},
    {label: 'Disabled', value: 'Disabled'},
    {label: 'Group', value: 'Group'},
];

const CONTROLLER_TABLE_ACTIONS = [
    { label: 'Edit', name: 'edit' },
    { label: 'Copy', name: 'copy' },
    { label: 'Delete', name: 'delete' },
];

const CAPACITY_CONTROLLER_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Guest Count', fieldName: 'guestCount', type: 'number' },
    { label: 'Rate', fieldName: 'rate', type: 'percent' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

const CAPACITY_CONTROLLER_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', type: '', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isInput: true, name: 'guestCount', label: 'Guest Count', type: 'number', value: 1, options: undefined },
    { isInput: true, name: 'rate', label: 'Rate', type: 'number', formatter: 'percent', step: '0.01', value: 0, options: undefined },
];


const CAPACITY_CONTROLLER_DATA = [
    {id: '0', roomType: 'Default', guestCount: 1, rate: -0.1},
    {id: '1', roomType: 'Default', guestCount: 2, rate: 0},
    {id: '2', roomType: 'Default', guestCount: 3, rate: 0.1},
    {id: '3', roomType: 'Default', guestCount: 4, rate: 0.15},
    {id: '4', roomType: 'Standard', guestCount: 1, rate: -0.15},
    {id: '5', roomType: 'Standard', guestCount: 3, rate: 0.2},
    {id: '6', roomType: 'Luxury', guestCount: 4, rate: 0.25},
];

export default class RatesDemoContainer extends LightningElement {

    roomTypes = ROOM_TYPES;
    guestTypes = GUEST_TYPES;
    capacityControllerColumns = CAPACITY_CONTROLLER_COLUMNS;
    capacityControllerData = CAPACITY_CONTROLLER_DATA;
    capacityControllerFields = CAPACITY_CONTROLLER_FIELDS;

}