import { LightningElement, wire, api } from 'lwc';
import getOpportunities from '@salesforce/apex/MultilineCtrl.getOpportunities';

export default class Multiline extends LightningElement {

    opportunities;
    wiredOpportunitiesResult;
    currentValue;
    inputId;
    currentOpportunityId = [];
    currentEditId;

    @api opportunity;

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
        const opportunityId = event.target.dataset.opportunityid;
        const isEqual = (this.currentValue === newValue);
               
        if (!isEqual) {
            
            this.opportunities = this.opportunities.map(function(opportunity) {			
                 if (opportunity.Id === opportunityId) {
                    opportunity.Name = newValue;
                 }	
                 return opportunity; 	
            });
        this.template.querySelector('td[data-tdid="' + editId + '"]').style.backgroundColor = "#FAFFBD";
        this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        this.currentOpportunityId.push(opportunityId);
      // this.currentOpportunityId = opportunityId;
        this.currentEditId = editId;
        
    }else {
      //  this.setDisableOnButtons(false);

    }

}

saveChanges(event) {
    let accountToUpdate;
    const currentOpportunity = this.currentOpportunityId;
    let updatedOpportunities = this.opportunities;
    for (let i = 0; i < updatedOpportunities.length; i++) {
        if (updatedOpportunities[i].Id === currentOpportunity) {
            accountToUpdate = updatedOpportunities[i];
            break;
        }
    }
    console.log("accountToUpdate==>" + JSON.stringify(accountToUpdate));

    updateField({ updatedAccount: accountToUpdate })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Is Updated',
                    variant: 'success',
                }),
            );
            this.template.querySelector('td[data-tdid="' + this.currentEditId + '"]').style.backgroundColor = "white";
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
            refreshApex(this.wiredAccountsResult);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error on data save.',
                    message: 'Error on account update.',
                    variant: 'error',
                }),
            );
        });
    this.setDisableOnButtons(false);
}

cancelChanges() {
    eval("$A.get('e.force:refreshView').fire();");
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