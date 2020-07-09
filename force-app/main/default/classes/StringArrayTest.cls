public class StringArrayTest {
    
    public static String[] generateStringArray(Integer n){
        String[] myArray = new List<String>();
        List<String> info = new List<String>();

        for (Integer i=0;i<n;i++){
            info.add('Test ' + i);
        }

        return info;
    }

}