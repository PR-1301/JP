public class Citizen extends User {

    public Citizen(String username,String password){
        super(username,password);
    }


    @Override
    public void showMenu(){
        System.out.println("Citizen Menu");
    }
}