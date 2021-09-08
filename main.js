//objeto barras que van para arriba y abajo
//objeto pizarron
//objeto pelota

//funcion anonima, para no contaminar el scope general del proyecto
(function () {
  self.Board = function (width, heigth) {
    //Board es el pizarron
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
      var elements = this.bars.map(function(bar){return bar; }); //video 5 map retornar cada uno de los elemetos modificarlo y agregar arreglo
      elements.push(this.ball);
      return elements;
    }
  }
})();

(function () {
  self.Ball = function(x, y, radius, board) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_y = 0;
    this.speed_x = 3;
    this.board = board;
    this.direction = 1;

    board.ball = this;
    this.kind = "circle";

      }
      self.Ball.prototype = {
        move: function(){
          this.x += (this.speed_x * this.direction);
          this.y += (this.speed_y);
    }
  }
})();

//2do video dibujar las barras
(function () {
  self.Bar = function (x, y, width, heigth, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.board = board;
    this.board.bars.push(this); //agrega una barra
    this.kind = "rectangle";
    //console.log("donde estan las Barraaaas");
    this.speed = 20;
  };
  self.Bar.prototype = {
    down: function () {
      this.y += this.speed; //3er video
    },
    up: function () {
      this.y -= this.speed;
    },
    toString: function(){
      return  "x: "+ this.x +" y: "+ this.y ;
    }
  }
})();

(function () {
  self.BoardView = function (canvas, board) {
    //vista

    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.heigth = board.heigth;
    this.board = board;
    // contexto es el objeto atravez del cual podemos dibujar en javascript
    this.ctx = canvas.getContext("2d");
  }

  self.BoardView.prototype = {
    clean: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.heigth);
    },
    draw: function () {
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx,el);
      };
    },
    play: function(){
      this.clean();
      this.draw();
      this.board.ball.move();
    }
  }
      //va a dibujar los elementos
  function draw(ctx,element) {
      //console.log(element);
      switch (element.kind) {
        case "rectangle":
          //console.log("hola mundo :3");
          ctx.fillRect(element.x, element.y, element.width, element.heigth);
          break;
          case "circle":
            ctx.beginPath();
            ctx.arc(element.x,element.y,element.radius, 0,7);
            ctx.fill();
            ctx.closePath();
            break;
      }
    
  }
})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735,100,40,100,board);
var canvas = document.getElementById("canvas");
var board_view = new BoardView(canvas, board);
var ball = new Ball(350,100, 10,board);



document.addEventListener("keydown", function(event){

  //3er video
  
  if (event.key == 38) {
    event.preventDefault();
    bar.up();
  } 
  else if (event.key == 40) {
    event.preventDefault();
    bar.down();
  }
  else if(event.key === 87){
    event.preventDefault();
    bar_2.up(); //w
  }
  else if(event.key ===83){
    event.preventDefault();
    bar_2.down(); //s
  } else if(event.key ===32){
    event.preventDefault();

  }
});

window.requestAnimationFrame(controller);



// //ejcuta todos los elementos
function controller() {
  //console.log("hola mundo");
  //console.log(board);
board_view.play();
  window.requestAnimationFrame(controller);
}
