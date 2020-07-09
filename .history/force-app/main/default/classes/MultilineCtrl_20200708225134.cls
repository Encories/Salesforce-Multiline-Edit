public with sharing class MultilineCtrl {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, AccountId, CloseDate, StageName
            FROM Opportunity
         ];
    }

    @AuraEnabled
    public static void  updateField (List<Opportunity> updatedOpportunity) { 
        try {
            
            for (Opportunity opportunity : updatedOpportunity) {
                update  opportunity;
                System.debug('number=>' + opportunity);
            }
           
         } catch(Exception e) {
            System.debug('something went wrong=>' + e);
         }
        System.debug('updatedOpportunity=>' + updatedOpportunity);
      //  return opportunity;
       
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getPickListValues() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        List<Schema.PicklistEntry> stagePickList = Opportunity.StageName.getDescribe().getPicklistValues();
        for (Schema.PicklistEntry entry :stagePickList) {
            if (entry.isActive() == true) {
                options.add(new Map<String, String>{'label' => entry.getLabel(), 'value' => entry.getValue()});
            }
        }
        return options;
    }

  /*  @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Rating
            FROM Account
         ]; 
    } */

    @AuraEnabled
    public static List<Object> getRecordsByName(String objectName, String searchFor) {
        String queryString = 'SELECT Id, Name FROM ';
        queryString += String.escapeSingleQuotes(objectName) + ' WHERE Name Like \'%' + String.escapeSingleQuotes(searchFor) + '%\'';
        return Database.query(queryString);
    }

}