export const ROOM_TYPES = [
    {label: 'Default', value: 'Default'},
    {label: 'Standard', value: 'Standard'},
    {label: 'Luxury', value: 'Luxury'},
];

export const GUEST_TYPES = [
    {label: 'Default', value: 'Default'},
    {label: 'Standard', value: 'Standard'},
    {label: 'Employee', value: 'Employee'},
    {label: 'Disabled', value: 'Disabled'},
    {label: 'Group', value: 'Group'},
];

export const WEEKDAYS = [
    {label: 'Sunday', value: 'Sun'},
    {label: 'Monday', value: 'Mon'},
    {label: 'Tuesday', value: 'Tue'},
    {label: 'Wednesday', value: 'Wed'},
    {label: 'Thursday', value: 'Thu'},
    {label: 'Friday', value: 'Fri'},
    {label: 'Saturday', value: 'Sat'},
];

const CONTROLLER_TABLE_ACTIONS = [
    { label: 'Edit', name: 'edit' },
    { label: 'Copy', name: 'copy' },
    { label: 'Delete', name: 'delete' },
];

// -----------------------------------
// basic prices

export const PRICE_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Price', fieldName: 'price', type: 'number' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

export const PRICE_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', type: '', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isInput: true, name: 'price', label: 'Price', type: 'number', value: 0 },
];


export const PRICE_DATA = [
    {id: '0', roomType: 'Standard', price: 100},
    {id: '1', roomType: 'Luxury', price: 200},
];

// -----------------------------------
// capacity rates

export const CAPACITY_CONTROLLER_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Guest Count', fieldName: 'guestCount', type: 'number' },
    { label: 'Rate', fieldName: 'rate', type: 'percent' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

export const CAPACITY_CONTROLLER_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', type: '', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isInput: true, name: 'guestCount', label: 'Guest Count', type: 'number', value: 1 },
    { isInput: true, name: 'rate', label: 'Rate', type: 'number', formatter: 'percent', step: '0.01', value: 0 },
];


export const CAPACITY_CONTROLLER_DATA = [
    {id: '0', roomType: 'Default', guestCount: 1, rate: -0.1},
    {id: '1', roomType: 'Default', guestCount: 2, rate: 0},
    {id: '2', roomType: 'Default', guestCount: 3, rate: 0.1},
    {id: '3', roomType: 'Default', guestCount: 4, rate: 0.15},
    {id: '4', roomType: 'Standard', guestCount: 1, rate: -0.15},
    {id: '5', roomType: 'Standard', guestCount: 3, rate: 0.2},
    {id: '6', roomType: 'Luxury', guestCount: 4, rate: 0.25},
];


// -----------------------------------
// term rates

export const TERM_CONTROLLER_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Week Day', fieldName: 'weekday', type: 'string' },
    { label: 'Stay for', fieldName: 'term', type: 'number' },
    { label: 'Rate', fieldName: 'rate', type: 'percent' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

export const TERM_CONTROLLER_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isMultiPicklist: true, name: 'weekday', label: 'Week Day', value: [WEEKDAYS[0].value], options: WEEKDAYS },
    { isInput: true, name: 'term', label: 'Stay for', type: 'number', value: 1 },
    { isInput: true, name: 'rate', label: 'Rate', type: 'number', formatter: 'percent', step: '0.01', value: 0 },
];


export const TERM_CONTROLLER_DATA = [
    {id: '0', roomType: 'Default', weekday: 'Sun,Mon,Tue,Wed', term: 6, rate: 0},
    {id: '1', roomType: 'Default', weekday: 'Thu,Fri,Sat', term: 6, rate: 0.10},
    {id: '2', roomType: 'Default', weekday: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat', term: 9999, rate: -0.10},
];

// -----------------------------------
// period rates

export const PERIOD_CONTROLLER_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Start Date', fieldName: 'startDate', type: 'date' },
    { label: 'End Date', fieldName: 'endDate', type: 'date' },
    { label: 'Rate', fieldName: 'rate', type: 'percent' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

export const PERIOD_CONTROLLER_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isInput: true, name: 'startDate', label: 'Start Date', type: 'date' },
    { isInput: true, name: 'endDate', label: 'End Date', type: 'date' },
    { isInput: true, name: 'rate', label: 'Rate', type: 'number', formatter: 'percent', step: '0.01', value: 0 },
];


export const PERIOD_CONTROLLER_DATA = [
    {id: '0', roomType: 'Default', startDate: '2023-01-01', endDate: '2023-03-31', rate: -0.15},
    {id: '1', roomType: 'Default', startDate: '2023-04-01', endDate: '2023-09-30', rate: 0.5},
];

// ------------------------------------------
// guest type rates

export const GUESTTYPE_CONTROLLER_COLUMNS = [
    { label: 'Room Type', fieldName: 'roomType' },
    { label: 'Guest Type', fieldName: 'guestType'},
    { label: 'Rate', fieldName: 'rate', type: 'percent' },
    {
        type: 'action',
        typeAttributes: { rowActions: CONTROLLER_TABLE_ACTIONS },
    },
];

export const GUESTTYPE_CONTROLLER_FIELDS = [
    { isPicklist: true, name: 'roomType', label: 'Room Type', type: '', value: ROOM_TYPES[0].value, options: ROOM_TYPES },
    { isPicklist: true, name: 'guestType', label: 'Guest Type', type: '', value: GUEST_TYPES[0].value, options: GUEST_TYPES },
    { isInput: true, name: 'rate', label: 'Rate', type: 'number', formatter: 'percent', step: '0.01', value: 0 },
];


export const GUESTTYPE_CONTROLLER_DATA = [
    {id: '0', roomType: 'Default', guestType: 'Default',  rate: 0},
    {id: '1', roomType: 'Default', guestType: 'Employee',  rate: -0.25},
];
