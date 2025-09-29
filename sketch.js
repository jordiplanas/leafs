let leaves = [];
      let leafImg;
      let button;
      let flying = false;
      let font;

      function preload() {
        leafImg = loadImage("leaf.png"); // coloca tu PNG aquí
        font = loadFont('FuturaBTforDyson-Hv.otf');
      }

      function setup() {
        createCanvas(windowWidth, windowHeight);
        imageMode(CENTER);
        textFont(font);
        // hojas iniciales
        for (let i = 0; i < 40; i++) {
          leaves.push(new Leaf(random(width), random(height)));
        }

        // botón
        button = createButton("BLOW");
        button.size(180, 50);
        button.mousePressed(() => {
          flying = true;
        });
        centerButton();
      }

      function draw() {
        background(240);
        fill(0)
        textAlign(CENTER)
        textSize(100)
        text("DYSON", width/2, height/2)
        for (let leaf of leaves) {
          leaf.update();
          leaf.show();
        }
      }

      function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        centerButton();
      }

      function centerButton() {
        // centrado en pantalla
        button.position(windowWidth / 2 -90, windowHeight - 60);
      }

      class Leaf {
        constructor(x, y) {
          this.pos = createVector(x, y);
          this.angle = random(TWO_PI);
          this.spin = random(-0.01, 0.01);
          this.offset = random(TWO_PI);
          this.speed = 0.9 + random(0.3);
        }

        update() {
          if (flying) {
            let dir = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
            dir.normalize();
            dir.mult(this.speed);

            let perp = createVector(-dir.y, dir.x);
            perp.mult(sin(frameCount * 0.05 + this.offset) * 2);

            this.pos.add(dir);
            this.pos.add(perp);

            this.angle += this.spin;
          }
        }

        show() {
          push();
          translate(this.pos.x, this.pos.y);
          rotate(this.angle);
          image(leafImg, 0, 0, 250, 250);
          pop();
        }
      }
