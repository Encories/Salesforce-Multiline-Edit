import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/MultilineCtrl.getOpportunities';

export default class Multiline extends LightningElement {

    opportunities;
    wiredOpportunitiesResult;
    currentValue;
    inputId;

    @wire(getOpportunities, {})
    wiredgetOpportunities(result) {
        this.wiredOpportunitiesResult = result;
        if (result.data) {
            this.opportunities = deepCopy(result.data);
            for (let i = 0; i < this.opportunities.length; i++) {
                this.opportunities[i].idName = this.opportunities[i].Id + 'Name';
                this.opportunities[i].idRating = this.opportunities[i].Id + 'Rating';
            }
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.opportunities = undefined;
        } console.log("result==>" + JSON.stringify(this.opportunities));
    }

    editField(event) {
        const inputId = event.target.dataset.inputid;
        console.log('const inputId' + inputId);
        const inputIdName = this.template.querySelector('lightning-input[data-editid="' + inputId + '"]');
        inputIdName.classList.toggle("slds-hidden");
        inputIdName.focus();
        this.currentValue = event.target.dataset.opportunityname;
        console.log('currentValue' + this.currentValue);
    }

    onFocusOut(event) {
        const editId = event.target.dataset.editid;
        let editField = this.template.querySelector('lightning-input[data-editid="' + editId + '"]');
        editField.classList.toggle("slds-hidden");
        const newValue = event.target.value;
        console.log('newValue=>' + newValue);
        const accountId = event.target.dataset.opportunityid;
        const isEqual = (this.currentValue === newValue);
               
        if (!isEqual) {
            
            this.accounts = this.accounts.map(function(account) {			
                 if (account.Id === accountId) {
                     account.Name = newValue;
                 }	
                 return account; 	
            });
        this.template.querySelector('td[data-tdid="' + editId + '"]').style.backgroundColor = "#FAFFBD";
        this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        this.currentAccountId = accountId;
        this.currentEditId = editId;
        this.setDisableOnButtons(true);
    }else {
        this.setDisableOnButtons(false);

    }

}



}


function deepCopy(obj) {
    if (Object(obj) !== obj) {
        return obj;
    }
    if (obj instanceof Set) {
        return new Set(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (typeof obj === 'function') {
        return obj.bind({});
    }
    if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            obj2.push(deepCopy(obj[i]));
        }
        return obj2;
    }
    const result = Object.create({});
    let keys = Object.keys(obj);
    if (obj instanceof Error) {
        keys = Object.getOwnPropertyNames(obj);
    }
    const len = keys.length;
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
    }
    return result;
}