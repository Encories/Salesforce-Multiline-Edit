import { LightningElement, api, wire } from 'lwc';
import getPickListValues from '@salesforce/apex/MultilineCtrl.getPickListValues';
import { NavigationMixin } from 'lightning/navigation';

export default class MultilineList extends NavigationMixin (LightningElement) {

    @api opportunity;
    options = [];
    previousValue; // previous-value
    items = [];
    value = '';

    @api
    editPickList() {
        let topDiv = this.template.querySelector('div[data-topdiv="' + this.opportunity.Id + '"]');
        topDiv.classList.toggle("slds-hidden");
        let select = this.template.querySelector('select');
        select.focus();
        select.value = this.opportunity.StageName;
        this.previousValue = this.opportunity.StageName;
    }

    hidePickList() {
        let topDiv = this.template.querySelector('div[data-topdiv="' + this.opportunity.Id + '"]');
        topDiv.classList.toggle("slds-hidden");
        let select = this.template.querySelector('select');
        const isEqual = (this.previousValue === select.value);
        console.log('select.value' + select.value);

        if (isEqual) {
           // this.dispatchEvent(new CustomEvent('enableeditbuttons'));
        } else {
            this.opportunity.StageName = select.value;
            this.opportunity.previousValue = this.previousValue;
            console.log('this.opportunity' + JSON.stringify(this.opportunity));
            this.dispatchEvent(new CustomEvent('setopportunity', {
                detail: this.opportunity
            }));
        }
    }

    @wire(getPickListValues)
    getPickList({ error, data }) {
        if (data) {
            console.log("options+==>" + JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                this.options = [...this.options, { value: data[i].value, label: data[i].label }];
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

}