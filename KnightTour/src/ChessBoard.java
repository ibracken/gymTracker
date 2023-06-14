import java.util.Random;
import java.util.ArrayList;

public class ChessBoard {
    private int knightLocation;
    private ArrayList<Integer> savedSpots;
    private Random rn = new Random();
    private int n = 5;
    private int y = 1;
    private int x = 1;

    public ChessBoard() {
        this.savedSpots = new ArrayList<Integer>();
        this.savedSpots.add(1);
    }
}
