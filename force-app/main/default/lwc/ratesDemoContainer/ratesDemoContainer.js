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

    handleTableDataChange( event ) {
        this[event.detail.tableName] = event.detail.tableData;
        console.log( JSON.stringify( this[event.detail.tableName] ) );
    }

    get roomTypesForRecord() {
        return this.roomTypes.filter( e => e.value != 'Default' );
    }

    getBasicPrice( bookingProp ) {
        let setting = this.priceData.find( e => e.roomType == bookingProp.roomType );
        console.log( JSON.stringify( setting ) );
        return setting ? setting.price : 0;
    }

    // recieve list of matching rate settings
    // return the latest one for same room type, or latest default if no rate for room type configured
    getRate( settings, bookingProp ) {
        let setting, settingDefault;
        for (const s of settings) {
            if ( s.roomType == bookingProp.roomType ) {
                // same room type
                if ( !setting || setting.id < s.id ) {
                    setting = s;
                }
            } else {
                // default
                if ( !settingDefault || settingDefault.id < s.id ) {
                    settingDefault = s;
                }
            }
        }

        console.log('-- matching settings --');
        console.log(JSON.stringify(settings));
        console.log('-- by room type --');
        console.log(JSON.stringify(setting));
        console.log('-- default --');
        console.log(JSON.stringify(settingDefault));
        
        return setting ? setting.rate : settingDefault ? settingDefault.rate : 0;
    }

    getCapacityRate( bookingProp ) {
        const param = {
            guestCount: bookingProp.guestCount,
            roomType: bookingProp.roomType,
            defaultRoomType: this.defaultRoomType,
        };
        function filter(e) {
            return e.guestCount == this.guestCount && (e.roomType == this.roomType || e.roomType == this.defaultRoomType);
        }
        const settings = this.guestTypeControllerData.filter( filter, param );
        return this.getRate( settings, bookingProp );
    }

    getGuestTypeRate( bookingProp ) {
        // find all matching settings for selected room type and default room type
        const param = {
            guestType: bookingProp.guestType,
            roomType: bookingProp.roomType,
            defaultRoomType: this.defaultRoomType,
        };
        function filter(e) {
            return e.guestType == this.guestType && (e.roomType == this.roomType || e.roomType == this.defaultRoomType);
        }
        const settings = this.guestTypeControllerData.filter( filter, param );
        return this.getRate( settings, bookingProp );
    }

    getTermRate( bookingProp ) {
        // find all matching settings for selected room type and default room type
        const startDate = new Date( bookingProp.startDate );
        const endDate = new Date( bookingProp.endDate );
        const weekday = WEEKDAYS[ startDate.getDay() ].value;
        const term = (endDate.getTime() - startDate.getTime())/(1000*60*60*24);
        const param = {
            term: term,
            weekday: weekday,
            roomType: bookingProp.roomType,
            defaultRoomType: this.defaultRoomType,
        };
        console.log('-- filtering parameters --');
        console.log(JSON.stringify(param));

        function filter(e) {
            if ( e.roomType != this.roomType && e.roomType != this.defaultRoomType ) return false;
            if ( !e.weekday.includes( this.weekday ) ) return false;
            if ( e.term < this.term ) return false;
            return  true;
        }
        const settings = this.termControllerData.filter( filter, param );

        // custom logic. now we need to find matching setting with the lowest term
        // for example, if we have 5 day term and settings for 6 days and 999 days,
        // we should use 6 day setting

        let setting, settingDefault;
        for (const s of settings) {
            if ( s.roomType == bookingProp.roomType ) {
                // same room type
                if ( !setting || ( setting.id < s.id && setting.term > s.term ) ) {
                    setting = s;
                }
            } else {
                // default
                if ( !settingDefault || ( settingDefault.id < s.id && settingDefault.term > s.term ) ) {
                    settingDefault = s;
                }
            }
        }

        console.log('-- matching settings --');
        console.log(JSON.stringify(settings));
        console.log('-- by room type --');
        console.log(JSON.stringify(setting));
        console.log('-- default --');
        console.log(JSON.stringify(settingDefault));
        
        return setting ? setting.rate : settingDefault ? settingDefault.rate : 0;
    }

    getPeriodRate( bookingProp ) {
        // calc rates for each day of period, take average
        const startDate = Date.parse( bookingProp.startDate );
        const endDate = Date.parse( bookingProp.endDate );
        return 0;
        // const param = {
        //     startDate: startDate,
        //     endDate: endDate,
        //     roomType: bookingProp.roomType,
        //     defaultRoomType: this.defaultRoomType,
        // };
        // function filter(e) {
        //     if ( e.roomType != this.roomType && e.roomType != this.defaultRoomType ) return false;
        //     if ( Date.parse( e.startDate ) < this.startDate ) return false;
        //     if ( Date.parse( e.endDate ) > this.endDate ) return false;
        //     return  true;
        // }
        // const settings = this.periodControllerData.filter( filter, param );
        // return this.getRate( settings, bookingProp );
    }

    getPrice( bookingProp ) {

        // get basic price
        console.log( '-- basic price --' );
        let price = parseFloat( this.getBasicPrice( bookingProp ) );
        let rate = 0;

        // get capacity rate
        console.log( '-- capacity rate --' );
        rate = parseFloat( this.getCapacityRate( bookingProp ) );
        price = price * ( 1 + rate );

        // get guest type rate
        console.log( '-- guest type rate --' );
        rate = parseFloat( this.getGuestTypeRate( bookingProp ) );
        price = price * ( 1 + rate );

        // get term rate
        console.log( '-- term rate --' );
        rate = parseFloat( this.getTermRate( bookingProp ) );
        price = price * ( 1 + rate );

        // get period rate
        console.log( '-- period rate --' );
        rate = parseFloat( this.getPeriodRate( bookingProp ) );
        price = price * ( 1 + rate );

        // return result
        return price.toFixed(2);
    }

    handleCalculate( event ) {

        console.log( '-- booking prop --' );
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