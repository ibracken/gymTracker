import java.util.Random;
import java.util.ArrayList;
import java.util.HashMap;
public class WorkingTour{
    public static void main(String[] args) {
        chessTime();
    }

    public static void chessTime() {
        // Sets the board size and initial starting position(1)
        // n is the size of the board. This works for boards of larger sizes than 8 as well
        int n = 8;
        int y = 1;
        int x = 1;
        // Creates the ArrayList that stores the visited squares
        ArrayList<Integer> savedSpots = new ArrayList<>();
        savedSpots.add(1);
        //Makes the first move
        moveTime(n, x, y, savedSpots);
    }
    public static int moveTimeCheck(int n, int x, int y, ArrayList<Integer> savedSpotsTemp) {
        Random rn = new Random();
        int[] xMove = {-2, -2, -1, -1, 1, 1, 2, 2};
        int[] yMove = {1, -1, 2, -2, 2, -2, 1, -1};
        int counter = 0;
        while(true) {
            // If xMove is empty, moveTime will return true
            boolean arrayIsEmpty = arrayCheck(xMove);
            if(arrayIsEmpty) {
                return counter;
            }
            // size is the amount of numbers in xMove
            int size = xMove.length;
            // Picks a random number in size
            int randInt = rn.nextInt(size);
            // Creates a new location that the knight can visit using the random number
            int possibleX = (x + xMove[randInt]);
            int possibleY = (y + yMove[randInt]);
            // This checks whether the possible moves are legal
            if(outOfBounds(possibleX, possibleY, n)) {
                xMove = arrayRemove(randInt, xMove);
                yMove = arrayRemove(randInt, yMove);
            }
            else if (alreadyTouched(possibleX, possibleY, savedSpotsTemp, n)) {
                xMove = arrayRemove(randInt, xMove);
                yMove = arrayRemove(randInt, yMove);
            }
            else {
                counter++;
                xMove = arrayRemove(randInt, xMove);
                yMove = arrayRemove(randInt, yMove);
            }
        }
    }

    //Create a heap that takes each valid move and analyzes how many valid moves are possible from that spot
    //Dequeue once and move on; queue is used when recursive backtracking
    public static boolean moveTime(int n, int x, int y, ArrayList<Integer> savedSpots) {
        Random rn = new Random();
        //If all the spots are not visited then this is called
        if(savedSpots.size() < n*n) {
            // The possible moves a knight can make
            int[] xMove = {-2, -2, -1, -1, 1, 1, 2, 2};
            int[] yMove = {1, -1, 2, -2, 2, -2, 1, -1};
            HashMap<Integer, Integer> moveList = new HashMap<Integer, Integer>();
            while(true) {
                // If xMove is empty, moveTime will return true
                boolean arrayIsEmpty = arrayCheck(xMove);
                while(arrayIsEmpty) {
                    // Returning true means the program has to go back
                    if(moveList.isEmpty()) {
                        return true;
                    }
                    // Finds the smallest key(possible moves) in the hashmap
                    Integer min = 100;
                    for(Integer key: moveList.keySet()) {
                        if(key < min) {
                            min = key;
                        }
                    }
                    int nextSpace = moveList.get(min);
                    savedSpots.add(nextSpace);
                    Prioritized xAndY = returnXY(nextSpace, n);
                    boolean checkBack = moveTime(n, xAndY.getX(), xAndY.getY(), savedSpots);
                    // If the valid spot has no further moves
                    if(checkBack) {
                        moveList.remove(min);
                        savedSpots.remove(Integer.valueOf(nextSpace));
                    }
                    else {
                        //Returning false means it worked
                        return false;
                    }
                }
                // size is the amount of numbers in xMove
                int size = xMove.length;
                // Picks a random number in size
                int randInt = rn.nextInt(size);
                // Creates a new location that the knight can visit using the random number
                int possibleX = (x + xMove[randInt]);
                int possibleY = (y + yMove[randInt]);
                // This checks whether the possible moves are legal
                if(outOfBounds(possibleX, possibleY, n)) {
                    xMove = arrayRemove(randInt, xMove);
                    yMove = arrayRemove(randInt, yMove);
                }
                else if (alreadyTouched(possibleX, possibleY, savedSpots, n)) {
                    xMove = arrayRemove(randInt, xMove);
                    yMove = arrayRemove(randInt, yMove);
                }
                // This is for when the move is legal
                // Hashmap implementation here
                else {
                    //Creates new temporary arrayList and copies savedSpot over
                    ArrayList<Integer> savedSpotsTemp = new ArrayList<>();
                    savedSpotsTemp.addAll(savedSpots);
                    //Adds value being checked to temp savedSpot
                    int value = returnVal(possibleX, possibleY, n);
                    savedSpotsTemp.add(value);
                    // Determines the number of moves that are possible from the spot being checked
                    int futureMoves = moveTimeCheck(n, possibleX, possibleY, savedSpotsTemp);
                    moveList.put(futureMoves, value);
                    xMove = arrayRemove(randInt, xMove);
                    yMove = arrayRemove(randInt, yMove);
                }
            }
        }
        else {
            System.out.println(savedSpots);
        }
        return false;
    }

    public static int[] arrayRemove(int index, int[] array) {
        //Creates a new array that is 1 smaller than the original
        int[] finalArray = new int[array.length - 1];
        for (int i = 0, k = 0; i < array.length; i++) {
            //This is where the deletion occurs
            if(i != index) {
                finalArray[k++] = array[i];
            }
        }
        return finalArray;
    }

    // Returns the size of the array given
    public static boolean arrayCheck(int[] array) {
        boolean emptyCheck = true;
        int counter = 0;
        for(int i: array) {
            counter++;
        }
        if(counter > 0) {
            emptyCheck = false;
        }
        return emptyCheck;
    }
    // Checks to see if the potential spot has already been visited
    public static boolean alreadyTouched(int x, int y, ArrayList<Integer> savedSpots, int n) {
        int knightPlace = returnVal(x, y, n);
        for(int i = 0; i < savedSpots.size(); i++) {
            if(knightPlace == savedSpots.get(i)) {
                return true;
            }
        }
        return false;
    }

    public static int returnVal(int x, int y, int n) {
        //Identifies the numeric location of the knight on the chess board 
        int value = (n*(y-1)+x);
        return value;
    }

    public static Prioritized returnXY(int value, int n) {
        //Identifies the numeric location of the knight on the chess board
        int x = (value % n);
        int y = (value / n)+1;
        if(x == 0) {
            x = n;
        }
        if (value % n == 0) {
            y = y - 1;
        }
        Prioritized finalVal = new Prioritized(x, y);
        return finalVal;
    }

    public static boolean outOfBounds(int x, int y, int n) {
        //Checks to see if the knight has gone beyond the range of the chess board
        if(x>n || x<1) {
            return true;
        }
        if(y>n || y<1) {
            return true;
        }
        return false;

    }
}