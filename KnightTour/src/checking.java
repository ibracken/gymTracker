import java.util.Random;
import java.util.ArrayList;
public class checking {
    public static void main(String[] args) {
        chessTime();
    }

    // GOAL IS TO CALL chessTime ONCE, THEN chessTime WILL MAKE MOVES using moveTime
    // moveTime WILL CHECK WHETHER THE BOARD IS COMPLETED AND IF NOT CALL ANOTHER moveTime GIVEN THE MOVE IS LEGAL.
    // IF ALL OF THE POSSIBLE MOVES ARE ILLEGAL, THE PROGRAM WILL GO BACK A STEP
    public static void chessTime() {
        // Sets the board size and initial starting position(1)
        // n is the size of the board. The program works when n is 5 or 6 but usually doesn't when 7 or larger(8 is a normal chessboard)
        int n = 6;
        int y = 1;
        int x = 1;
        // Creates the ArrayList that stores the visited squares
        ArrayList<Integer> savedSpots = new ArrayList<>();
        savedSpots.add(1);
        //Makes the first move
        moveTime(n, x, y, savedSpots);
    }

    public static boolean moveTime(int n, int x, int y, ArrayList<Integer> savedSpots) {
        Random rn = new Random();
        //If all the spots are not visited then this is called
        if(savedSpots.size() < n*n) {
            // The possible moves a knight can make
            int[] xMove = {-2, -2, -1, -1, 1, 1, 2, 2};
            int[] yMove = {1, -1, 2, -2, 2, -2, 1, -1};
            while(true) {
                // If xMove is empty, moveTime will return true
                boolean ArrayisEmpty = arrayCheck(xMove);
                if(ArrayisEmpty) {
                    return true;
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
                else {
                    // If the move is legal, possible x and y turn it into a square
                    int value = returnVal(possibleX, possibleY, n);
                    savedSpots.add(value);
                    // Recursive call to a boolean
                    boolean checkBack = moveTime(n, possibleX, possibleY, savedSpots);
                    // If the valid spot has no further moves
                    if(checkBack) {
                        //Removes the point and then goes through the loop again
                        xMove = arrayRemove(randInt, xMove);
                        yMove = arrayRemove(randInt, yMove);
                        savedSpots.remove(Integer.valueOf(value));
                    }
                    else {
                        return false;
                    }
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