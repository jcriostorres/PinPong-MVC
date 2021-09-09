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
    this.playing = true;
    //si el juego esta terminado
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  }

  //   //modificar los protipos de la clase para colocar los metodos
  self.Board.prototype = {
    //retorna las barra como la pelota en el juego
    get elements() {
      var elements = this.bars.map(function(bar){return bar; }); //video 5 map retornar cada uno de los elemetos modificarlo y agregar arreglo
      elements.push(this.ball);
      return elements;
    }
  }
})();

(function () {
  self.Ball = function (x, y, radius, board) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_y = 0;
    this.speed_x = 3;
    this.board = board;
    this.direction = 1;
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI /12;
    this.speed = 3;

    board.ball = this;
    this.kind = "circle";
  };
  self.Ball.prototype = {
    move: function () {
      this.x += this.speed_x * this.direction;
      this.y += this.speed_y;
    },

    get width(){
      return this.radius * 2;
    },
    get heigth(){
      return this.radius * 2;

    },

    collision: function(bar) {
      //reacciona a la colision con una barra que recibe como paremetros
      var relative_intersect_y = (bar.y + (bar.heigth / 2)) - this.y;

      var normalized_intersect_y = relative_intersect_y / (bar.heigth / 2);

      this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

      this.speed_y = this.speed * -Math.sin(this.bounce_angle);
      this.speed_x = this.speed * Math.cos(this.bounce_angle);

      if (this.x > (this.board.width / 2)) this.direction = -1;
      else this.direction = 1;
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

        draw(this.ctx, el);
      };
    },

    check_collisions: function() {
      //console.log(":#");
      for (var i = this.board.bars.length - 1; i >= 0; i--) {
        var bar = this.board.bars[i];
        if (hit(bar, this.board.ball)) {

          this.board.ball.collision(bar);
        }
      };
    },

    play: function () {
      //console.log("holaa");
      if (this.board.playing) {
        this.clean();
        this.draw();
        this.check_collisions();
        this.board.ball.move();
      }
    }
  }
function hit(a, b) {
  //console.log(":P");
  //revisa si a coliciona con b

  var hit = false;
      //colisiones horizontales
  if (b.x + b.width >= a.x && b.x < a.x + a.width) {
    //colisiones verticales
    if (b.y + b.heigth >= a.y && b.y < a.y + a.heigth) hit = true;
  }
      // colision de a con b
  if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
    if (b.y <= a.y && b.y + b.heigth >= a.y + a.heigth) hit = true;
  }
      //colision b con a
  if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
    if (a.y <= b.y && a.y + a.heigth >= b.y + b.heigth) 
    hit = true;
  }
  return hit;
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
var bar2 = new Bar(735,100,40,100,board);
var canvas = document.getElementById("pong");
var board_view = new BoardView(canvas, board);
var ball = new Ball(350,100, 10,board);

document.addEventListener("keydown", function(ev){

  //3er video
  
  if (ev.key === "ArrowDown") {
    ev.preventDefault();
    bar.up();
}
else if (ev.key === "ArrowUp") {
    ev.preventDefault();
    bar.down();
}
else if (ev.key === "s") {
    ev.preventDefault();
    bar2.down()
}
else if (ev.key === "w") {
    ev.preventDefault();
    bar2.up();
}
else if (ev.key === " ") {
    ev.preventDefault();
    boardView.playing = !boardView.playing;
}
});

board_view.draw();

window.requestAnimationFrame(controller);

//ejcuta todos los elementos
function controller() {
  //console.log("hola mundo");
  //console.log(board);
board_view.play();
  window.requestAnimationFrame(controller);
}
