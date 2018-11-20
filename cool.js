let amount = document.getElementById("amount")

let game = {
	cost: 1,
	bought: 0,
	points: 1,
	timer: 500
}

function change() {
	if (points >= cost) {
		game.bought += 1
		game.points -= game.cost
		game.cost += game.cost
	}
}

setInterval(function(){
	game.points += game.bought
	amount.innerHTML = game.points
}, 500)
