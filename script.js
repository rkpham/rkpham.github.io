var title = document.getElementById("Title")
var num = Cookies.get("NumClicks")
title.innerHTML = "You have clicked the button "+num+" times"

function change() {
	num++
	title.innerHTML = "You have clicked the button "+num+" times"

	Cookies.set("NumClicks", num)
}