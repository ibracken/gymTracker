import java.util.Random;
import java.util.ArrayList;
public class checking {
    public static void main(String[] args) {
        chessTime();
    }

    // GOAL IS TO CALL CHESS TIME ONCE, THEN CHESS TIME WILL MAKES MOVES
    //MAKE MOVES WILL CHECK WHETHER THE BOARD IS COMPLETED AND IF NOT CALL ANOTHER MAKE MOVE. IF THE NEXT MAKE MOVE FAILS, IT'LL GO ANOTHER ROUTE
    public static void chessTime() {
        //Sets the size and initial starting position
        int n = 5;
        int y = 1;
        int x = 1;
        ArrayList<Integer> savedSpots = new ArrayList<>();
        savedSpots.add(1);
        //Makes the first move
        moveTime(n, x, y, savedSpots);
    }

    public static boolean moveTime(int n, int x, int y, ArrayList<Integer> savedSpots) {
        Random rn = new Random();
        //If all the spots are filled then this is called
        if(savedSpots.size() < n*n) {
            int[] xMove = {-2, -2, -1, -1, 1, 1, 2, 2};
            int[] yMove = {1, -1, 2, -2, 2, -2, 1, -1};
            boolean checkingMoves = true;
            while(checkingMoves) {
                boolean ArrayisEmpty = arrayCheck(xMove);
                if(ArrayisEmpty) {
                    return true;
                }
                int size = xMove.length;
                int randInt = rn.nextInt(size);
                int possibleX = x + xMove[randInt];
                int possibleY = y + yMove[randInt];
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
                    int value = returnVal(possibleX, possibleY, n);
                    x = possibleX;
                    y = possibleY;
                    savedSpots.add(value);
                    // Recursive call to a boolean
                    boolean checkBack = moveTime(n, x, y, savedSpots);
                    if(checkBack) {
                        //remove the point
                        xMove = arrayRemove(randInt, xMove);
                        yMove = arrayRemove(randInt, yMove);
                    }
                    else {
                        return false;
                    }
                }
            }
            return false;
        }
        else {
            System.out.println(savedSpots);
            return false;
        }

    }

    public static int[] arrayRemove(int index, int[] array) {
        //Creates a new array that is 1 smaller than the original
        int[] finalArray = new int[array.length - 1];
        for (int i = 0, k = 0; i < array.length; i++) {
            //This is where the deletion occurs
            if(i == index) {
                continue;
            }
            else{
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