import { LightningElement } from 'lwc';
import {ROOM_TYPES, GUEST_TYPES} from './dataSamples';
import {CAPACITY_CONTROLLER_COLUMNS, CAPACITY_CONTROLLER_DATA, CAPACITY_CONTROLLER_FIELDS} from './dataSamples';
import {TERM_CONTROLLER_COLUMNS, TERM_CONTROLLER_DATA, TERM_CONTROLLER_FIELDS} from './dataSamples';
import {PERIOD_CONTROLLER_COLUMNS, PERIOD_CONTROLLER_DATA, PERIOD_CONTROLLER_FIELDS} from './dataSamples';
import {GUESTTYPE_CONTROLLER_COLUMNS, GUESTTYPE_CONTROLLER_DATA, GUESTTYPE_CONTROLLER_FIELDS} from './dataSamples';

export default class RatesDemoContainer extends LightningElement {

    roomTypes = ROOM_TYPES;
    guestTypes = GUEST_TYPES;
    capacityControllerColumns = CAPACITY_CONTROLLER_COLUMNS;
    capacityControllerData = CAPACITY_CONTROLLER_DATA;
    capacityControllerFields = CAPACITY_CONTROLLER_FIELDS;
    termControllerColumns = TERM_CONTROLLER_COLUMNS;
    termControllerData = TERM_CONTROLLER_DATA;
    termControllerFields = TERM_CONTROLLER_FIELDS;
    periodControllerColumns = PERIOD_CONTROLLER_COLUMNS;
    periodControllerData = PERIOD_CONTROLLER_DATA;
    periodControllerFields = PERIOD_CONTROLLER_FIELDS;
    guestTypeControllerColumns = GUESTTYPE_CONTROLLER_COLUMNS;
    guestTypeControllerData = GUESTTYPE_CONTROLLER_DATA;
    guestTypeControllerFields = GUESTTYPE_CONTROLLER_FIELDS;

}