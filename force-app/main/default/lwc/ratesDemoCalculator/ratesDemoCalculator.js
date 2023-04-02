import { LightningElement, track } from 'lwc';

const ROOM_TYPES = [
    {label: 'Standard', value: 'standard'},
    {label: 'Luxury', value: 'luxury'},
];

export default class RatesDemoCalculator extends LightningElement {

    roomTypeSelected = ROOM_TYPES[0].value;
    guestCount = 1;
    startDate;
    endDate;
    @track bookingSummary;

    get roomTypes() {
        return ROOM_TYPES;
    }

    getBookingSummary() {
        return ''+
        'Room type = '+ROOM_TYPES.find( e => e.value == this.roomTypeSelected ).label+'; '+
        'Guests = '+this.guestCount+'; '+
        '';
    }

    handleChange( event ) {
        this[event.target.name] = event.target.value;
    }

    handleCalculate(event) {
        this.bookingSummary = this.getBookingSummary();
    }


}