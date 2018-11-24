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
		*Math.pow(1.25, level) //multiplier for every level
		*Math.pow(10, rank) //multiplier for each version/rank
	)
}
function clickb() {
	game.points ++
	document.getElementById("points").innerHTML = numberformat.formatShort(game.points)
}

function buy(x) {
	if (game.points >= calccost(game.bought[x], x)) {
		game.points -= calccost(game.bought[x], x)
		game.bought[x] ++
		document.getElementById("points").innerHTML = numberformat.formatShort(game.points)
		document.getElementById("c"+String(x)).innerHTML = numberformat.formatShort(calccost(game.bought[x], x))
		document.getElementById("v"+String(x)).innerHTML = numberformat.formatShort(game.bought[x])
		if (game.bought[x] == 10) {
			console.log("hey")
			var newbutton = $("#button1").clone()
			$(newbutton).insertAfter("#button1")
			$(newbutton).attr("id", "button2")
			
			$("#button2 #b0").attr(
				{
				"id" : "b"+String(x+1),
				"onclick" : "buy("+String(x+1)+")"
				}
			)
			document.getElementById("b1").innerHTML = 
			'BUY V'
			+String(x+1)
			+'<br>COST: <span id="c'
			+String(x+1)
			+'">'
			+calccost(game.bought[x], x)
			+'</span>'

			var newind = $("#indic0").clone()
			$(newind).insertAfter("indic0")
		}
	}
}

setInterval(function() {
	game.points += game.bought[0]
	game.bought[0] += game.bought[1]

	document.getElementById("points").innerHTML = numberformat.formatShort(game.points)
	document.getElementById("v0").innerHTML = numberformat.formatShort(game.bought[0])

	if (game.points-lastscore < 0) {
		document.getElementById("psec").innerHTML = 0
	} else {
		document.getElementById("psec").innerHTML = numberformat.formatShort(game.points-lastscore)
	}

	lastscore = game.points
}, 800)