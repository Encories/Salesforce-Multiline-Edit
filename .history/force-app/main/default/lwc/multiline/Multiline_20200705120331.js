import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/MultilineCtrl.getOpportunities';

export default class Multiline extends LightningElement {

    opportunities;

    @wire(getOpportunities, {})
    wiredgetOpportunities(result) {
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