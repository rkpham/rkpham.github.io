var title = document.getElementById("Title")
var num = 0
if (typeof Cookies.get("NumClicks") == "number") {
	num = Cookies.get("NumClicks")
} else {
	Cookies.set("NumClicks", 0)
}

title.innerHTML = "You have clicked the button "+num+" times"

function change() {
	num++
	title.innerHTML = "You have clicked the button "+num+" times"

	Cookies.set("NumClicks", num)
}
