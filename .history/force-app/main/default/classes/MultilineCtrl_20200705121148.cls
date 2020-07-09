public with sharing class MultilineCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, Account.Name, CloseDate, StageName
            FROM Opportunity
         ];
    }
}
