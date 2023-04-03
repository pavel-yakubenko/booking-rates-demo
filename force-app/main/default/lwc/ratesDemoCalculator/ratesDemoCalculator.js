import { LightningElement, track, api } from 'lwc';

export default class RatesDemoCalculator extends LightningElement {

    @api roomTypes;
    @api guestTypes;
    roomTypeSelected;
    guestTypeSelected;
    guestCount;
    startDate;
    endDate;
    guestType;
    @track bookingSummary;

    connectedCallback() {
        this.roomTypeSelected = this.roomTypes[0].value;
        this.guestTypeSelected = this.guestTypes[0].value;
    }

    getBookingSummary() {
        return '' +
        'Room type = ' + this.roomTypes.find( e => e.value == this.roomTypeSelected ).label + '; ' +
        'Guests = ' + this.guestCount + '; ' +
        'Period = ' + this.startDate + ' - ' + this.endDate +'; '+
        'Guest type = ' + this.guestTypes.find( e => e.value == this.guestTypeSelected ).label + '; ' +
        '';
    }

    handleChange( event ) {
        this[event.target.name] = event.target.value;
    }

    handleCalculate(event) {
        this.bookingSummary = this.getBookingSummary();
    }


}