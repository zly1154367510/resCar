$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	function registerBtnClick(username,password,passwordTo,phoneNumber,email){
		if (password != passwordTo) {
			alert("两次输入密码不一致")
		}else{
			var requestJson = {
				"username":username,
				"password":password,
				"phoneNumber":phoneNumber,
				"email":email,
				"role":1,
				"createTime":new Date()
			}
			console.log(requestJson)
			$.ajax({
				url:"http://localhost:8081/register/userRegister",
				type:"POST",
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				data: JSON.stringify(requestJson),
				success:function(data){
					console.log(data)
					if (data.status==200) {
						alert("注册成功")
						top.location = "http://localhost/resCar/project.html"
					}else if (data.status==401) {
						alert(data.msg)
					}
				},
				 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 		if (XMLHttpRequest.status==500) {
				 			alert("服务器错误")
				 		}
	                        
	                    },  
			})
		}
	}
	
	$(".registerBtn").click(function(){
		//console.log("点击")
		registerBtnClick(
			$("#usernameText").val(),
			$("#passwordText").val(),
			$("#passwordTextTo").val(),
			$("#phoneNumberText").val(),
			$("#emailText").val(),
			)
	})
	

})