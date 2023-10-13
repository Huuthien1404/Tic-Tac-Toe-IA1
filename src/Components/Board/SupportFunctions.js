function getUniqueElements(array) {
  const uniqueArray = [];
  for (let i = 0; i < array.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < uniqueArray.length; j++) {
      if (JSON.stringify(array[i]) === JSON.stringify(uniqueArray[j])) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}
function getPositionHistoryClicked(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (JSON.stringify(array[i]) === JSON.stringify(element)) {
      return i;
    }
  }
}
function checkWinner(arr) {
  const winnerCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerCases.length; i++) {
    let [a, b, c] = winnerCases[i];
    if (arr[a] === arr[b] && arr[b] === arr[c] && arr[a] === "X") {
      return "X";
    }
    if (arr[a] === arr[b] && arr[b] === arr[c] && arr[a] === "O") {
      return "O";
    }
  }
  return "Unknown";
}
function findArrWinner(arr) {
  const winnerCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerCases.length; i++) {
    let [a, b, c] = winnerCases[i];
    if (
      arr[a] === arr[b] &&
      arr[b] === arr[c] &&
      (arr[a] === "X" || arr[a] === "O")
    ) {
      return [a, b, c];
    }
  }
  return [];
}
function checkDraw(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) {
      return "no Draw";
    }
  }
  return "Draw";
}

export {
  getUniqueElements,
  getPositionHistoryClicked,
  checkWinner,
  findArrWinner,
  checkDraw,
};
