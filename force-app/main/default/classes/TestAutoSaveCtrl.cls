@isTest
public with sharing class TestAutoSaveCtrl {
    @isTest public static void checkGetContacts_Positive() {
    
        List<Contact> contact = new List<Contact>();
        contact.add(new Contact(FirstName = 'Mary', LastName = 'Janee'));
        insert contact;
                    
        Test.startTest();
        List<Contact> returned = AutoSaveCtrl.getContacts();
        Test.stopTest();

        List<Contact> expected = [SELECT Id FROM Contact];
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkGetContacts_Negative() {

        Test.startTest();
        List<Contact> returned = AutoSaveCtrl.getContacts();
        Test.stopTest();

        List<Contact> expected = [SELECT Id FROM Contact];
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkGetLeads_Positive() {
           
        List<Lead> lead = new List<Lead>();
        lead.add(new Lead(Title = 'Test', Phone = '123', Lastname = 'Test', Company = 'Test'));
        insert lead;
                    
        Test.startTest();
        List<Lead> returned = AutoSaveCtrl.getLeads();
        Test.stopTest();

        List<Lead> expected = [SELECT Id, Name, Title, Phone FROM Lead];
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkGetLeads_Negative() {

        Test.startTest();
        List<Lead> returned = AutoSaveCtrl.getLeads();
        Test.stopTest();

        List<Lead> expected = [SELECT Id, Name, Title, Phone FROM Lead];
        System.assertEquals(expected, returned, 'check');
    }
/*
    @isTest public static void checkUpdateRecord_Positive() {
           
        List<Lead> lead = new Lead(Title = 'Test', Phone = '123', Lastname = 'Test', Company = 'Test');
        insert lead;
        List<Lead> updatedLead = new Lead(Id = lead[0].Id, 
                                    Title = 'Updated', 
                                    Phone = '321', 
                                    Lastname = 'Test', 
                                    Company = 'Test');
        
        Test.startTest();
        List<Lead> returned = AutoSaveCtrl.recordField(updatedLead);
        Test.stopTest();

        List<Lead> expected = [SELECT Id, Name, Title, Phone FROM Lead];
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkUpdateRecord_Negative() {
        
        List<Lead> lead = new Lead(Title = 'Test', Phone = '123', Lastname = 'Test', Company = 'Test');
        insert lead;
        List<Lead> updatedLead = new Lead(Id = lead[0].Id, 
                                    Title = 'Updated', 
                                    Phone = '321', 
                                    Lastname = 'Test', 
                                    Company = 'Test');
        
        Test.startTest();
        List<Lead> returned = AutoSaveCtrl.recordField(updatedLead);
        Test.stopTest();

        System.assertNotEquals(lead, returned, 'check');
    }
*/
}