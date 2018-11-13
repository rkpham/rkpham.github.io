var title = document.getElementById("Title")
var num = Cookies.get("NumClicks") || 1

function change() {
	title.innerHTML = "You have clicked the button "+num+" times"
	num++

	Cookies.set("NumClicks", num)
}