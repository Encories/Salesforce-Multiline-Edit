@isTest
public class TestVerifyDate {
    @isTest public static void CheckDates(){
        Date date1=system.today();
        Date date2=system.today().addDays(50);
        Date dt = VerifyDate.CheckDates(date1, date2);
        System.assertEquals(date2, dt);
    }
    
}