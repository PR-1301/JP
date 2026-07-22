import java.io.Serializable;

public abstract class User implements Serializable {

    private String username;
    private String password;
    protected transient LandManager landManager;
    protected transient CaseManager caseManager;

    public User(String username, String password, LandManager landManager, CaseManager caseManager){
        this.username = username;
        this.password = password;
        this.landManager = landManager;
        this.caseManager = caseManager;
    }

    public void setManagers(LandManager landManager, CaseManager caseManager) {
        this.landManager = landManager;
        this.caseManager = caseManager;
    }

    public String getUsername() {
        return username;
    }

    public boolean login(String u,String p){
        return username.equals(u) && password.equals(p);
    }

    public abstract void showMenu(java.util.Scanner scanner);
}

/* Topics covered
* Abstraction
* Encapsulation
* Constructor
* */