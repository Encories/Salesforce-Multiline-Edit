public class AccountHandler {
    public static Account insertNewAccount(String name){
        Account user = new Account(Name=name); 
        try {
          
        insert user;
            
} catch (DmlException e) {
    return null;
}
 return user;      

        
    }


}