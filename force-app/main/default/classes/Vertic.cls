public with sharing class Vertic {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String name) {
        name = name + '%';
        return [
            SELECT Id, FirstName, LastName, Email, Account.Name, AccountId, MobilePhone, CreatedDate
            FROM Contact
            WHERE Name LIKE :name
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=false)
    public static Contact recordField (Contact newRecord) { 
        insert newRecord;
        System.debug('newRecord=>' +  newRecord);
        return newRecord;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name
            FROM Account
        ];
    }

    @AuraEnabled
    public static void deleteContacts(Id id) {

        List<Contact> contact =  [SELECT Id, Name FROM Contact WHERE Id = :id];
        try {
            delete contact;
        } catch(Exception e) {
            System.debug(e);
        }
    }
    
    
}