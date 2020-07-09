@isTest
public with sharing class TestInlineEditCtrl {

    @isTest public static void checkGetAccounts_Positive() {
    
        List<Account> account = new List<Account>();
        account.add(new Account(Name = 'Test corp.'));
        insert account;
                    
        Test.startTest();
        List<Account> returned = InlineEditCtrl.getAccounts();
        Test.stopTest();

        List<Account> expected = [SELECT Id, Name FROM Account];
                
        System.assertEquals(expected, returned, 'check');

    }

    @isTest public static void checkGetAccounts_Negative() {
    
        Test.startTest();
        List<Account> returned = InlineEditCtrl.getAccounts();
        Test.stopTest();

        List<Account> expected = [SELECT Id, Name FROM Account];
                
        System.assertEquals(expected, returned, 'check');

    }

    @isTest public static void checkUpdateField_Positive() {
           
        Account account = new Account(Name = 'Test', Rating = 'Hot');
        insert account;
        Account updatedAccount = new Account(Id = account.Id, Name = 'Updated', Rating = 'Cold');
        
        Test.startTest();
        Account returned = InlineEditCtrl.updateField(updatedAccount);
        Test.stopTest();

        Account expected = [SELECT Name, Rating FROM Account];
        System.assertEquals(expected, returned, 'check');
    }

    @isTest public static void checkUpdateField_Negative() {
           
        Account account = new Account(Name = 'Test', Rating = 'Hot');
        insert account;
        Account updatedAccount = new Account(Id = account.Id, Name = 'Updated', Rating = 'Cold');
        
        Test.startTest();
        Account returned = InlineEditCtrl.updateField(updatedAccount);
        Test.stopTest();

        Account expected = [SELECT Name, Rating FROM Account];
        System.assertNotEquals(account, returned, 'check');
    }

    @isTest public static void checkDeleteAccount_Positive() {

        List<Account> account = new List<Account>();
        account.add(new Account(Name = 'Test', Rating = 'Hot'));
        insert account;
               
        Test.startTest();
        InlineEditCtrl.deleteAccount(account[0].Id);
        Test.stopTest();
       
        List<Account> checkedAccount = [SELECT Name, Rating FROM Account WHERE Name LIKE 'Test' AND Rating LIKE 'Hot'];
                
        System.assert(checkedAccount.size() == 0, 'checkedAccount == null');

    }

    @isTest public static void checkDeleteAccount_Negative() {

        List<Account> account = new List<Account>();
        account.add(new Account(Name = 'Test', Rating = 'Hot'));
        insert account;
               
        Test.startTest();
        InlineEditCtrl.deleteAccount('0032x000004fCDmAAM');
        Test.stopTest();
       
        List<Account> checkedAccount = [SELECT Name, Rating FROM Account WHERE Name LIKE 'Test' AND Rating LIKE 'Hot'];
                
        System.assertEquals(account, checkedAccount);

    }

    @isTest public static void checkPickList_Positive() {
 
        Map<String, String> hot = new Map<String, String>();
        hot.put('label', 'Hot');
        hot.put('value', 'Hot');

        Map<String, String> warm = new Map<String, String>();
        warm.put('label', 'Warm');
        warm.put('value', 'Warm');

        Map<String, String> cold = new Map<String, String>();
        cold.put('label', 'Cold');
        cold.put('value', 'Cold');
    
        List<Map<String, String>> expectedOptions = new List<Map<String, String>>();
        expectedOptions.add(hot);
        expectedOptions.add(warm);
        expectedOptions.add(cold);

        Test.startTest();
        List<Map<String, String>> actualOptions = InlineEditCtrl.getPickListValues();
        Test.stopTest();

        System.assertEquals(expectedOptions, actualOptions);
     }

     @isTest public static void checkPickList_Negative() {
 
        Map<String, String> hot = new Map<String, String>();
        hot.put('label', 'Test');
        hot.put('value', 'Test');

        Map<String, String> warm = new Map<String, String>();
        warm.put('label', 'Test');
        warm.put('value', 'Test');

        Map<String, String> cold = new Map<String, String>();
        cold.put('label', 'Test');
        cold.put('value', 'Test');
    
        List<Map<String, String>> expectedOptions = new List<Map<String, String>>();
        expectedOptions.add(hot);
        expectedOptions.add(warm);
        expectedOptions.add(cold);

        Test.startTest();
        List<Map<String, String>> actualOptions = InlineEditCtrl.getPickListValues();
        Test.stopTest();

        System.assertNotEquals(expectedOptions, actualOptions);
     }

}