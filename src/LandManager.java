import java.util.ArrayList;

public class LandManager {

    private final ArrayList<LandRecord> lands = new ArrayList<>();


    public void addLand(LandRecord land){
        if (land == null) {
            throw new IllegalArgumentException("Land record cannot be null.");
        }
        lands.add(land);

    }


    public void displayAllLands(){

        for(LandRecord l:lands){
            System.out.println(l);
        }

    }

}
