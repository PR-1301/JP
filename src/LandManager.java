import java.util.ArrayList;
import java.io.*;

public class LandManager {

    private ArrayList<LandRecord> lands = new ArrayList<>();
    private final String FILE_NAME = "lands.dat";

    public LandManager() {
        loadData();
        if (lands.isEmpty()) {
            generateDummyData();
        }
    }

    private void generateDummyData() {
        String[] villages = {"Rampur", "Shampur", "Madhapur", "Kondapur", "Gachibowli"};
        String[] owners = {"Ramesh", "Suresh", "Mahesh", "Rajesh", "Kamlesh", "Mukesh", "Dinesh", "Ganesh"};
        
        for (int i = 1; i <= 100; i++) {
            String surveyNo = "SVY-" + (1000 + i);
            String owner = owners[i % owners.length] + " Kumar";
            String village = villages[i % villages.length];
            double area = 1.0 + (i % 10) * 0.5;
            
            lands.add(new LandRecord(surveyNo, owner, village, area));
        }
        saveData();
        System.out.println("Auto-generated 100 dummy land records.");
    }

    @SuppressWarnings("unchecked")
    private void loadData() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            lands = (ArrayList<LandRecord>) ois.readObject();
        } catch (FileNotFoundException e) {
            // File not found on first run, ignore
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading land records: " + e.getMessage());
        }
    }

    private void saveData() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(lands);
        } catch (IOException e) {
            System.out.println("Error saving land records: " + e.getMessage());
        }
    }

    public void addLand(LandRecord land){
        if (land == null) {
            throw new IllegalArgumentException("Land record cannot be null.");
        }
        lands.add(land);
        saveData();
    }

    public void displayAllLands(){
        if (lands.isEmpty()) {
            System.out.println("No land records found.");
            return;
        }
        for(LandRecord l:lands){
            System.out.println(l);
        }
    }
}
