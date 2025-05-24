boolean usePerspective = true;

void setup() {
  size(800, 600, P3D);
}

void draw() {
  background(30);
  lights();

  // Selección de proyección
  if (usePerspective) {
    perspective(PI/3.0, float(width)/float(height), 0.1, 1000);
  } else {
    float zoom = 200;
    ortho(-width/2, width/2, -height/2, height/2, 0.1, 1000);
  }

  // Posición de la cámara
  camera(width/2.0, height/2.0, 400, width/2.0, height/2.0, 0, 0, 1, 0);

  // Transformaciones globales
  translate(width/2, height/2, 0);
  rotateX(map(mouseY, 0, height, -PI, PI));
  rotateY(map(mouseX, 0, width, -PI, PI));

  // Dibujar objetos con diferente profundidad
  drawBox(0, 0, 0, color(200, 0, 0));
  drawBox(-150, -100, -200, color(0, 200, 0));
  drawBox(150, 100, 200, color(0, 100, 200));
}

void drawBox(float x, float y, float z, color c) {
  pushMatrix();
  translate(x, y, z);
  fill(c);
  noStroke();
  box(100);
  popMatrix();
}

void keyPressed() {
  if (key == 'p' || key == 'P') {
    usePerspective = !usePerspective;
  }
}
