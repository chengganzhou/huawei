  // 加载底部  
  $(".head").load("../pages/head.html");
  // 加载底部
  $(".foot").load("../pages/foot.html");

  //  获取列表页传来的id
  let id = getCookie("id");

  // 拿取详情页全部数据
 ( function(){
  $.ajax({
    url:"../data/listcont.json",
    type:"get",
    dataType:'json',
    success:function(json){
      let obj='';
      for(let i=0;i<json.length;i++){
        if(json[i].id==id){
           obj=json[i];//拿到具体的数据
           render(obj);//将数据拿到外面加载
           mouse(obj);//把数据传给mouse函数
           editor(obj);//把数据传给切换套餐事件
           click(obj);//把数据传给点击左右小图
        }
      }
    }
  })
})()

// 渲染详情页

function render(data){
  let  arr=data.type1;//小轮播图片的数据
  let str='';
  let arrSale=data.sale;//促销的数据
  let arrSrt='';
  let editor=data.editor;
  let editorStr='';
  let recommend=data.recommond;
  let recommendStr='';
  // // 把下面轮播图的小图片渲染
  $.each(arr,function(index,item){
   str+=`  <img src="${item}" alt="">`
  })
  // 编辑促销活动的数据
  $.each(arrSale,function(index,item){
    arrSrt+=`    <dl>
    <dt>${item.key}</dt>
    <dd>${item.value}</dd>
</dl>`
   })
  //  编辑版本的数据
  $.each(editor,function(index,item){
    editorStr+=` <span keys=style${index+1}>${item}</span>`
   })
  //  编辑推荐的数据
  $.each(recommend,function(index,item){
    recommendStr+=`<a>${item}</a>`
   })
  $('.rollMain').html(str);
  $('.rollMain').find('img').eq(0).addClass("show");
  $('.smallBox>img').prop("src",arr[0]);//渲染小盒子里面的图片
  $('.bigBox').css("background",`#fff url(${arr[0]}) no-repeat`);//渲染大盒子里面的背景
  $(".contR>h2").html(data.name);//渲染标题
  $(".contR>a").html(data.activity);//渲染活动
  $(".contR>span").html(data.descript);//渲染描述
  $(".nowPrice").html(data.price);//渲染折后价
  $(".midSpan").html(data.displayPrice);//渲染折前价
  $('.displayMain').append(arrSrt);//渲染促销里面的活动
  $(".code> span").html(data.code);//渲染编码
  $(".color").append(`
  <p><img src="${data.color[0]}" alt=""><span>${data.color[1]}</span></p>
  `)//渲染颜色
  $('.color').find('p').eq(0).addClass("activeP");
  $(".editor").append(editorStr);//渲染版本信息
  $('.editor').find('span').eq(0).addClass("activeEdi");//给第一个添加边框
  $(".recommend").append(recommendStr);//渲染版本信息
  //把版本 颜色 套餐选定，放进已选商品里面
  $(".selGoods").find("span").eq(0).text($(".color span").eq(0).text()) ;
  $(".selGoods").find("span").eq(1).text($(".meal span").eq(0).text()) ;
  $(".selGoods").find("span").eq(2).text($(".editor span").eq(0).text()) ;
}
  //点击找到对应版本的数据
  function editor(data){
    let style='';
    $('.editor').on("click","span",function(){
      let keys=$(this).attr('keys')
     $.each(data,function(index,item){
       if(index==keys){
         style=item
         renderStyle(item);
         return false;
       }
     })
    })
    }
    // 点击版本渲染数据
   function renderStyle(data){
        let  arr1=data.type2;//小轮播图片的数据
        let str1='';
        let editor=data.editor2;
        let editorStr='';
       // 把下面轮播图的小图片渲染
       $.each(arr1,function(index,item){
        str1+=`  <img src="${item}" alt="">`
       })
       $('.rollMain').html("");
       $('.rollMain').html(str1);
        $('.rollMain').find('img').eq(0).addClass("show");
        $('.smallBox>img').prop("src",arr1[0]);//渲染小盒子里面的图片
        $(".nowPrice").html(data.price2);//渲染折后价
        $(".midSpan").html(data.displayPrice2);//渲染折前价
        $(".code> span").html(data.code2);//渲染编码
        $(".contR>h2").html(data.name2);//渲染标题
        mouse(data);
        click(data);
      }

  // 放大镜
  // 移入出现
  var bigBox=document.querySelector(".bigBox");
  var smallBox=document.querySelector(".smallBox");
  var mask=document.querySelector(".mask");
  $(".smallBox").mouseenter(function(e){
    $(this).find(".mask").css("display","block");
    $(".bigBox").css("display","block");
    $(".mask").mousemove(function(e){
      let offsetL=e.clientX-$(".smallBox").offset().left -0.5*$(".mask")[0].clientWidth
      let offsetT=e.clientY-$(".smallBox").offset().top -0.5*$(".mask")[0].clientHeight;
      if(offsetL<=0){
        offsetL=0;
    }
    if(offsetT<=0){
      offsetT=0;
    }
    if(offsetL>=smallBox.clientWidth-mask.clientWidth){
      offsetL=smallBox.clientWidth-mask.clientWidth;
    }
    if(offsetT>=smallBox.clientHeight-mask.clientHeight){
      offsetT=smallBox.clientHeight-mask.clientHeight;
    }
      $(this).css("left",offsetL+'px');
      $(this).css("top",offsetT+'px');
      bigBox.style.backgroundPositionX=-2*offsetL+'px';
      bigBox.style.backgroundPositionY=-2*offsetT+'px';
    })
  })
  // 移除消失
  $(".smallBox").mouseleave(function(){
    $(this).find(".mask").css("display","none");
    $(".bigBox").css("display","none");
  })

  // 下面小图轮播图
  // 划过添加边框
  function mouse(data){

$(".rollwrap").on("mouseenter","img",function(){
  $(this).addClass("show").siblings("img").removeClass('show');
 let  reg=new RegExp(/[0-9].png/g);
 let src=$(this).prop("src").match(reg)[0];
 $(".smallBox img" ).prop("src",`../image/${data.key}${src}`);//划过给替换小盒子里面的图
 $(".bigBox")[0].style.background=`#fff url(../image/${data.key}${src}) no-repeat`//划过给替换大盒子里面的背景
})
}
// 左点击，到了第一个就不会动了
function click(data){
let index=0;
$('.left').off("click");
$('.left').on("click",function(){
  num='';
  var num=$(".rollMain").find("img").length;
    index--;
    if(index<0){
      index=0
    }
    $('.rollwrap').animate({"scrollLeft":index*65},200)
})
// 右点击，到了最后一个就不会动了
$('.right').off("click");
$('.right').on("click",function(){
  var num=$(".rollMain").find("img").length;
  console.log(num)
  index++;
  if(index>num-5){
    index--;
    return false;
  }
  $('.rollwrap').animate({"scrollLeft":index*65},200)
})
}

// 划过撑开价格的盒子
$('.detailPrice').mouseenter(function(){
  $(this).height('300px');
  $('.reduce').find('dd').prop('display',"block");
})
$('.detailPrice').mouseleave(function(){
  $(this).height('237px');
})

// 划过选颜色款切换边框颜色以及下面的已选商品的轮换
$(".color").on("click",'p',function(){
  $(this).addClass("activeP").siblings('p').removeClass('activeP');
  $(".selGoods").find("span").eq(0).text($(this).text()) ;
})
// 划过选择标配以及下面的已选商品的轮换
$(".meal").on("click",'span',function(){
  $(this).addClass("activeSpan").siblings('span').removeClass('activeSpan');
  $(".selGoods").find("span").eq(1).text($(this).text()) ;
})
// 划过选版本款切换边框颜色以及下面的已选商品的轮换
$(".editor").on("click",'span',function(){
  $(this).addClass("activeEdi").siblings('span').removeClass('activeEdi');
  $(".selGoods").find("span").eq(2).text($(this).text()) ;
})

