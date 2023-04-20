function canvasBall(radius, color) {
	// Base
	var ball = this;

	// Property
	ball.r = radius; // ball radius (incremetn on this radius)
	ball.origR = ball.r; // original radius
	ball.c = color || "black"; // ball color
	ball.x = 0; // center x
	ball.y = 0; // center y
	ball.vx = 0; // velocity of x direction of ball
	ball.vy = 0; // velocity of y direction of ball
	ball.context = null; // the drawing context of ball
}

canvasBall.prototype.draw = function () {
	// Base
	var ball = this;

	// Check Context
	if (!ball.context) return;

	// Draw Ball
	ball.context.beginPath();
	ball.context.fillStyle = ball.c;
	ball.context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
	ball.context.fill();
};
