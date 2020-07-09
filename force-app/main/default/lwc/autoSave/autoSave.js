import { LightningElement, wire, api } from 'lwc';
import getLeads from '@salesforce/apex/AutoSaveCtrl.getLeads';
import getContacts from '@salesforce/apex/AutoSaveCtrl.getContacts';

export default class AutoSave extends LightningElement {

    leads;
    contacts;
    wiredLeadsResult;
    wiredContactsResult;
 
    @api lead;
    @api contact;

    @wire(getLeads, {  })
    wiredGetLeads(result) {
        this.wiredLeadsResult = result;
        console.log("result==>" + JSON.stringify(result.data) );
        if (result.data) {
            this.leads = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.leads = undefined;
        }
    }

    @wire(getContacts, {  })
    wiredGetContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = deepCopy(result.data);
            for (let i = 0; i < this.contacts.length; i++) {
                this.contacts[i].idName = this.contacts[i].Id + 'Name'; 
            } 
            this.error = undefined;
         } else if (result.error) {
            this.error = result.error;
            this.contacts = undefined;
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