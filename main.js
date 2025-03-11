let intervalId;
let intervalReplay;
let replayClicksCount = 0; // Cколько раз кликнули
let totalGames = 2; // Сколько раз кликаем на replay (+ 1)

// во сколько мс сканим тайлы и кликаем по ним(чем меньше - тем больше поинтов)
const scanTileMs = 180;
// 100 - 4000 - 4500 points
// 170 - 2000 - 2500 points

function clickTiles() {
  if (replayClicksCount >= totalGames) {
    console.log("Достигнуто количество игр. Останавливаем авто-клик.");
    stopClicks();
    return;
  }

  console.log("Поиск элементов...");

  const elements = Array.from(document.querySelectorAll("[alt='tile']")).slice(
    0,
    4
  );

  elements.forEach((tile) => {
    const topValue = parseInt(
      window.getComputedStyle(tile).getPropertyValue("top"),
      10
    );

    if (!isNaN(topValue) && topValue >= 370) {
      console.log(`Кликаем по элементу с top=${topValue}`);

      const { left, top, width, height } = tile.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y,
      });

      document.elementFromPoint(x, y).dispatchEvent(event);
      console.log("Кликнули по координатам:", x, y);
    }
  });
}

function clickReplayButton() {
  if (replayClicksCount >= totalGames) {
    console.log(
      "Достигнуто количество игр. Останавливаем клик по кнопке REPLAY."
    );
    return;
  }

  const replayButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim().toUpperCase() === "REPLAY"
  );

  if (replayButton) {
    const { left, top, width, height } = replayButton.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    });

    document.elementFromPoint(x, y).dispatchEvent(event);
    replayClicksCount++;
    console.log(`№ игры: ${replayClicksCount} / Количество игр: ${totalGames}`);

    if (replayClicksCount >= totalGames) {
      console.log("Все игры завершены. Останавливаем авто-кликер.");
      stopClicks();
    }
  } else {
    console.log("Кнопка REPLAY не найдена.");
  }
}


function startClicks(numberOfGames) {
  totalGames = numberOfGames;
  intervalId = setInterval(clickTiles, 350);
  console.log("Авто-кликер запущен.");

  intervalReplay = setInterval(clickReplayButton, 10000);
}

function stopClicks() {
  clearInterval(intervalReplay);
  clearInterval(intervalId);
  console.log("Авто-кликер остановлен.");
}

startClicks(totalGames);

// Для остановки авто-клика вызовите в консоли:
// stopClicks();
