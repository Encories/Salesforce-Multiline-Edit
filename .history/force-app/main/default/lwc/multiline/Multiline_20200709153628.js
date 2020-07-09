import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import getOpportunities from '@salesforce/apex/MultilineCtrl.getOpportunities';
import updateField from '@salesforce/apex/MultilineCtrl.updateField';
//import getAccounts from '@salesforce/apex/MultilineCtrl.getAccounts';

const DELAY = 300;
export default class Multiline extends NavigationMixin (LightningElement) {

    opportunities;
    wiredOpportunitiesResult;
    currentValue;
    inputId;
    currentOpportunityId = [];
    currentEditId;
    account;
    

    @api opportunity;

    @wire(getOpportunities, {})
    wiredgetOpportunities(result) {
        this.wiredOpportunitiesResult = result;
        if (result.data) {
            this.opportunities = deepCopy(result.data);
            for (let i = 0; i < this.opportunities.length; i++) {
                this.opportunities[i].idName = this.opportunities[i].Id + 'Name';
                this.opportunities[i].idStage = this.opportunities[i].Id + 'Stage';
                this.opportunities[i].idDate = this.opportunities[i].Id + 'Date';
                this.opportunities[i].idAccount = this.opportunities[i].Id + 'Account';
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

    editDate(event) {
        const inputId = event.target.dataset.inputid;
        console.log('const inputId' + inputId);
        const inputIdName = this.template.querySelector('lightning-input[data-editid="' + inputId + '"]');
        inputIdName.classList.toggle("slds-hidden");
        inputIdName.focus();
        this.currentValue = event.target.dataset.opportunitydate;
        console.log('currentValue' + this.currentValue);
    }

    editAccount(event) {
        const inputId = event.target.dataset.inputid;
        console.log('const inputId' + inputId);
        const inputIdName = this.template.querySelector('div[data-editid="' + inputId + '"]');
        inputIdName.classList.toggle("slds-hidden");
        inputIdName.focus();
        this.currentValue = event.target.dataset.opportunitydate;
        console.log('currentValue' + this.currentValue);
    }

    editPickList(event) {
        let tableTds = this.template.querySelectorAll('td[data-tds="tabletds"]');
        if(!this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.contains("slds-hidden")){
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        }
        const opportunityId = event.target.dataset.opportunityid;
        this.template.querySelector('tr[data-trid="' + opportunityId + '"] c-multiline-list').editPickList();
    }

    setOpportunity(event) {
        const opportunityPickList = event.detail;
        console.log('opportunityPickList' + JSON.stringify(opportunityPickList));
        this.opportunities = this.opportunities.map(function (opportunity) {
            if (opportunity.Id === opportunityPickList.Id) {
                opportunity.StageName = opportunityPickList.StageName;
            }
            console.log('opportunity' + JSON.stringify(opportunity));
            return opportunity;
        });
        this.template.querySelector('td[data-tdid="' + opportunityPickList.idStage + '"]').style.backgroundColor = "#FAFFBD";
        if(this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.contains("slds-hidden")){
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        }
        this.currentEditId = opportunityPickList.idStage;
        this.currentOpportunityId = opportunityPickList.Id;
    }

    setAccount(event) {
        const selectedAccount = event.detail.Id;
        console.log('selectedAccount+' + JSON.stringify(event.detail));
        console.log('selectedAccount++' + JSON.stringify(event.target.dataset.opportunityacctid));
        this.opportunities = this.opportunities.map(function (opportunity) {
            if (opportunity.Id === event.target.dataset.opportunityacctid) {
                opportunity.AccountId = selectedAccount;
            }
          //  console.log('opportunity++' + JSON.stringify(opportunity));
            return opportunity;
        });
        const editid = event.target.dataset.editid;
        this.template.querySelector('div[data-editid="' + editid + '"]').classList.toggle("slds-hidden");
                
      //  this.template.querySelector('td[data-tdid="' + selectedAccount.idAccount + '"]').style.backgroundColor = "#FAFFBD";
        if(this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.contains("slds-hidden")){
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        }
       // this.currentEditId = opportunityPickList.idStage;
        this.currentOpportunityId = event.target.dataset.opportunityid; 
    }

    

    onFocusOut(event) {
        const editId = event.target.dataset.editid;
        console.log('editId=>' + editId);
        let editField = this.template.querySelector('lightning-input[data-editid="' + editId + '"]');
        editField.classList.toggle("slds-hidden");
        
        
        const newValue = event.target.value;
        console.log('newValue=>' + JSON.stringify(event.target));
        const opportunityId = event.target.dataset.opportunityid;
        const isEqual = (this.currentValue === newValue);
               
        if (!isEqual) {
            
            this.opportunities = this.opportunities.map(function(opportunity) {			
                 if (opportunity.Id === opportunityId) {
                     if(editId.includes('Name')){
                        opportunity.Name = newValue;
                     } else if(editId.includes('Date')){
                        opportunity.CloseDate = newValue;
                     } else if(editId.includes('Account')){
                        opportunity.AccountId = newValue;
                     }
                  }	
                 return opportunity; 	
            });
        this.template.querySelector('td[data-tdid="' + editId + '"]').style.backgroundColor = "#FAFFBD";
        if(this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.contains("slds-hidden")){
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        }
      //  this.currentOpportunityId.push(opportunityId);
        console.log('currentOpportunityId' + this.currentOpportunityId);
        this.currentOpportunityId = opportunityId;
        this.currentEditId = editId;
        
    }else {
      //  this.setDisableOnButtons(false);

        }

    }

saveChanges(event) {
    let opportunityToUpdate = [];
    const currentOpportunity = this.currentOpportunityId;
    let updatedOpportunities = this.opportunities;
   /* for (let i = 0; i < updatedOpportunities.length; i++) {
        if (updatedOpportunities[i].Id === currentOpportunity) {
            opportunityToUpdate.push(updatedOpportunities[i]);
            break;
        }
    }*/
    
    console.log("opportunityToUpdate==>" + JSON.stringify(opportunityToUpdate));
    updateField({ updatedOpportunity: updatedOpportunities })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Is Updated',
                    variant: 'success',
                }),
            );
            let fields = this.template.querySelectorAll('td');
            fields.forEach(function (field) {
                field.style.backgroundColor = "white";
            });
            this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
            refreshApex(this.wiredOpportunitiesResult);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error on data save.',
                    message: 'Error on account update.' + error,
                    variant: 'error',
                }),
            );
        });
  
    }

    cancelChanges() {
        eval("$A.get('e.force:refreshView').fire();");
    }

    navigateToOpportunity(event){
        var opportunityId = event.target.dataset.opportunityId;
        console.log("opportunityId==>" + JSON.stringify(opportunityId));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: opportunityId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
    }

/*
    search = '';
    error;

    selectedAccount;
    showAccountsListFlag = false;

    @wire(getAccounts, { searchText: '$search' })
    accounts;

    handleKeyUp(event) {
        if (!this.showAccountsListFlag) {
            
            this.showAccountsListFlag = true;
            this.template
                .querySelector('.accounts_list')
                .classList.remove('slds-hide');
        }
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.search = searchKey;
        }, DELAY);
    }

    handleOptionSelect(event) {
        this.selectedAccount = event.currentTarget.dataset.name;
        this.template
            .querySelector('.selectedOption')
            .classList.remove('slds-hide');
        this.template
            .querySelector('.accounts_list')
            .classList.add('slds-hide');
        this.template
            .querySelector('.slds-combobox__form-element')
            .classList.add('slds-input-has-border_padding');
    }

    handleRemoveSelectedOption() {
        this.template
            .querySelector('.selectedOption')
            .classList.add('slds-hide');
        this.template
            .querySelector('.slds-combobox__form-element')
            .classList.remove('slds-input-has-border_padding');

        this.showAccountsListFlag = false;
    }

*/


    
    
    opportunity;
    
    contact;
     /*   setAccount(event) {
            var objectname = event.detail.ObjectName;
            if( objectname === "Account") {
                console.log('selectedAccount' + JSON.stringify(event.detail.Id));
                this.account = {Name : event.detail.Name, Id: event.detail.Id}
            }
            if( objectname === "Opportunity") {
                this.opportunity = {Name : event.detail.Name, Id: event.detail.Id}
            }
            if( objectname === "Contact") {
                this.contact = {Name : event.detail.Name, Id: event.detail.Id}
            }
        } */

        




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