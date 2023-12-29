module.exports.GameLogic = ([player1, player2]) => {
  const player1Win = Logic(
    player1.move[player1.move - 1],
    player2.move[player2.move - 1]
  );

  if (player1Win) {
    return player1.id;
  } else return player2.id;
};

// Scissor < Rock
// Rock <Paper
// Paper < Scissor

function Logic(action1, action2) {
  switch (action1) {
    case "Scissor": {
      if (action2 === "Rock") return false;
      else return true;
    }
    case "Paper": {
      if (action2 === "Scissor") return false;
      else return true;
    }
    case "Rock": {
      if (action2 === "Paper") return false;
      else return true;
    }
  }
}
