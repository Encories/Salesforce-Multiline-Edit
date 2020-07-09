public with sharing class MultilineCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, AccountId, CloseDate, StageName
            FROM Opportunity
         ];
    }
}
