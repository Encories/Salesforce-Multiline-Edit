public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads (String searchName){
        List<List<sObject>> searchList = [FIND :searchName IN ALL FIELDS 
                   RETURNING Lead(FirstName,LastName),Contact(FirstName,LastName)];

        return searchList;
    }

}