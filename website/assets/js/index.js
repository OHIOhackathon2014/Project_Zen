layer2 = document.getElementById("overlay");
ctx2 = layer2.getContext("2d");

ctx2.clearRect(0, 0, WIDTH, HEIGHT);
ctx2.fillStyle = "#444444";
ctx2.save();
ctx2.translate(200,200);
ctx2.rotate(x/20);
ctx2.fillRect(-15, -15, 30, 30);
ctx2.restore();

