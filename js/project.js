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
					$(".loginOut h5 a").text("注销");
					$(".shappingCar h5 a").text("购物车")
					//console.log(token)
					ajaxData = {
						"username":username,
						"token":token
					}
					$(document).on("click",".loginOut",function(){
						$.ajax({
							url:"http://localhost:8081/mi/logOut",
							type:"POST",
							dataType:"json",
							//contentType:"application/json;charset=utf-8",
							data:ajaxData,
							success:function(){
								localStorage.removeItem("username");
								localStorage.removeItem("token")
								alert("注销成功")
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
				 				if (XMLHttpRequest.status==500) {
				 					alert("服务器错误")
				 		}
	                        
	                }
						})
					})
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