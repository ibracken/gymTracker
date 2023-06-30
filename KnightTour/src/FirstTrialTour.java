import java.util.Random;
import java.util.ArrayList;
public class FirstTrialTour {
    public static void main(String[] args) {
        chessTime();
    }
    public static void chessTime() {
        Random rn = new Random();
        int n = 5;
        int y = 1;
        int x = 1;
        ArrayList<Integer> savedSpots = new ArrayList<>();
        savedSpots.add(1);

        while(savedSpots.size() < n*n) {
            //for(int i = 0; i < 50; i++) {
            int[] xMove = {-2, -2, -1, -1, 1, 1, 2, 2};
            int[] yMove = {1, -1, 2, -2, 2, -2, 1, -1};
            boolean checkingMoves = true;
            while(checkingMoves) {
                if(xMove.length == 0){
                    //This is where the knight has run out of options
                    //THE EXIT THING MIGHT NOT WORK, IF PROBLEMS OCCUR AT THE END LOOK HERE
                    chessTime();
                    //delete
                    System.exit(0);
                }
                int size = xMove.length;
                int randInt = rn.nextInt(size);
                int possibleX = x + xMove[randInt];
                int possibleY = y + yMove[randInt];
                // outOfBounds and alreadyTouched aren't being used, it has something to do with continue not being activated right
                if(outOfBounds(possibleX, possibleY, n)) {
                    xMove = arrayRemove(randInt, xMove);
                    yMove = arrayRemove(randInt, yMove);
                }
                else if (alreadyTouched(possibleX, possibleY, savedSpots, n)) {
                    xMove = arrayRemove(randInt, xMove);
                    yMove = arrayRemove(randInt, yMove);
                }
                else {
                    int value = returnVal(possibleX, possibleY, n);
                    x = possibleX;
                    y = possibleY;
                    savedSpots.add(value);
                    checkingMoves = false;
                }
            }
        }
        System.out.println(savedSpots);

    }

    public static int[] arrayRemove(int index, int[] array) {
        int[] finalArray = new int[array.length -1];
        for (int i = 0, k = 0; i < array.length; i++) {
            if(i == index) {
                continue;
            }
            else{
                finalArray[k++] = array[i];
            }
        }
        return finalArray;
    }
    // Checks to see if the potential spot has been already gone to
    public static boolean alreadyTouched(int x, int y, ArrayList<Integer> savedSpots, int n) {
        int place = returnVal(x, y, n);
        for(int i = 0; i < savedSpots.size(); i++) {
            if(place == savedSpots.get(i)) {
                return true;
            }
        }
        return false;
    }

    public static int returnVal(int x, int y, int n) {
        int value = (n*(y-1)+x);
        return value;
    }

    public static boolean outOfBounds(int x, int y, int n) {
        if(x>n || x<1) {
            return true;
        }
        if(y>n || y<1) {
            return true;
        }
        return false;

    }


}