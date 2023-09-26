import { LightningElement } from 'lwc';
import insertRandomContacts from '@salesforce/apex/createContact.insertRandomContacts';

export default class ContactCreation extends LightningElement {

    insertContacts() {
        insertRandomContacts()
            .then(result => {
                console.log('Contacts inserted successfully:', result);
            })
            .catch(error => {
                console.error('Error inserting contacts:', error);
            });
    }
}
