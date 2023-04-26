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

    @track bookingSummary;

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
            guestCount: parseInt(bookingProp.guestCount),
            roomType: bookingProp.roomType,
            defaultRoomType: this.defaultRoomType,
        };
        function filter(e) {
            return e.guestCount == this.guestCount && (e.roomType == this.roomType || e.roomType == this.defaultRoomType);
        }
        const settings = this.capacityControllerData.filter( filter, param );
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

        // console.log('-- matching settings --');
        // console.log(JSON.stringify(settings));
        // console.log('-- by room type --');
        // console.log(JSON.stringify(setting));
        // console.log('-- default --');
        // console.log(JSON.stringify(settingDefault));
        
        return setting ? setting.rate : settingDefault ? settingDefault.rate : 0;
    }

    getPeriodRate( bookingProp ) {
        // calc rates for each day of period, take average
        const startDate = Date.parse( bookingProp.startDate );
        const endDate = Date.parse( bookingProp.endDate );
        const dayLen = 1000*60*60*24;
        // list of booking dates 
        const days = [startDate];
        let nextDate = startDate + dayLen;
        while ( nextDate < endDate ) {
            days.push(nextDate);
            nextDate += dayLen;
        }

        // resulting rate to be calculated
        let rate = 0;
        // getting rate for each day
        for (const day of days) {
            const param = {
                date: day,
                roomType: bookingProp.roomType,
                defaultRoomType: this.defaultRoomType,
            };
            function filter(e) {
                if ( e.roomType != this.roomType && e.roomType != this.defaultRoomType ) return false;
                if ( Date.parse( e.startDate ) > this.date ) return false;
                if ( Date.parse( e.endDate ) < this.date ) return false;
                return  true;
            }
            const settings = this.periodControllerData.filter( filter, param );
            const curRate = parseFloat( this.getRate( settings, bookingProp ) );
            rate += curRate;
            console.log( 'rate for ' + new Date(day).toDateString() + ' = ' + curRate );
        }
        // return average rate
        console.log( 'rate for period = ' + (rate/days.length) );
        return (rate/days.length).toFixed(2);
    }

    getPrice( bookingProp ) {

        const startDate = new Date( bookingProp.startDate );
        const endDate = new Date( bookingProp.endDate );
        const term = (endDate.getTime() - startDate.getTime())/(1000*60*60*24);

        // get basic price
        console.log( '-- basic price --' );
        const basicPrice = parseFloat( this.getBasicPrice( bookingProp ) );


        // get capacity rate
        console.log( '-- capacity rate --' );
        const capacityRate = parseFloat( this.getCapacityRate( bookingProp ) );

        // get guest type rate
        console.log( '-- guest type rate --' );
        const guestTypeRate = parseFloat( this.getGuestTypeRate( bookingProp ) );

        // get term rate
        console.log( '-- term rate --' );
        const termRate = parseFloat( this.getTermRate( bookingProp ) );

        // get period rate
        console.log( '-- period rate --' );
        const periodRate = parseFloat( this.getPeriodRate( bookingProp ) );

        // price per night as basic price with all rates applied
        const pricePerNight = basicPrice*(1+capacityRate)*(1+guestTypeRate)*(1+termRate)*(1+periodRate);

        const bookingSummary = {};
        bookingSummary.basicPrice        = basicPrice.toFixed(2);
        bookingSummary.capacityRate      = (capacityRate*100).toFixed(2);
        bookingSummary.guestTypeRate     = (guestTypeRate*100).toFixed(2);
        bookingSummary.termRate          = (termRate*100).toFixed(2);
        bookingSummary.periodRate        = (periodRate*100).toFixed(2);
        bookingSummary.pricePerNight     = pricePerNight.toFixed(2);
        bookingSummary.nights            = term;
        bookingSummary.pricePerPeriod    = (pricePerNight*term).toFixed(2);

        // return result
        return bookingSummary;
    }

    handleCalculate( event ) {

        console.log( '-- booking prop --' );
        console.log( JSON.stringify( event.detail ) );

        const bookingProp = event.detail;

        const bookingSummary = this.getPrice( bookingProp );
        
        this.bookingSummary = bookingSummary;
    }

}