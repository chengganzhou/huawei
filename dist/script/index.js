if(getCookie("user")){
    $(".infor").html(`你好!${getCookie("user")}`).css("font-size","20px");
    $("#login").find('li').eq(0).html(`你好!${getCookie("user")}`).css("font-size","20px");
}

// banner 轮播图
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    effect : 'fade',
    autoplay: {
        disableOnInteraction: false,
      },
    //等同于以下设置
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  })  
  // 引入头部的底部
  $('.head').load("../pages/head.html") ;   
  // // 引入公共的底部
  $('.foot').load("../pages/foot.html") ;   
  var chanel=document.querySelector('.chanel');
  // 频道导航栏数据
  // ajax({
  //   type:'get',
  //   dataType:"json",
  //   url:'../data/chanel.json',
  //   success:function(data){
  //     var json=JSON.parse(data);
  //     console.log(json);
  //     json.forEach(function(item,index){
  //       var newdt=document.createElement('dt');
  //       newdt.innerText=item.title;
  //       item.value.forEach(function(value,key){
  //         var newdd=document.createElement('dd');
  //         newdd.innerText=value;
  //       })
  //       var newdl=document.createElement('dl');
  //       newdl.appendChild(newdt);
  //       // newdl.appendChild(newdd);
  //       chanel.appendChild(newdl);
  //     })
     

  //   }

  // })

  // banner图列表渲染
 $list= $(".banlist>ul ");
//  console.log($list)
 $list.on("mouseenter","li",function(){
  $('.banmain').html('').css("display","block");
  var id=$(this)[0].id;
  // console.log(id)
   $.ajax({
     type:'get',
     url:"../data/list.json",
     dataType:"json",
     success:function(data){
      // console.log(data)
      var newul=document.createElement('ul');
      var newul1=document.createElement('ul');
      var str='';
      var str1='';
      for(let i=0;i<data.length;i++){
          if(data[i].id==id){
            var num=data[i].main
            for(var k=0;k<num.length;k++){
              if(k<5){
                str+=`<li><img src="${num[k].title}" alt=""><span>${num[k].value}</span></li>`
              }
              else if(k>5){
                str1+=`<li><img src="${num[k].title}" alt=""><span>${num[k].value}</span></li>`
              }
            }
            $(newul).append($(str));
            $(newul1).append($(str1));
            $('.banmain').append($(newul));
            $('.banmain').append($(newul1));
            return false;
          }
      }
   }
     })
    })
    $('.banmain').mouseenter(function(){
      $('.banmain').css("display","block");
    })
  $('.banmain').mouseleave(function(){
    $('.banmain').css("display","none");
  })
  $list.mouseleave(function(){
    $('.banmain').css("display","none");
  })
    
  // 加载热门手机
  $.ajax({
    url:"../data/hotphone.json",
    type:'get',
    dataType:"json",
    success:function(data){
      var str="";
      $.each(data,function(index,item){
      str+=
          `  <li>
          <img src="${item.src}" alt="">
          <h4>${item.type}</h4>
          <p>${item.display}</p>
          <span>${item.price}</span>
      </li> `
      
      })
      $('.hotsphone').html($(str));
    
    }
  })


  // 加载华为手机
  $.ajax({
    url:"../data/huaweiphone.json",
    type:'get',
    dataType:"json",
    success:function(data){
      var str="";
      $.each(data,function(index,item){
      str+=
          `    <li>
          <img src="${item.src}" alt=""> 
          <h4>${item.type}</h4>
          <p>${item.display}</p>
          <b>${item.price}</b>
      </li> `
      })
      $('.huaweiphone').append($(str));
    }
  })

  // 配件渲染
  $.ajax({
    url:"../data/parts.json",
    type:'get',
    dataType:"json",
    success:function(data){
      var str="";
      $.each(data,function(index,item){
        str+=
            `    <li>
            <img src="${item.src}" alt=""> 
            <h4>${item.type}</h4>
            <p>${item.display}</p>
            <i>${item.price}</i>
        </li> `
        })
        $('.parts').append($(str));
      }
    })

    // 锚点滚动到指定位置
    $(".point").on("click","a",function(){
      $(this).addClass("active").parent().siblings().find("a").removeClass('active');
      let str=$(this).attr('href').slice(1);
      let num=$(`div[id=${str}]`).offset().top;
        $("html,body").animate({"scrollTop":num},800);
        $('.scroll').animate({"height":2},2);
        $('.scroll').animate({"top":52*$(this).parent().index(),"height":30},800);
    })
    // body滚动条运动，监测小滚动条的位置
    $(window).on("scroll",function(){
        // console.log($(window).css("scrollTop"));
    })

    // 公告滚动条
    var lis=document.querySelectorAll('.noticeList li');
    var noticeCont=document.querySelector('.noticeCont');
    let index=0;
    setInterval(function(){
      index++;
      if(index>=lis.length){
        index=0;
        noticeCont.scrollTop=0;
      }
      animate(noticeCont,{"scrollTop":index*24})
    },3500)

   
   


    
       
            
        

        

  
    
     
   
    
   
   
 
 
