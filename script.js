var title = document.getElementById("Title")
var num = 0
repeat (
do {
	num = Cookies.get("NumClicks")
}
while (typeof Cookies.get("NumClicks") != "number")
	

title.innerHTML = "You have clicked the button "+num+" times"

function change() {
	
	num++
	title.innerHTML = "You have clicked the button "+num+" times"

	Cookies.set("NumClicks", num)
}
