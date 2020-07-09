import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class VerticList extends NavigationMixin (LightningElement)  {

    @api contact;
    @track isModalOpen = false;

    navigateToAccount(event){
        var accountId = event.target.dataset.accountId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    deleteContact(event) { 
        
        console.log("deleteContact=>" +  event.target.dataset.contactId);
        const contactId = event.target.dataset.contactId;
        this.dispatchEvent(new CustomEvent('rerendercontacts',{
            detail: contactId
        }));
        console.log('deleteContact=>' + contactId);
    }

    /* javaScipt functions start */
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

}