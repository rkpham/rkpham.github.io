var title = document.getElementById("Title")
var num = 0

title.innerHTML = "You have clicked the button "+num+" times"

function change() {
	if (Cookies.get("NumClicks") {
		if (num != Cookies.get("NumClicks") {
			num = Cookies.get("NumClicks")
		}
	}
	
	num++
	title.innerHTML = "You have clicked the button "+num+" times"

	Cookies.set("NumClicks", num)
}
