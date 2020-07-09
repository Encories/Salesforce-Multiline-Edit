import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class ContactsList extends NavigationMixin (LightningElement) {
    @api contact;

    navigateToContact(event){
        var contactId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: contactId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }
    
}