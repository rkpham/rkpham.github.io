var	code = new Decimal(0)
var money = new Decimal(0)
var programmers = 0
var clickmultiplier = new Decimal(1)
var compilemultiplier = new Decimal(1)

var programmercost = 50
var maxbasemoney = 30
var basemoneycurve = 1000

function calcfunc(lines, errors) { //x is lines, m is upgrade, e is # of errors
	return ((maxbasemoney-(basemoneycurve/(lines+(basemoneycurve/maxbasemoney)))))-(((errors/lines)/2)*(maxbasemoney-(basemoneycurve/(lines+(basemoneycurve/maxbasemoney)))))
}

function calcerrors(lines) { 
	return Math.floor(Math.random()*Math.round(lines))
}

function writecode() {
	code = code.add(1)
	programmable = true
	document.getElementById("numcode").innerHTML = code.toFixed(1)
	$("#programbutton").attr("class", "btn interact")
}

function programcode() {
	if (code >= 1) {
		let errors = calcerrors(code.toNumber())
		let moneyearned = calcfunc(code.toNumber(), errors)
		let errorpercent = (errors/code.toNumber())*50

		$("#programbutton").attr("class", "btndisable")
		code = new Decimal(0)
		money = money.add(Math.round(moneyearned*100)/100)
		document.getElementById("numcode").innerHTML = "0.0"
		document.getElementById("nummoney").innerHTML = money.toFixed(2)
		document.getElementById("numerrors").innerHTML = errors
		document.getElementById("moneygot").innerHTML = moneyearned.toFixed(2)
		document.getElementById("errorpercentage").innerHTML = errorpercent.toFixed(2)
		if (money >= programmercost) {
			$("#programmer").attr("class", "btn interact")
		}
	}
}

function hireprogrammer() {
	if (money >= programmercost) {
		money = money.sub(programmercost)
		programmers += 1
		document.getElementById("nummoney").innerHTML = money.toFixed(2)
		document.getElementById("numprogrammers").innerHTML = programmers
	} else {
		$("#programmer").attr("class", "btndisable")
	}
}

function hiremanager() {

}

setInterval(function() {
	code = code.add(programmers*0.005)
	document.getElementById("numcode").innerHTML = code.toFixed(1)
	document.getElementById("nummoney").innerHTML = money.toFixed(2)
	document.getElementById("numprogrammers").innerHTML = programmers

	if (money >= programmercost) {
		$("#programmer").attr("class", "btn interact")
	} else {
		$("#programmer").attr("class", "btndisable")
	}
	if (code >= 1) {
		$("#programbutton").attr("class", "btn interact")
	} else {
		$("#programbutton").attr("class", "btndisable")
	}
}, 10)