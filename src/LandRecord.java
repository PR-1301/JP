public class LandRecord {

    private String surveyNo;
    private String owner;
    private String village;
    private double area;

    public LandRecord(String surveyNo, String owner, String village, double area) {
        this.surveyNo = surveyNo;
        this.owner = owner;
        this.village = village;
        this.area = area;
    }

    // Getters
    public String getSurveyNo() {
        return surveyNo;
    }

    public String getOwner() {
        return owner;
    }

    public String getVillage() {
        return village;
    }

    public double getArea() {
        return area;
    }

    // Setters (needed later for update functionality)
    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public void setArea(double area) {
        this.area = area;
    }

    @Override
    public String toString() {
        return surveyNo + " " + owner + " " + village + " " + area;
    }
}