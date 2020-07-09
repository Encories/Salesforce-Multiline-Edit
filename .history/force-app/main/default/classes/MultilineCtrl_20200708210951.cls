public with sharing class MultilineCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, AccountId, CloseDate, StageName
            FROM Opportunity
         ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Rating
            FROM Account
         ]; 
    }

}
