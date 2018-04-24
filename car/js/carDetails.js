$(document).ready(function(){
	$(".header").load("http://localhost/resCar/static/public/header.html")
	var carId = localStorage.getItem("carId")
	//console.log(carId)
	var username = localStorage.getItem("username")
	var token = localStorage.getItem(username)
	var requestJson={
		"carId":carId
	}
	console.log(carId)


	$.ajax({
		url:"http://localhost:8081/car/getCarDatelis",
		type:"POST",
		dataType:"json",
		data:requestJson,
		success:function(data){
			console.log(data)
			
			if (data.status==200) {
				$("#brand h2").text(data.data.brand)
				$("#name h2").text(data.data.name)
				$("#mileage h3").text("表显里程："+data.data.mileage)
				$("#pYear h3").text("年份："+data.data.pYear)
				$("#price h3").text("价格（万）："+data.data.price)
				$("#address h3").text("地区："+data.data.store.address)
				$("#legalPerson h3").text("联系人："+data.data.store.legalPerson)
				$("#phoneNumber h3").text("电话："+data.data.store.phoneNumber)
				$("#accBtn").attr("id",data.data.id)
			}

		},
		error:function(){
			alert("服务器错误")
		}
	})

	$.ajax({
		url:"http://localhost:8081/carImages/getCarImages",
		type:"POST",
		dataType:"json",
		data:requestJson,
		success:function(data){
			console.log(data)
		
			var da = data.data
			if (data.status==200) {
					$("#item1 img").attr("src",da[0].imagesUrl);
					$("#item2 img").attr("src",da[1].imagesUrl);
					$("#item3 img").attr("src",da[2].imagesUrl);
			}

		},
		error:function(){
			alert("服务器错误")
		}
	})

	$("#accBtn").click(function(){
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
					if (data.data==null) {
						alert("未登录")
						location.href="http://localhost/resCar/user/login/login.html"
					}else{
						alert(data.data);
					}
					
				},
				error:function(error){
					console.log(error)
				}
			})
	})

	function initCarouselImages(imagesUrl){
		//<div class="item active"><img src="images/1.jpg" alt="" ></div>
		newHtml="";
		newHtml+="<div class='item'>"
		newHtml+="<img src="+imagesUrl+">"
		newHtml+="</div>"
		$("#benzLi").append(newHtml)
	}
    var top=$("#benzLi img").position().top;
     //获得图片离浏览器左端的距离
    var left=$("#benzLi img").position().left;

    $("#benzLi img").mouseenter(function(){
    	var imagesUrl = $(this).attr("src")
    	$("#blowUp img").attr("src",imagesUrl)
    })

    $("#benzLi img").mouseout(function(){
       $("#blowUp img").attr("src","")
    });

	// $("#benzLi img").mousemove(function(e){
	// 	console.log($(this).attr("src"))
	// 	$("#blowUp img").css({
	// 		 "top":e.clientY+200+"px",
 //             "left":e.clientX+200+"px",
 //             //放大镜中的图片
 //            "background-size":"800px 450px",
 //            "background-repeat":"no-repeat",
 //            "width":"500px",
 //            "height":"300px",
 //             //调整放大镜中的图片的位置
 //             "background-position":"-"+(e.clientX-left-51)+"px -"+(e.clientY-top-48)+"px",
 //             //放大图片
 //             "transform":"scale(1.5,1.5)"
	// 	})
		
	// })

	// $("#benzLi img").mouseenter(function(){
	// 	$("#blowUp img").attr("src",$(this).attr("src"))
 //         $("#blowUp img").show();
 //    });
 //    //鼠标移出图片时隐藏放大镜
 //    $("#benzLi img").mouseout(function(){
 //         $("#blowUp img").hide();
 //    });
})