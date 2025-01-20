# Tic-Tac-Toe Project
Live Preview: https://mmustafa93.github.io/tic-tac-toe/

## Description
This project is a web-based implementation of the classic Tic-Tac-Toe game. It was developed as part of **The Odin Project** curriculum to practice JavaScript, HTML, and CSS. The game supports different player modes and features a clean and interactive user interface.

---

## Features
- **Two Player Modes**:
  - Human vs. Human
  - Human vs. Computer
- **Dynamic Gameplay**:
  - Players take turns marking the board.
  - The computer player makes its move with a short delay for a realistic experience.
- **Winner Declaration**:
  - Highlights the winner or declares a tie.
- **Restart Option**:
  - Reset the game to play again.
- **Responsive UI**:
  - A clean and simple interface with hover effects and visual feedback.

---

## Technologies Used
- **HTML5** for the structure of the webpage.
- **CSS3** for styling and layout.
- **Vanilla JavaScript** for game logic and interactivity.

---

## How to Play
1. Choose the player type for Player 1 (X) and Player 2 (O):
   - Human or Computer.
2. Click the **Start Game** button to begin.
3. Players take turns clicking on the grid to mark their symbol (X or O).
4. The game ends when:
   - One player gets three symbols in a row (horizontally, vertically, or diagonally).
   - All squares are filled without a winner (tie).
5. Use the **Play Again** button to restart the game.

---

## File Structure
- **index.html**: The HTML structure of the webpage.
- **style.css**: The stylesheet for styling the game interface.
- **script.js**: Contains the game logic and interactivity.

---

## Key JavaScript Concepts Used
1. **Module Pattern**:
   - Encapsulated game board logic within the `Gameboard` module.
2. **Factory Functions**:
   - Created `Player` objects dynamically.
3. **Event Handling**:
   - Used DOM event listeners to handle user interactions.
4. **Dynamic DOM Updates**:
   - Updated the UI dynamically to reflect the game state.
5. **Encapsulation**:
   - Kept the game logic modular and organized.

---

## Future Improvements
- Add difficulty levels for the computer player (e.g., Easy, Medium, Hard).
- Implement a minimax algorithm for smarter AI moves.
- Enhance the UI with animations and sound effects.
- Make the game fully responsive for all screen sizes.

---

## Credits
This project was developed as part of **[The Odin Project](https://www.theodinproject.com/)** curriculum.

---

## How to Run
1. Clone or Download the Project
Clone the repository using Git or download the source files as a ZIP file:

git clone git@github.com:mmustafa93/tic-tac-toe.git

2. Navigate to the Project Directory
If you cloned the repository, use the terminal to move into the project folder:

cd tic-tac-toe

3. Open the Game
	•	Locate the index.html file in the project directory.
	•	Open it in any modern web browser by double-clicking the file or dragging it into the browser window.

4.	Start Playing
	•	Choose player types (Human or Computer).
	•	Click “Start Game” and enjoy an interactive game of Tic-Tac-Toe! Enjoy the game!
