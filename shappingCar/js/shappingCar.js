$(document).ready(function(){

	function getToken(key,value){
		var username = localStorage.getItem("username")
		var token = localStorage.getItem(username)
		var requestJson={
			"username":username,
			"token":token,
			key:value
		}
		return requestJson

	}

	$(".header").load("http://localhost/resCar/static/public/header.html")
	var username = localStorage.getItem("username")
	var token = localStorage.getItem(username)
	var requestJson={
		"username":username
	}
	initAjax(1)

	function initAjax(page){
		console.log(getToken("page",page))
		$.ajax({
			url:"http://localhost:8081/mi/getShappingCarList",
			type:"POST",
			dataType:"json",
			data:getToken("page",page),
			success:function(data){
				console.log(data)
				if(data.status=="200"){
					var len = data.data.length;
					var da = data.data;
					for (var i = 0; i < len; i++) {
						//console.log(da[i])
						var newHtml = ""
						newHtml+="<tr>"
						newHtml+="<td>"
						newHtml+="<img src='' class='carImgMi'>"
						newHtml+="</td>"
						newHtml+="<td>"
						newHtml+="<p>订单号:"+da[i].id+"</p>"
						newHtml+="<p>"+da[i].car.brand+"</p>"
						newHtml+="<p>"+da[i].car.name+"</p>"
						newHtml+="<p>"+da[i].car.mileage+"</p>"
						newHtml+="<p>生成时间:"+da[i].createTime+"</p>"
						newHtml+="</td>"
						newHtml+="<td>"
						newHtml+="<p><a class='delShappingCarBtn' id='del"+da[i].id+" "+da[i].car.id+"' >删除订单</a></p>"
						if (da[i].isPay=='0') {
							newHtml+="<td><p><a class='goPay' id='pay"+da[i].id+" "+da[i].car.id+"'>去支付</a></p></td>"
						}else{
							newHtml+="<td><p>已支付</p></td>"
						}
						newHtml+="</td>"
						newHtml+="</tr>"
						$("tbody").append(newHtml)			
					}
				}else{
					console.log("没有请求成功")
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 				if (XMLHttpRequest.status==500) {
				 					alert("服务器错误")
				 	}
				}
			
		})

	}

	$(document).on("click",".goPay",function(){
		var username = localStorage.getItem("username")
		var token = localStorage.getItem(username)
		var ids = $(this).attr("id").replace("pay","").split(" ")

		var requestJson={
			"username":username,
			"token":token,
			"sId":ids[0],
			"cId":ids[1]
		}
		
		$.ajax({
				url:"http://localhost:8081/mi/delShappingCar",
				type:"POST",
				dataType:"json",
				data:requestJson,
				success:function(data){
					alert(data.data)
				}
			})
	})
})