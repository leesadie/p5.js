var points = []
var multi

var r1
var r2
var g1
var g2
var b1
var b2

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(1)

    var density = 20
    var space = width / density

    for (var x = 0; x < width; x += space) {
        for (var y = 0; y < height; y += space) {
            var p = createVector(x + random(-10, 10), y + random(-10, 10))
            points.push(p)
        }
    }
  
    r1 = random(255)
    r2 = random(255)
    g1 = random(255)
    g2 = random(255)
    b1 = random(255)
    b2 = random(255)
  
    multi = random(0.002, 0.01)
}

function draw() {
    noStroke()
    fill(255)

    for (var i = 0; i < points.length; i++) {
      
        var r = map(points[i].x, 0, width, 50, 255)
        var g = map(points[i].y, 0, height, 50, 255)
        var b = map(points[i].z, 0, width, 255, 50)
        
        fill(r,g,b)
      
        var angle = map(noise(points[i].x * multi, points[i].y * multi), 0,1,0,720)
        
        points[i].add(createVector(cos(angle), sin(angle)))
      
        ellipse(points[i].x, points[i].y, 1)
      
    }
}