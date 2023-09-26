public with sharing class createContact {
    public static void insertRandomContacts() {
        List<Contact> contactsToInsert = new List<Contact>();
        
        for (Integer i = 0; i < 50; i++) {
            Contact newContact = new Contact();
            newContact.FirstName = 'ContactFirst' + i;
            newContact.LastName = 'ContactLast' + i;
            newContact.Email = 'contact' + i + '@example.com';
            contactsToInsert.add(newContact);
        }
        
        if (!contactsToInsert.isEmpty()) {
            insert contactsToInsert;
        }
    }
    
}