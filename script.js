var game = {
	product: 0,
	money: 0,
	worker0: 0,
	worker1: 0,
	worker2: 0,
	worker3: 0,
	worker4: 0,
	worker0unlocked: false,
	worker1unlocked: false,
	worker2unlocked: false,
	worker3unlocked: false,
	worker4unlocked: false,
	worker0timer: 0,
	worker1timer: 0,
	worker2timer: 0,
	worker3timer: 0,
	worker4timer: 0,
	worker0period: 100,
	worker1period: 900,
	worker2period: 8000,
	worker3period: 70000,
	worker4period: 600000,
	worker0mult: 1,
	worker1mult: 20,
	worker2mult: 300,
	worker3mult: 4000,
	worker4mult: 50000,
	worker0cost: 10,
	worker1cost: 100,
	worker2cost: 1000,
	worker3cost: 10000,
	worker4cost: 100000,
	sellprice: 0.5,
	manualmult: 1,
	upgrades: [],
	upgradeprices: [25,50,100,200,500,800,1000,1250,1600,2000,2500,3100,3800,4600,5500,6500,7600,8800,10000,11500,13500,15000,17500,20000,25000,30000,45000,50000,65000,75000,100000,125000,150000,200000,250000,300000,350000,500000,1000000],
	resets: 0,
	resetupgrades: [0, 0, 0],
	timeelapsed: 0,
	totalmoney: 0,
	totalproduct: 0,
	milestones: [10, 25, 50, 75, 100, 150, 200, 250, 500, 750, 1000, 1500, 2000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 50000, 100000]
}

var lastproduct = 0
var lastmoney = 0
var productps = 0
var moneyps = 0

var openbottombox = 'inset 0 2px 0 0 #e9ec34, inset 2px 0 0 0 #e9ec34, inset -2px 0 0 0 #e9ec34'

function toggleinfo() {//called when clicking info at the bottom
	$('#overlay').css('display', (($('#overlay').css('display') == 'none') ? 'block' : 'none'))//ternary operator, switches between showing and not showing overlay
}

function createproduct() {//function called when clicking "Make A Lemonade"
	game.product += 1*game.manualmult
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
			game.manualmult += 1
		} else if (x == 1) {
			game.sellprice *= 1.5
		} else if (x == 2) {
			game.worker0mult *= 1.5
		} else if (x == 3) {
			game.worker1mult *= 1.5
		} else if (x == 4) {
			game.worker2mult *= 1.5
		} else if (x == 5) {
			game.worker3mult *= 1.5
		} else if (x == 6) {
			game.worker4mult *= 1.5
		} else if (x == 7) {
			game.manualmult += 3
		} else if (x == 8) {
			game.sellprice *= 2
		} else if (x == 9) {
			game.worker0period *= 0.5
		} else if (x == 10) {
			game.worker1period *= 0.5
		} else if (x == 11) {
			game.worker2period *= 0.5
		} else if (x == 12) {
			game.worker3period *= 0.5
		} else if (x == 13) {
			game.worker4period *= 0.5
		} else if (x == 14) {
			game.manualmult += 5
		} else if (x == 15) {
			game.sellprice *= 3
		} else if (x == 16) {
			game.worker0mult *= 2
		} else if (x == 17) {
			game.worker1mult *= 2
		} else if (x == 18) {
			game.worker2mult *= 2
		} else if (x == 19) {
			game.worker3mult *= 2
		} else if (x == 20) {
			game.worker4mult *= 2
		} else if (x == 21) {
			game.manualmult += 10
		} else if (x == 22) {
			game.sellprice *= 4
		} else if (x == 23) {
			game.worker0mult *= 4
		} else if (x == 24) {
			game.worker1mult *= 4
		} else if (x == 25) {
			game.worker2mult *= 4
		} else if (x == 26) {
			game.worker3mult *= 4
		} else if (x == 27) {
			game.worker4mult *= 4
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
	if (game.money >= game['worker' + x + 'cost']){
		game['worker' + x + 'unlocked'] = true
		game.money -= game['worker' + x + 'cost']
		game['worker' + x] += 1
	}
	for (var i = 0;i<game.milestones.length;i++) {
		if (game['worker' + x] == game.milestones[i]) {
			game['worker' + x + 'mult'] *= 2
			game['worker' + x + 'cost'] *= 10
			document.getElementById('ab_'+x+'_milestone').innerHTML = game.milestones[i+1].toFixed(0)
		}
	}
	document.getElementById('ab_'+x+'_cost').innerHTML = game['worker' + x + 'cost'].toFixed(2)
	document.getElementById('ab_'+x+'_indicator').innerHTML = game['worker' + x]
	document.getElementById('indicator_money').innerHTML = game.money.toFixed(2)
}

function resetgame() {
	game.product = 0
	game.money = 0
	game.worker0 = 0
	game.worker1 = 0
	game.worker2 = 0
	game.worker3 = 0
	game.worker4 = 0
	game.worker0unlocked = false
	game.worker1unlocked = false
	game.worker2unlocked = false
	game.worker3unlocked = false
	game.worker4unlocked = false
	game.worker0timer = 0
	game.worker1timer = 0
	game.worker2timer = 0
	game.worker3timer = 0
	game.worker4timer = 0
	game.worker0period = 100
	game.worker1period = 900
	game.worker2period = 8000
	game.worker3period = 70000
	game.worker4period = 600000
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
	game.manualmult = 1
	game.sellprice = 0.5
	game.upgradeprices = [25,50,100,200,500,800,1000,1250, 1600,2100,3000,4000]
	game.resets += 1
	document.getElementById('reset_indicatorreal').innerHTML = game.resets;
	for (var i=0;i<game.upgradeprices.length;i++) {
		document.getElementById('upgrade_'+i).style.display = 'inline-block'
	}
}

function resetupgrade(x) {
	game.resetupgrades[x] += 1
	game.resets -= 1
	document.getElementById('reset_indicatorreal').innerHTML = game.resets;
}

setInterval(function(){
	if (game.worker0unlocked) {
		game.worker0timer += 1
	}
	if (game.worker1unlocked) {
		game.worker1timer += 1
	}
	if (game.worker2unlocked) {
		game.worker2timer += 1
	}
	if (game.worker3unlocked) {
		game.worker3timer += 1
	}
	if (game.worker4unlocked) {
		game.worker4timer += 1
	}

	if (game.worker0timer >= game.worker0period*Math.pow(0.99, game.resetupgrades[1])) {
		game.worker0timer = 0
		game.product += game.worker0*game.worker0mult*Math.pow(1.01, game.resetupgrades[2])
	}
	if (game.worker1timer >= game.worker1period*Math.pow(0.99, game.resetupgrades[1])) {
		game.worker1timer = 0
		game.product += game.worker1*game.worker1mult*Math.pow(1.01, game.resetupgrades[2])
	}
	if (game.worker2timer >= game.worker2period*Math.pow(0.99, game.resetupgrades[1])) {
		game.worker2timer = 0
		game.product += game.worker2*game.worker2mult*Math.pow(1.01, game.resetupgrades[2])
	}
	if (game.worker3timer >= game.worker3period*Math.pow(0.99, game.resetupgrades[1])) {
		game.worker3timer = 0
		game.product += game.worker3*game.worker3mult*Math.pow(1.01, game.resetupgrades[2])
	}
	if (game.worker4timer >= game.worker4period*Math.pow(0.99, game.resetupgrades[1])) {
		game.worker4timer = 0
		game.product += game.worker4*game.worker4mult*Math.pow(1.01, game.resetupgrades[2])
	}
	
	document.getElementById('ab_0_progress').style.width = ((game.worker0timer/game.worker0period)*100)+'%'
	document.getElementById('ab_1_progress').style.width = ((game.worker1timer/game.worker1period)*100)+'%'
	document.getElementById('ab_2_progress').style.width = ((game.worker2timer/game.worker2period)*100)+'%'
	document.getElementById('ab_3_progress').style.width = ((game.worker3timer/game.worker3period)*100)+'%'
	document.getElementById('ab_4_progress').style.width = ((game.worker4timer/game.worker4period)*100)+'%'

	//enables/disables upgrades based on money
	for (var i=0;i<game.upgradeprices.length;i++) {
		if (game.money >= game.upgradeprices[i]) {
			$('#upgrade_'+i).prop('disabled', false)
		} else {
			$('#upgrade_'+i).prop('disabled', true)
		}
	}

	//enables/disables producers based on money
	for (var i=0;i<4;i++) {
		if (game.money >= game['worker'+i+'cost']) {
			$('#ab_'+i).prop('disabled', )
		}
	}
	$('#ab_0').prop('disabled', (game.money >= game.worker0cost) ? false : true)
	$('#ab_1').prop('disabled', (game.money >= game.worker1cost) ? false : true)
	$('#ab_2').prop('disabled', (game.money >= game.worker2cost) ? false : true)
	$('#ab_3').prop('disabled', (game.money >= game.worker3cost) ? false : true)
	$('#ab_4').prop('disabled', (game.money >= game.worker4cost) ? false : true)

	//main variable html changes
	document.getElementById('indicator_product').innerHTML = game.product.toFixed(0)
	document.getElementById('indicator_money').innerHTML = game.money.toFixed(2)
	document.getElementById('ab_0_rateperiod').innerHTML = (game.worker0period/100).toFixed(2)
	document.getElementById('ab_1_rateperiod').innerHTML = (game.worker1period/100).toFixed(2)
	document.getElementById('ab_2_rateperiod').innerHTML = (game.worker2period/100).toFixed(2)
	document.getElementById('ab_3_rateperiod').innerHTML = (game.worker3period/100).toFixed(2)
	document.getElementById('ab_4_rateperiod').innerHTML = (game.worker4period/100).toFixed(2)
	document.getElementById('ab_0_ratemult').innerHTML = (game.worker0*game.worker0mult).toFixed(0)
	document.getElementById('ab_1_ratemult').innerHTML = (game.worker1*game.worker1mult).toFixed(0)
	document.getElementById('ab_2_ratemult').innerHTML = (game.worker2*game.worker2mult).toFixed(0)
	document.getElementById('ab_3_ratemult').innerHTML = (game.worker3*game.worker3mult).toFixed(0)
	document.getElementById('ab_4_ratemult').innerHTML = (game.worker4*game.worker4mult).toFixed(0)

	if (game.money >= 1000000) {
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
},10)