// On va protégé / rassembler / ranger notre code dans un objet
const app = {
  // cet objet contient l'état du jeu
  player: {
      x: 0,
      y: 0,
      direction: "right",
  },

  targetCell: {
      x: 4,
      y: 2,
  },

  boardSize: {
      rowCount: 4,
      cellCount: 6,
  },


  init: function () {
      console.log("Let's go 👾");
      
      app.drawBoard();
      app.listenKeyboardEvents();
  },

  drawBoard: function () {
      // je récupére l'element board pour y ajouter les lignes que je vais créer
      const boardElement = document.querySelector("#board");

      // 4 fois de suite
      for (let rowIndex = 0; rowIndex < app.boardSize.rowCount; rowIndex++) {
          // je vais créer une ligne
          const rowElement = app.createRow(rowIndex);

          // et l'ajouter dans la div "board"
          boardElement.appendChild(rowElement);
      }
  },

  createRow: function (rowIndex) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");

      for (
          let cellIndex = 0;
          cellIndex < app.boardSize.cellCount;
          cellIndex++
      ) {
          // je crée une cellule (grace à la fonction createCell)
          const cellElement = app.createCell(cellIndex, rowIndex);
          // puis je l'ajoute a la ligne que je suis en train de fabriquer
          rowElement.appendChild(cellElement);
      }

      return rowElement;
  },

  createCell: function (cellIndex, rowIndex) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      // si la case que je suis en train de fabriquer est au x et y que la targetCell (le trésor)
      // alors j'ajoute la class "targetCell"
      if (app.targetCell.x === cellIndex && app.targetCell.y === rowIndex) {
          cellElement.classList.add("target-cell");
      }

      if (app.player.x === cellIndex && app.player.y === rowIndex) {
          const playerElement = document.createElement("div");
          playerElement.classList.add("player");
          // je donne au joueur un classe CSS qui correspond à sa direction
          // si app.player.direction = "up"
          // alors l'element player aura la class .up (ce qui va le tourner de -90deg d'apres la le fichier style.css)
          playerElement.classList.add(app.player.direction);

          cellElement.appendChild(playerElement);
      }

      return cellElement;
  },

  clearBoard: function () {
      const boardElement = document.querySelector("#board");
      // vider un element en une ligne
      // on lui dit que sont contenu est maintenant "du vide / rien"
      boardElement.innerHTML = "";
  },

  redrawBoard: function () {
      app.clearBoard();
      app.drawBoard();
  },

  turnLeft: function () {
      /*
      if(app.player.direction === "up") {
          app.player.direction = "left";
      } else if(app.player.direction === "left") {
          app.player.direction = "down";
      } ...
      */

      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/switch
      // on prend la valeur de ce qui est entre parenthèse
      // et on execute le code qui correspond (case)
      switch (app.player.direction) {
          case "up":
              app.player.direction = "left";
              break;
          case "left":
              app.player.direction = "down";
              break;
          case "down":
              app.player.direction = "right";
              break;
          case "right":
              app.player.direction = "up";
              break;
      }

      app.redrawBoard();
  },

  turnRight: function () {

      switch (app.player.direction) {
          case "up":
              app.player.direction = "right";
              break;
          case "left":
              app.player.direction = "up";
              break;
          case "down":
              app.player.direction = "left";
              break;
          case "right":
              app.player.direction = "down";
              break;
      }

      app.redrawBoard();
  },

  moveForward: function() {
      
      switch (app.player.direction) {
          case "up":
              // si le joueur n'est pas déjà tout en haut (sur la ligne 0)
              if(app.player.y > 0) {
                  // alors on peut le faire monter (passer le ligne 2 a la ligne 1 par exemple)
                  app.player.y--;
              }
              break;

          case "left":
              if(app.player.x > 0) {
                  app.player.x--;
              }
              break;

          case "down":
              if(app.player.y < (app.boardSize.rowCount - 1)) {
                  app.player.y++; 
              }
              break;

          case "right":
              if(app.player.x < (app.boardSize.cellCount - 1)) {
                  app.player.x++; 
              }
              break;
      }

      app.redrawBoard();
  },

  listenKeyboardEvents: function() {

      document.addEventListener(
          "keyup", 
          (event) => {
              console.log(event.key);
          }
      );
  }
};

// je pourrais appeler directement la méthode pour démarrer mon code
// app.init();
// mais je prefère attendre que le navigateur nous envoi un evenement de type "hej , j'ai fini de fabriquer le DOM"
// on va avoir un "effet domino" : lorsque le navigateur a fini de fabriquer le dom
// on va lancer la fonction app.init()
// -> la fonction app.init() va lancer la fonction app.drawBoard()
// -> la fonction app.drawBoard() va lancer plusieur fois la fonction app.createRow() (boucle for)
document.addEventListener("DOMContentLoaded", app.init);
