public with sharing class InlineEditCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Rating
            FROM Account
         ];
    }

    @AuraEnabled
    public static Account updateField (Account updatedAccount) { 
        try {
            update updatedAccount;
         } catch(Exception e) {
            System.debug('something went wrong=>' + e);
         }
        return updatedAccount;
       
    }

    @AuraEnabled
    public static void deleteAccount(Id id) {
        List<Account> account =  [SELECT Id, Name FROM Account WHERE Id = :id];
        try {
            delete account;
        } catch(Exception e) {
            System.debug(e);
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getPickListValues() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        List<Schema.PicklistEntry> ratingPickList = Account.Rating.getDescribe().getPicklistValues();
        for (Schema.PicklistEntry entry :ratingPickList) {
            if (entry.isActive() == true) {
                options.add(new Map<String, String>{'label' => entry.getLabel(), 'value' => entry.getValue()});
            }
        }
        return options;
    }
}