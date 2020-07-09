import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/MultilineCtrl.getOpportunities';

export default class Multiline extends LightningElement {

    @wire(getOpportunities, {})
    wiredgetOpportunities(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = deepCopy(result.data);
            for (let i = 0; i < this.accounts.length; i++) {
                this.accounts[i].idName = this.accounts[i].Id + 'Name';
                this.accounts[i].idRating = this.accounts[i].Id + 'Rating';
            }
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        } console.log("result==>" + JSON.stringify(this.accounts));
    }



}