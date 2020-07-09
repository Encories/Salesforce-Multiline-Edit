public with sharing class AutoSaveCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads() {
         return [
            SELECT Id, Name, Title, Phone
            FROM Lead
         ];
    }

    @AuraEnabled(cacheable=false)
    public static List<Lead> recordField (Lead newRecord) {  //updateField
        
        String id = newRecord.Id;
        String phone = newRecord.Phone;
        String title = newRecord.Title;
        
        List<Lead> recordForChange = [SELECT Id, Name FROM Lead WHERE Id = :id];
        recordForChange[0].Phone = phone;
        recordForChange[0].Title = title;
        if(!recordForChange.isEmpty()){
            update recordForChange;
            
        } else {
            System.debug('something went wrong=>' + recordForChange);
        }
        return recordForChange;
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, Name
            FROM Contact
        ];
    }

}