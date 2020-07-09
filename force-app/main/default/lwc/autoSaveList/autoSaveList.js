import { LightningElement, api } from 'lwc';
import recordField from '@salesforce/apex/AutoSaveCtrl.recordField';
import { NavigationMixin } from 'lightning/navigation';

export default class AutoSaveList extends NavigationMixin (LightningElement) {

    @api lead;
    chosenValue = '';

    handleDataChanges(event) {
        this.chosenValue = event.target.dataset.id;
        console.log("event=>" + JSON.stringify(this.chosenValue));
        let lead  = { 'sobjectType': 'Lead' };
        lead.Id = this.chosenValue;
        lead.Phone = this.template.querySelector('[data-element="Phone"]').value;
        lead.Title = this.template.querySelector('[data-element="Title"]').value;
        
        recordField({ newRecord: lead })
            .then(result => {
                this.recordId = result;
                console.log("DB=>" + JSON.stringify(result));
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });
    }

    navigateToLead(event){
        const leadId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: leadId,
                objectApiName: 'Lead',
                actionName: 'view'
            }
        });
    }

}