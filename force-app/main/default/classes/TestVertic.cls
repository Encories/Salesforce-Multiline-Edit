@isTest
private class TestVertic {

    @isTest public static void checkGetContacts_Positive() {
    
        String firstName = 'Mary';
        String lastName = 'Janee';
       
       // insert newContact;
        List<Contact> contact = new List<Contact>();
        contact.add(new Contact(FirstName = firstName, LastName = lastName));
        insert contact;
                    
        Test.startTest();
        List<Contact> returned = Vertic.getContacts(firstName);
        Test.stopTest();

        List<Contact> expected = [SELECT FirstName, LastName, Email, Account.Name, AccountId, MobilePhone, CreatedDate FROM Contact WHERE FirstName LIKE :firstName];
                
        System.assertEquals(expected, returned, 'check');

    }

    @isTest public static void checkGetContacts_Negative() {

        String name = NULL;
              
        Test.startTest();
        List<Contact> returned = Vertic.getContacts(name);
        Test.stopTest();

        List<Contact> expected = [SELECT FirstName, LastName, Email, Account.Name, AccountId, MobilePhone, CreatedDate FROM Contact WHERE FirstName LIKE :name];
        
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkDeleteContact_Positive() {

        String firstName = 'Mary';
        String lastName = 'Janee';
       
       // insert newContact;
        List<Contact> contact = new List<Contact>();
        contact.add(new Contact(FirstName = firstName, LastName = lastName));
        insert contact;
        System.debug(' Contact contact--->'+json.serialize(contact));
       
        Test.startTest();
        Vertic.deleteContacts(contact[0].Id);
        Test.stopTest();
       
        List<Contact> checkedContact = [SELECT FirstName, LastName FROM Contact WHERE FirstName LIKE 'Mary' AND LastName LIKE 'Janee'];
                
        System.assert(checkedContact.size() == 0, 'checkedContact == null');

    }
    

    @isTest public static void checkDeleteContact_Negative() { 

        String id = '0032x000004fCDmAAM';
        String firstName = 'Mary';
        String lastName = 'Janee';
       
       // insert newContact;
        List<Contact> contact = new List<Contact>();
        contact.add(new Contact(FirstName = firstName, LastName = lastName));
        insert contact;
                    
        Test.startTest();
        Vertic.deleteContacts(id);
        Test.stopTest();

        List<Contact> checkedContact = [SELECT FirstName, LastName FROM Contact WHERE FirstName LIKE 'Mary' AND LastName LIKE 'Janee'];
        System.assertEquals(contact, checkedContact);
        
    }

    
    @isTest public static void recordField_Positive() {

        String firstName = 'Mary';
        String lastName = 'Janee';
       
       // insert newContact;
        Contact contact = new Contact(FirstName = firstName, LastName = lastName);
                       
        Test.startTest();
        Vertic.recordField(contact);
        Test.stopTest();
       
        Contact expectedContact = [SELECT FirstName, LastName FROM Contact WHERE FirstName LIKE 'Mary' AND LastName LIKE 'Janee'];
                
        System.assertEquals(expectedContact, contact);

    }

    @isTest public static void checkGetAccounts_Positive() {
    
        List<Account> account = new List<Account>();
        account.add(new Account(Name = 'Test corp.'));
        insert account;
                    
        Test.startTest();
        List<Account> returned = Vertic.getAccounts();
        Test.stopTest();

        List<Account> expected = [SELECT Id, Name FROM Account];
                
        System.assertEquals(expected, returned, 'check');

    }

}