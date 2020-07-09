public with sharing class MultilineCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, AccountId.Name, CloseDate, StageName
            FROM Opportunity
         ];
    }
}
