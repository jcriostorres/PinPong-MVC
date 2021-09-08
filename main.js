//objeto barras que van para arriba y abajo
//objeto pizarron
//objeto pelota

//funcion anonima, para no contaminar el scope general del proyecto
(function () {
  self.Board = function (width, heigth){  //Board es el pizarron
    this.width = width;
    this.heigth = heigth;
    //si esta en juego
    this.playing = false;
    //si el juego esta terminado
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  }

  //   //modificar los protipos de la clase para colocar los metodos
  self.Board.prototype = {
    //retornas las barra como la pelota en el juego
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    }
  }
})();

//2do video dibujar las barras
(function() {
  self.Bar = function(x, y, width, heigth, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.board = board;
    this.board.bars.push(this);  //agrega una barra
    this.kind = "rectangle";
    //console.log("donde estan las Barraaaas");
  }
  self.Bar.prototype = {
    down: function() {
    },
    up: function() {
    }
  }
})();

  (function () {
    self.BoardView = function(canvas, board){  //vista

      this.canvas = canvas;
      this.canvas.width = board.width;
      this.canvas.heigth = board.heigth;
      this.board = board;
      // contexto es el objeto atravez del cual podemos dibujar en javascript
      this.ctx = canvas.getContext("2d");
    }


    self.BoardView.prototype = {
      draw: function(){
        for (var i = this.board.elements.length - 1; i >= 0; i--) {
          var el = this.board.elements[i];

          draw(this.ctx,el);
        };
      }
    }

            //va a dibujar los elementos
    function draw(ctx, element){
      //console.log(element);
      if(element !== null && element.hasOwnProperty("kind")){
        switch(element.kind){
          case "rectangle":
            //console.log("hola mundo :3");
            ctx.fillRect(element.x, element.y, element.width, element.heigth)
            break;
        }
      }
    }
  })();

self.addEventListener("load", main);


// //ejcuta todos los elementos
function main() {
  //console.log("hola mundo");
  var board = new Board(800, 400);
  //console.log(Bar);
  var bar = new Bar(5, 100, 40, 100, board);
  var bar = new Bar(5, 100, 40, 100, board);
  var canvas = document.getElementById('canvas');
  var board_view = new BoardView(canvas, board);
  //console.log(board);
  board_view.draw();
}
