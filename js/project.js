$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	if (localStorage.getItem("username")!=null) {
		var username = localStorage.getItem("username")
		var token = localStorage.getItem(username)
		var requestJson={
			"username":username
		}
		$.ajax({
			url:"http://localhost:8081/check/isLogin", 
			data: JSON.stringify(requestJson),
			type:"POST",
			dataType:"json",
			contentType:"application/json;charset=utf-8",
			success:function(data){
				console.log(data)
				if (data.status==200) {
					$(".username h3").text("欢迎"+username)
				}else if(data.status==401){
					alert("登录超时请重新登录")
					newHtml = "<a href='http://localhost/resCar/user/login/login.html'>登录</a>"
					$(".username h3").append(newHtml)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 		if (XMLHttpRequest.status==500) {
				 			alert("服务器错误")
				 		}
	                        
	                }
		})
	
	}else{
		newHtml = "<a href='http://localhost/resCar/user/login/login.html'>登录</a>"
					$(".username h3").append(newHtml)
	}	


})