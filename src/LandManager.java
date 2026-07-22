import java.util.ArrayList;

public class LandManager {

    private ArrayList<LandRecord> lands=new ArrayList<>();


    public void addLand(LandRecord land){

        lands.add(land);

    }


    public void displayAllLands(){

        for(LandRecord l:lands){
            System.out.println(l);
        }

    }

}