const canvas = document.getElementById("randomBallDrawingPage");
const context = canvas.getContext("2d");
var mouseX, mouseY;
const numOfBalls = 100;
var balls = [];

// get mouse pointer co-ordinates
canvas.addEventListener("mousemove", (event) => {
	let boundings = canvas.getBoundingClientRect();
	mouseX = event.clientX - boundings.left;
	mouseY = event.clientY - boundings.top;
});

//get random value between range integer
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

//creating BAlls
const createBall = () => {
	for (let i = 0; i < numOfBalls; i++) {
		let radius = getRandomInt(5, 15);
		let color = `rgba(
            ${getRandomInt(0, 255)},
            ${getRandomInt(0, 255)},
            ${getRandomInt(0, 255)},
			${Math.random() * 1}
        )`;
		let ball = new canvasBall(radius, color);
		ball.x = getRandomInt(radius, canvas.width - radius);
		ball.y = getRandomInt(radius, canvas.height - radius);
		ball.vx = getRandomInt(0, 10) - 5 || 5;
		ball.vy = getRandomInt(0, 10) - 5 || 5;
		ball.context = context;
		balls.push(ball);
	}
};

//get client window size
const windowSize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
};

// drawing balls from balls array
const drawBalls = () => balls.forEach((ball) => ball.draw());

// checking Edge condition, convert to negetive value for oppsite direction movent
const checkEdges = (ball) => {
	if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.vx *= -1;

	if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.vy *= -1;
};

// checking Mouse Collision to balls
const checkMouseCollision = (ball) => {
	let distanceBall = Math.sqrt(
		Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2)
	);

	if (distanceBall < ball.r && ball.r < 50) {
		// distance between ball and mouse when getting close {
		if (
			ball.x + ball.r > canvas.width - 20 ||
			ball.x - ball.r < 20 ||
			ball.y + ball.r + 20 > canvas.height - 20 ||
			ball.y - ball.r < 20
		)
			// check ball is near to edge then don't increment
			return;
		ball.r += 5;
		canvas.style.cursor = "pointer";
	}
	if (distanceBall > ball.r + 30)
		// distance between ball and mouse when getting away
		ball.r = ball.origR;
};

// move ball as per velocity (changing center co-ordinate)
const move = (ball) => {
	ball.x += ball.vx;
	ball.y += ball.vy;
	checkEdges(ball);
	checkMouseCollision(ball);
};

// move ball
const moveBalls = () => balls.map((ball) => move(ball));

// Ball moment animation
const ballAnimationLoop = () => {
	// Clear Canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Update
	moveBalls();

	// Draw
	drawBalls();

	// Animate
	window.requestAnimationFrame(ballAnimationLoop);
};

// check browser compatibility
window.requestAnimationFrame = (() =>
	window.requestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60);
	})();

// call to initialize canvas width and height
windowSize();

function initialize() {
	window.addEventListener("resize", windowSize, false);
	windowSize();
	createBall();
}

initialize();
// start animation
window.requestAnimationFrame(ballAnimationLoop);
