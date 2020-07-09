import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/InlineEditCtrl.getAccounts';
import updateField from '@salesforce/apex/InlineEditCtrl.updateField';
import deleteAccount from '@salesforce/apex/InlineEditCtrl.deleteAccount';

export default class InlineEdit extends LightningElement {

    accounts;
    wiredAccountsResult;
    inputId;
    accountId;
    currentAccountId;
    currentEditId;
    currentValue;
    previousValue;

    @api account;

    @wire(getAccounts, {})
    wiredGetAccounts(result) {
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

    editField(event) {
        this.setDisableOnButtons(true);
        const inputId = event.target.dataset.inputid;
        console.log('const inputId' + inputId);
        const inputIdName = this.template.querySelector('lightning-input[data-editid="' + inputId + '"]');
        inputIdName.classList.toggle("slds-hidden");
        inputIdName.focus();
        this.currentValue = event.target.dataset.accountname;
    }

    hideEditField(event) {
        const editId = event.target.dataset.editid;
        let editField = this.template.querySelector('lightning-input[data-editid="' + editId + '"]');
        editField.classList.toggle("slds-hidden");
        const newValue = event.target.value;
        console.log('newValue=>' + newValue);
        const accountId = event.target.dataset.accountid;
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

    setDisableOnButtons(value) {
        let buttons = this.template.querySelectorAll('button[data-buttonid="id"]');
        buttons.forEach(function (button) {
            button.disabled = value;
        });
    }

    handleDataChanges(event) {
        let accountToUpdate;
        const currentAccount = this.currentAccountId;
        let updatedAccounts = this.accounts;
        for (let i = 0; i < updatedAccounts.length; i++) {
            if (updatedAccounts[i].Id === currentAccount) {
                accountToUpdate = updatedAccounts[i];
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
/*
    showButton(event){
        console.log(event.type);
     //   if (event.type == "mouseover") {
            const inputId = event.target.dataset.tdid;
            if(inputId){
                console.log('const inputId' + inputId);
                this.template.querySelector('button[data-inputid="' + inputId + '"]').classList.remove("slds-hidden");
     //       }
        }
    }

    hideButton(event){
        console.log(event.type);
      //  if (event.type == "mouseout") {
            const inputId = event.target.dataset.tdid;
            if(inputId){
                console.log('const inputId' + inputId);
                this.template.querySelector('button[data-inputid="' + inputId + '"]').classList.add("slds-hidden");
            }
    //    }
    }
*/
    deleteField(event) {
        const deleteId = event.target.dataset.accountid;
        console.log("deleteId=>" + deleteId);
        deleteAccount({
            id: deleteId
        })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
                this.setDisableOnButtons(false);
                return refreshApex(this.wiredAccountsResult);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    //!!!!!!!!!!!!!!!!!!!!!!
    clickedEditPickListIcon(event) {
        this.setDisableOnButtons(true);
        let tableTds = this.template.querySelectorAll('td[data-tds="tabletds"]');
        this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.add("slds-hidden");
        const accountId = event.target.dataset.accountid;
        this.template.querySelector('tr[data-trid="' + accountId + '"] c-inline-edit-list').clickedEditPickListIcon();
    }

    setDisabledFalse() {
        let buttons = this.template.querySelectorAll('button[data-buttonid="id"]');
        buttons.forEach(function (button) {
            button.disabled = false;
        });
    }

    reRenderAccounts(event) {
        const accountFromChild = event.detail;
        this.accounts = this.accounts.map(function (account) {
            if (account.Id === accountFromChild.Id) {
                account.Rating = accountFromChild.Rating;
            }
            return account;
        });
        this.template.querySelector('td[data-tdid="' + accountFromChild.idRating + '"]').style.backgroundColor = "#FAFFBD";
        this.template.querySelector('div[data-buttonsid="cancelSave"]').classList.toggle("slds-hidden");
        this.currentEditId = accountFromChild.idRating;
        this.currentAccountId = accountFromChild.Id;
    }

    cancel() {
        eval("$A.get('e.force:refreshView').fire();");
        this.setDisableOnButtons(false);
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