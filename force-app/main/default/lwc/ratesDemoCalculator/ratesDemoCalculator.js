import { LightningElement, track, api } from 'lwc';

export default class RatesDemoCalculator extends LightningElement {

    @api roomTypes;
    @api guestTypes;
    roomTypeSelected;
    guestTypeSelected;
    guestCount;
    startDate;
    endDate;
    // guestType;
    @api bookingSummary;

    connectedCallback() {
        this.roomTypeSelected = this.roomTypes[0].value;
        this.guestTypeSelected = this.guestTypes[0].value;
    }

    getBookingProperties() {
        const prop = {
            roomType: this.roomTypeSelected,
            guestType: this.guestTypeSelected,
            guestCount: this.guestCount,
            startDate: this.startDate,
            endDate: this.endDate,
        };
        return prop;
    }

    handleChange( event ) {
        this[event.target.name] = event.target.value;
    }

    handleCalculate(event) {
        // send event to container with booking patam
        const detail = this.getBookingProperties();
        const calculateEvent = new CustomEvent(
            'calculate',
            { detail: detail }
        );
        this.dispatchEvent(calculateEvent);        
    }


}