var amount = document.getElementById("amount")
var aclickers = document.getElementById("aclickers")
var btncost = document.getElementById("btncost")

var game = {
	cost: 1,
	bought: 0,
	points: 1,
	timer: 500
}

function change() {
	if (game.points >= game.cost) {
		game.bought += 1
		game.points -= game.cost
		game.cost += game.cost
	}
}

setInterval(function(){
	game.points += game.bought
	amount.innerHTML = game.points
	aclickers.innerHTML = game.bought
	btncost.innerHTML = game.cost
}, 200)
