let game = {
	points: 0,
	bought: [0, 0, 0, 0, 0],
	prestige: 0,

	clickx: 1
}

var lastscore = 0

function calccost(level, rank) {
	return Math.round(
		10 //base num
		*Math.pow(1.4, level) //multiplier for every level
		*Math.pow(10, rank) //multiplier for each version/rank
	)
}

function clickb() {
	game.points ++
	document.getElementById("points").innerHTML = game.points

	for (var i=0;i<5;i++) {
		if (game.points >= calccost(game.bought[x], x)) {
			document.getElementById("b"+String(i)).style.color = "gray"
		} else {
			document.getElementById("b"+String(i)).style.color = "white"
		}
	}
}

function buy(x) {
	if (game.points >= calccost(game.bought[x], x)) {
		game.points -= calccost(game.bought[x], x)
		document.getElementById("points").innerHTML = game.points
		document.getElementById("c"+String(x)).innerHTML = calccost(game.bought[x]+1, x)
		game.bought[x] ++
		document.getElementById("v"+String(x)).innerHTML = game.bought[x]

		
	}
}

setInterval(function() {
	game.points += game.bought[0]

	document.getElementById("points").innerHTML = game.points

	if (game.points-lastscore < 0) {
		document.getElementById("psec").innerHTML = 0
	} else {
		document.getElementById("psec").innerHTML = game.points-lastscore
	}

	lastscore = game.points
}, 1000)
