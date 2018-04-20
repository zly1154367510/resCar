$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	function loginBtnClick(username,password){
		var requestJson = {
			"username":username,
			"password":password
		}
		console.log(requestJson)
		$.ajax({
			url:"http://localhost:8081/login/loginUser",
			type:"POST",
			dataType:"json",
			contentType:"application/json;charset=utf-8",
			data: JSON.stringify(requestJson),
			success:function(data){
				console.log(data)
				if (data.status==200) {
					console.log(data.data.uuid);

					localStorage.setItem(data.data.username,data.data.uuid)
					localStorage.setItem("username",data.data.username)
					top.location = "http://localhost/resCar/project.html"
				}else if (data.status==401) {
					alert(data.msg)
				}
			},
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    },  
		})
	}
	$(".loginBtn").click(function(){
		//console.log("点击")
		loginBtnClick($("#usernameText").val(),$("#passwordText").val())
	})
	

})