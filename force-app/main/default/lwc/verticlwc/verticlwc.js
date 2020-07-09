/*import { LightningElement, api, wire} from 'lwc';
//import getContacts from '@salesforce/apex/VerticLwcCtrl.getContacts'
/** The delay used when debouncing event handlers before invoking Apex. */
/*const DELAY = 300;

export default class VerticLWC extends LightningElement {

    contacts;
    name = '';

 /*   @wire(getContacts, { name: '$name'})
    wiredGetContacts(result) { // {error, data}
        
        const { error, data } = result;
        if (data) {
            this.contacts = data;
        } else if (error) {
            console.log('ERROR--we could not get the Accounts from database.');
            this.error = error;
        }
    }

    filterByName(event) {

        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.name = this.template.querySelector('[data-element="search-name"]').value;
        }, DELAY);
    }

    // //The method to search without button (onchange="handleKeyChange")
    // handleKeyChange(event) {
       
    //     window.clearTimeout(this.delayTimeout);
    //     const searchKey = event.target.value;
    //     this.delayTimeout = setTimeout(() => {
    //         this.name = searchKey;
    //     }, DELAY);
    // }
}*/