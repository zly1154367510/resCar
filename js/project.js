$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	if (localStorage.getItem("username")!=null) {
		var username = localStorage.getItem("username")
		var token = localStorage.getItem(username)
		$(".username h3").text("欢迎"+username)
	}else{
		$(".username h3").text("尚未登陆")
	}	
	
})