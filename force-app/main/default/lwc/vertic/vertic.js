import { LightningElement, wire, track, api } from 'lwc';
import getContacts from '@salesforce/apex/Vertic.getContacts';
import recordField from '@salesforce/apex/Vertic.recordField';
import getAccounts from '@salesforce/apex/Vertic.getAccounts';
import deleteContacts from '@salesforce/apex/Vertic.deleteContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const DELAY = 300;

export default class Vertic extends LightningElement {

    wiredContactsResult;
    contacts;
    name = '';

    @api recordId;
    @api contact;

    @track bShowModal = false;
    @track items = []; //this will hold key, value pair
    @track value = ''; //initialize combo box value

    @track chosenValue = '';

    @wire(getAccounts)
    wiredUserAccounts({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved controller
            //here value will be Id and label of combobox will be Name
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label: data[i].Name }];
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    //get options for dropdown list of Accounts
    get accountOptions() {
        return this.items;
    }

    filterByName(event) {
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.name = this.template.querySelector('[data-element="search-name"]').value;
        }, DELAY);
    }


    @wire(getContacts, { name: '$name' })
    wiredGetContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
            this.error = undefined;
            return refreshApex(this.wiredContactsResult); ///!!!!!!!!!!!
        } else if (result.error) {
            this.error = result.error;
            this.contacts = undefined;
        }
    }


    handleChange(event) { 
        // Get the string of the "value" attribute on the selected option
        this.chosenValue = event.detail.value;
    }

    addNewUser(event) {
        let contact = { 'sobjectType': 'Contact' };
        contact.FirstName = this.template.querySelector('[data-element="FirstName"]').value;
        contact.LastName = this.template.querySelector('[data-element="LastName"]').value;
        contact.Email = this.template.querySelector('[data-element="Email"]').value;
        contact.AccountId = this.chosenValue;
        contact.MobilePhone = this.template.querySelector('[data-element="MobilePhone"]').value;
        console.log("addNewUser=>" + contact.FirstName);

        recordField({ newRecord: contact })
            .then(result => {
                this.recordId = result;
                console.log(result);
                this.bShowModal = false;
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });

    }

    reRenderContacts(event) {
        const contactFromList = event.detail;
        console.log("contactFromList=>" + contactFromList);
        deleteContacts({
            id: contactFromList
        })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })

                );
                return refreshApex(this.wiredContactsResult);
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


    /* javaScipt functions start */
    openModal() {
        // to open modal window set 'bShowModal' tarck value as true
        this.bShowModal = true;
    }

    closeModal() {
        // to close modal window set 'bShowModal' tarck value as false
        this.bShowModal = false;
    }

}