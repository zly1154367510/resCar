$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	initAjax(1)
	function addCC(carId){
		console.log(carId);
	}
	//发送ajax请求获取车辆列表
	function initAjax(pageNum1){
		//console.log("initHello")
		$("tbody").find("*").remove();
		$.ajax({
			url:"http://localhost:8081/car/getCarList/"+pageNum1,
			type:"GET",
			dataType:"json",
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
						newHtml+="<p>"+da[i].brand+"</p>"
						newHtml+="<p>"+da[i].name+"</p>"
						newHtml+="<p>"+da[i].mileage+"</p>"
						newHtml+="<p>"+da[i].pirce+"</p>"
						newHtml+="</td>"
						newHtml+="<td>"
						newHtml+="<p><a class='accBtn' id='"+da[i].id+"' >加入购物车</a></p>"
						newHtml+="</td>"
						newHtml+="</tr>"
						$("tbody").append(newHtml)			
					}
				}else{
					console.log("没有请求成功")
				}
			},
			error:function(error){
				alert(error.msg)
			}
		})
	}

	$.ajax({
		url:"http://localhost:8081/car/getCarCount",
		type:"GET",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		success:function(data){
			if(data.status=="200"){
				var pageNum = Math.ceil(data.data/20)
				var newHtml=""
				if (pageNum<7) {
					//console.log(pageNum)
					
					for(var i=0;i<pageNum;i++){
						newHtml+="<li class='pageNumBtn'><a href='#'>"+(i+1)+"</a></li>"
					}
					$(".pagination").append(newHtml)
				}else{
					for(var i=0;i<7;i++){
						newHtml+="<li class='pageNumBtn'><a href='#' >"+(i+1)+"</a></li>"
					}
					newHtml+="<li><a href='#'>.......</a></li>"
					for (var j = pageNum-7; j < pageNum; j++) {
						newHtml+="<li class='pageNumBtn'><a href='#'>"+(j+1)+"</a></li>"
					}
					//console.log(newHtml)
					$(".pagination").append(newHtml)
				}
				
			}else{
				console.log("没有请求成功")
			}
		},
		error:function(textStatus){
			console.log(textStatus)
			alert(textStatus)
		}
	})

	
	$(document).on("click",".pageNumBtn",function(){
		console.log($(this).text())
		initAjax($(this).text())
	})

	$(document).on("click",".accBtn",function(){
		//console.log($(this).attr("id"))
		var username = localStorage.getItem("username")
		var token = localStorage.getItem(username)
		var carId = $(this).attr("id")
		//console.log(username)
		$.ajax({
				url:"http://localhost:8081/mi/addShoppingCar",
				type:"POST",
				dataType:"json",
				
				data:{
						"username":username,
						"token":token,
						"carId":carId
					},
				success:function(data){
					//console.log(data)
					alert(data.data);
				}
			})
	})


})