//objetos barras que van para arriba y abajo
//objeto pizarron
//objeto pelota

//funcion anonima, no contaminar el scope general del proyecto
(function () {
  self.Board = function (width, heigth) {
    this.width = width;
    this.heigth = heigth;
    //si esta en juego
    this.playing = false;
    //si el juego esta terminado
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  //modificar los protipos de la clase para colocar los metodos
  self.Board.prototype = {
    //retornas las barra como la pelota en el juego
    get elements() {
      var elements = this.bars;
      elements.push(ball);
      return elements;
    },
  };
})();

(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.heigth = board.heigth;
    this.board = board;
    // contexto es el objeto atravez del cual podemos dibujar en javascript
    this.ctx = canvas.getContex("2d");
  };
})();

window.addEventListener("load", main);

//ejcuta todos los elementos
function main() {
  var board = new Board(800, 400);
  var canvas = document.getElementById("canvas");
  var board_view = new BoardView(canvas, board);
}
