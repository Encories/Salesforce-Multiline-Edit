public class ContactSearch {
    public static List<Contact> searchForContacts(String lastName, String mailingPostalCode){
        
        List<Contact> accts = [SELECT Id, Name FROM Contact 
                           WHERE (LastName = :lastName AND MailingPostalCode = :mailingPostalCode)];
        
       
        return accts;
    }

}