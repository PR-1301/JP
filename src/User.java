public abstract class User {

    private String username;
    private String password;

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public boolean login(String u,String p){
        return username.equals(u) && password.equals(p);
    }

    public abstract void showMenu();
}

/* Topics covered
* Abstraction
* Encapsulation
* Constructor
* */