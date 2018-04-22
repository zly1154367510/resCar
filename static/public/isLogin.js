$(document).ready(function(){
	var username = localStorage.getItem("username")
	var token = localStorage.getItem(username)
	var requestJson={
		"username":username
	}
	$.ajax(
		url:"http://localhost:8081/check/isLogin", 
		data:JSON.Stringif
		)
})