import { LightningElement, track } from 'lwc';
import {ROOM_TYPES, GUEST_TYPES, WEEKDAYS} from './dataSamples';
import {PRICE_COLUMNS, PRICE_DATA, PRICE_FIELDS} from './dataSamples';
import {CAPACITY_CONTROLLER_COLUMNS, CAPACITY_CONTROLLER_DATA, CAPACITY_CONTROLLER_FIELDS} from './dataSamples';
import {TERM_CONTROLLER_COLUMNS, TERM_CONTROLLER_DATA, TERM_CONTROLLER_FIELDS} from './dataSamples';
import {PERIOD_CONTROLLER_COLUMNS, PERIOD_CONTROLLER_DATA, PERIOD_CONTROLLER_FIELDS} from './dataSamples';
import {GUESTTYPE_CONTROLLER_COLUMNS, GUESTTYPE_CONTROLLER_DATA, GUESTTYPE_CONTROLLER_FIELDS} from './dataSamples';

export default class RatesDemoContainer extends LightningElement {

    roomTypes = ROOM_TYPES;
    defaultRoomType = ROOM_TYPES[0].value;
    guestTypes = GUEST_TYPES;
    priceColumns = PRICE_COLUMNS;
    priceData = PRICE_DATA;
    priceFields = PRICE_FIELDS;
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

    @track bookingSummary = 'Select smth...';

    get roomTypesForRecord() {
        return this.roomTypes.filter( e => e.value != 'Default' );
    }

    getBasicPrice( bookingProp ) {
        let setting = this.priceData.find( e => e.roomType == bookingProp.roomType );
        console.log( JSON.stringify( setting ) );
        return setting ? setting.price : 0;
    }

    getCapacityRate( bookingProp ) {

        // find by room type
        let setting = this.capacityControllerData.find( e => e.roomType == bookingProp.roomType && e.guestCount == bookingProp.guestCount );
        if ( !setting ) {
            // if not found, get default
            setting = this.capacityControllerData.find( e => e.roomType == this.defaultRoomType && e.guestCount == bookingProp.guestCount );
        }
        console.log( JSON.stringify( setting ) );
        return setting ? setting.rate : 0;
    }

    getGuestTypeRate( bookingProp ) {
        // find by room type
        let setting = this.guestTypeControllerData.find( e => e.roomType == bookingProp.roomType && e.guestType == bookingProp.guestType );
        if ( !setting ) {
            // if not found, get default
            setting = this.guestTypeControllerData.find( e => e.roomType == this.defaultRoomType && e.guestType == bookingProp.guestType );
        }
        console.log( JSON.stringify( setting ) );
        return setting ? setting.rate : 0;
    }

    getTermRate( bookingProp ) {
        // // find by room type
        // let setting = this.guestTypeControllerData.find( e => e.roomType == bookingProp.roomType && e.guestType == bookingProp.guestType );
        // if ( !setting ) {
        //     // if not found, get default
        //     setting = this.guestTypeControllerData.find( e => e.roomType == this.defaultRoomType && e.guestType == bookingProp.guestType );
        // }
        // console.log( JSON.stringify( setting ) );
        // return setting ? setting.rate : 0;
    }

    getPrice( bookingProp ) {
        // get basic price
        console.log( '-- basic price --' );
        let price = this.getBasicPrice( bookingProp );
        let rate = 0;

        // get capacity rate
        console.log( '-- capacity rate --' );
        rate = this.getCapacityRate( bookingProp );
        price = price * ( 1 + rate );

        // get guest type rate
        console.log( '-- guest type rate --' );
        rate = this.getGuestTypeRate( bookingProp );
        price = price * ( 1 + rate );

        // return result
        return price;
    }

    handleCalculate( event ) {

        console.log( JSON.stringify( event.detail ) );

        const bookingProp = event.detail;

        const price = this.getPrice( bookingProp );
        
        const result = '' +
        'Room type = ' + this.roomTypes.find( e => e.value == bookingProp.roomType ).label + '; ' +
        'Guests = ' + bookingProp.guestCount + '; ' +
        'Period = ' + bookingProp.startDate + ' - ' + bookingProp.endDate +'; '+
        'Guest type = ' + this.guestTypes.find( e => e.value == bookingProp.guestType ).label + '; ' +
        'Price = ' + price;

        this.bookingSummary = result;
    }

}