if (localStorage.getItem('gameData')) {
	var game = JSON.parse(localStorage.getItem('gameData'));
} else {
	var game = {
		product: 0,
		money: 0,
		worker0: 0,
		worker1: 0,
		worker2: 0,
		worker3: 0,
		worker4: 0,
		worker0period: 1000,
		worker1period: 9000,
		worker2period: 80000,
		worker3period: 700000,
		worker4period: 6000000,
		worker0mult: 1,
		worker1mult: 10,
		worker2mult: 100,
		worker3mult: 1000,
		worker4mult: 10000,
		worker0cost: 10,
		worker1cost: 100,
		worker2cost: 1000,
		worker3cost: 10000,
		worker4cost: 100000,
		sellprice: 0.5,
		manualmulti: 1,
		upgrades: [],
		upgradeprices: [25,50,100,200,500,800,1000,1250,1600,2100,3000,4000],
		resets: 0,
		resetupgrades: [0, 0, 0],
		timeelapsed: 0,
		totalmoney: 0,
		totalproduct: 0,
	}
	console.log("fail");
}

var lastproduct = 0
var lastmoney = 0
var productps = 0
var moneyps = 0

var openbottombox = 'inset 0 2px 0 0 #e9ec34, inset 2px 0 0 0 #e9ec34, inset -2px 0 0 0 #e9ec34'

setInterval(function() {
	localStorage.setItem('gameData', JSON.stringify(game))
}, 3000);

function toggleinfo() {//called when clicking info at the bottom
	$('#overlay').css('display', (($('#overlay').css('display') == 'none') ? 'block' : 'none'))//ternary operator, switches between showing and not showing overlay
}

function createproduct() {//function called when clicking "Make A Lemonade"
	game.product += 1
	game.totalproduct += 1
	document.getElementById('indicator_product').innerHTML = game.product.toFixed(0)
}

function sellproduct() {//function called when selling lemonades
	if (game.product >= 1) {//checks if 1 whole lemonade
		game.money += Math.floor(game.product)*game.sellprice
		game.totalmoney += Math.floor(game.product)*game.sellprice*game.resetupgrades[0]
		game.product = 0
		document.getElementById('indicator_product').innerHTML = game.product.toFixed(0)
		document.getElementById('indicator_money').innerHTML = game.money.toFixed(2)
	}
}

function upgrade(x) {//function called when buying any upgrades
	if (game.money >= game.upgradeprices[x]) {
		game.money -= game.upgradeprices[x]
		document.getElementById('upgrade_'+x).style.display = 'none'
		if (x == 0) {
			game.manualmult + 1
		} else if (x == 1) {
			game.worker0mult *= 1.5
		} else if (x == 2) {
			game.sellprice *= 1.5
		} else if (x == 3) {
			game.worker1mult *= 1.5
		} else if (x == 4) {
			game.worker2mult *= 1.5
		} else if (x == 5) {
			game.worker3mult *= 1.5
		} else if (x == 6) {
			game.worker4mult *= 1.5
		} else if (x == 7) {
			
		} else if (x == 8) {
		
		} else if (x == 9) {
		
		} else if (x == 10) {
		
		} else if (x == 11) {
		
		}
	}
}

function switchtab(x) {//function called when clicking tabs, changes content
	document.getElementById('content_autobuyers').style.display = 'none'
	document.getElementById('content_upgrades').style.display = 'none'
	document.getElementById('content_reset').style.display = 'none'
	document.getElementById('tab_autobuyers').style.boxShadow = 'inset 0 0 0 2px #e9ec34'
	document.getElementById('tab_upgrades').style.boxShadow = 'inset 0 0 0 2px #e9ec34'
	document.getElementById('tab_reset').style.boxShadow = 'inset 0 0 0 2px #e9ec34'
	if (x == 0) {
		document.getElementById('content_autobuyers').style.display = 'block'
		document.getElementById('tab_autobuyers').style.boxShadow = openbottombox
	}
	if (x == 1) {
		document.getElementById('content_upgrades').style.display = 'block'
		document.getElementById('tab_upgrades').style.boxShadow = openbottombox
	}
	if (x == 2) {
		document.getElementById('content_reset').style.display = 'block'
		document.getElementById('tab_reset').style.boxShadow = openbottombox
	}
}

function hire(x) {//function called when buying an autobuyer
	if (game.money >= eval('game.worker' + x + 'cost')){
		game.money -= eval('game.worker' + x + 'cost')
		eval('game.worker' + x + '+= 1')
		eval('game.worker' + x + 'cost=Math.pow(game.worker' + x + 'cost, 1.1)')
		document.getElementById('ab_'+x+'_cost').innerHTML = eval('game.worker' + x + 'cost.toFixed(2)')
		document.getElementById('ab_'+x+'_indicator').innerHTML = eval('game.worker'+x)
		document.getElementById('indicator_money').innerHTML = game.money.toFixed(2)
	}	
}

function resetgame() {
	game.product = 0
	game.money = 0
	game.worker0 = 0
	game.worker1 = 0
	game.worker2 = 0
	game.worker3 = 0
	game.worker4 = 0
	game.worker0period = 1000
	game.worker1period = 9000
	game.worker2period = 80000
	game.worker3period = 700000
	game.worker4period = 6000000
	game.worker0mult = 1
	game.worker1mult = 10
	game.worker2mult = 100
	game.worker3mult = 1000
	game.worker4mult = 10000
	game.worker0cost = 10
	game.worker1cost = 100
	game.worker2cost = 1000
	game.worker3cost = 10000
	game.worker4cost = 100000
	game.sellprice = 0.5
	game.upgradeprices = [25,50,100,200,500,800,1000,1250, 1600,2100,3000,4000]
	game.resets += 1
	document.getElementById('reset_indicatorreal').innerHTML = game.resets;
}

function resetupgrade(x) {
	game.resetupgrades[x] += 1
	game.resets -= 1
	document.getElementById('reset_indicatorreal').innerHTML = game.resets;
}

setInterval(function(){
	game.timeelapsed += 0.1

	//enables/disables producers based on money
	for (var i=0;i<game.upgradeprices.length;i++) {
		if (game.money >= game.upgradeprices[i]) {
			$('#upgrade_'+i).prop('disabled', false)
		} else {
			$('#upgrade_'+i).prop('disabled', true)
		}
	}

	//enables/disables upgrades based on money
	$('#ab_0').prop('disabled', (game.money >= game.worker0cost) ? false : true)
	$('#ab_1').prop('disabled', (game.money >= game.worker1cost) ? false : true)
	$('#ab_2').prop('disabled', (game.money >= game.worker2cost) ? false : true)
	$('#ab_3').prop('disabled', (game.money >= game.worker3cost) ? false : true)
	$('#ab_4').prop('disabled', (game.money >= game.worker4cost) ? false : true)

	//main variable html changes
	document.getElementById('indicator_product').innerHTML = game.product.toFixed(0)
	document.getElementById('indicator_money').innerHTML = game.money.toFixed(2)

	if (game.money >= 7500) {
		$('#reset_button').prop('disabled', false)
		switchtab(2)
		$('#reset_upgrade0').prop('disabled', false)
		$('#reset_upgrade1').prop('disabled', false)
		$('#reset_upgrade2').prop('disabled', false)
	} else {
		$('#reset_button').prop('disabled', true)
		$('#reset_upgrade0').prop('disabled', true)
		$('#reset_upgrade1').prop('disabled', true)
		$('#reset_upgrade2').prop('disabled', true)
	}

	if (game.resets >= 1) {
		$('#reset_upgrade0').prop('disabled', false)
		$('#reset_upgrade1').prop('disabled', false)
		$('#reset_upgrade2').prop('disabled', false)
	} else {
		$('#reset_upgrade0').prop('disabled', true)
		$('#reset_upgrade1').prop('disabled', true)
		$('#reset_upgrade2').prop('disabled', true)
	}
},100)

//producers
function worker0func(){
	game.product += game.worker0*game.worker0mult
	setTimeout(worker0func, game.worker0period)
}
setTimeout(worker0func, game.worker0period/game.resetupgrades[1])

function worker1func(){
	game.product += game.worker1*game.worker1mult*game.resetupgrades[2]
	setTimeout(worker1func, game.worker1period/game.resetupgrades[1])
}
setTimeout(worker1func, game.worker1period/game.resetupgrades[1])

function worker2func(){
	game.product += game.worker2*game.worker2mult*game.resetupgrades[2]
	setTimeout(worker2func, game.worker2period/game.resetupgrades[1])
}
setTimeout(worker2func, game.worker2period/game.resetupgrades[1])

function worker3func(){
	game.product += game.worker3*game.worker3mult*game.resetupgrades[2]
	setTimeout(worker3func, game.worker3period/game.resetupgrades[1])
}
setTimeout(worker3func, game.worker3period/game.resetupgrades[1])

function worker4func(){
	game.product += game.worker4*game.worker4mult*game.resetupgrades[2]
	setTimeout(worker4func, game.worker4period/game.resetupgrades[1])
}
setTimeout(worker4func, game.worker4period/game.resetupgrades[1])