# Fauxtris

Frontend file, view backend [here](https://github.com/rebeccahickson/fauxtris-backend)

Fauxtris is a single page JavaScript application, using Rails as an API, that emulates the popular game Tetris.

## Installation

- Ensure that you have [Ruby](https://www.ruby-lang.org/en/downloads/) installed properly
- Clone this repository and its matching [backend](https://github.com/rebeccahickson/fauxtris-backend) into the same folder
- Prepare the backend by navigating into the backend folder and completing the following steps:

  - Make sure that you have all necessary gems by running:

    ```
    bundle install
    ```

  - Run the migrations

    ```
    rails db:migrate
    ```

  - Seed the database

    ```
    rails db:seed
    ```

## Usage

### Starting the program

To start the server, enter this command in your backend folder:

```
rails s
```

To open the application, enter this command in your frontend folder:

```
open index.html
```

### How to use the program

- The application opens on its sole page, from here you may:
  - Start a new game by clicking either the "New Game" or "Start New Game" buttons
    - The game will begin once you've selected your difficulty setting by clicking one of the buttons which will appear
  - View the game manual by clicking the "How To Play" button
  - View the Top 10 scores in each difficulty level by clicking the "Leaderboard" button

### How to play

- The goal of the game is to prevent any Tetrominoes from reaching the top of the gameboard for as long as possible
- Tetrominoes will be generated at the top of the gameboard and will gradually fall down, the speed of which is based on your difficulty setting
- If the bottom edge of a Tetromino touches the bottom of the gameboard or another piece, it will be frozen. A new Tetromino will then be generated at the top of the board
- Each Tetromino may be moved by using an arrow key:
  - Left Arrow - Moves Tetromino to the left
  - Right Arrow - Moves Tetromino to the right
  - Down Arrow - Moves Tetromino more quickly downwards
  - Spacebar - Rotates the Tetromino
    - Depending on the Tetromino, it may rotate 0, 2, or 4 times!
- There is no winning the game - just seeing how long you can keep it up! If your game ends with a new top score, you will be offered a space to input your initials to be saved alongside your score in the game for future players to admire

## License

The program is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)

## Collaborating

Pull Requests are welcome on [GitHub](https://github.com/rebeccahickson/fauxtris-frontend). This project is intended to be a safe, welcoming space for collaboration.
