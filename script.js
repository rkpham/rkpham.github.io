var title = document.getElementById("Title")
var num = 1
if Cookies.get("NumClicks") !== undefined {
	num = Cookies.get("NumClicks")
} else {
	num = 1
}

function change() {
	title.innerHTML = "You have clicked the button "+num+" times"
	num++

	Cookies.set("NumClicks", num)
}
