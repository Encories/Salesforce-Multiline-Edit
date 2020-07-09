public with sharing class VerticLwcCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String name) {
        name = name + '%';
        return [
            SELECT FirstName, LastName, Email, Account.Name, AccountId, MobilePhone, CreatedDate
            FROM Contact
            WHERE Name LIKE :name
            ORDER BY Name
            LIMIT 10
        ];
    }
}