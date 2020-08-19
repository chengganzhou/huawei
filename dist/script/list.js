// 加载列表数据，并传送数据 

$.ajax({
    url:"../data/listcont.json",
    type:"get",
    dataType:"json",
    success:function(json){
      // 加载完数据，按综合排序，没有库存的放后面
      $('.listmain').html('');
      json.sort(function(a,b){
        return parseInt(b.goods)-parseInt(a.goods);
    })
      loadList(json);
      Assoc(json);//给热度排名传数据
      Price(json);//给价格排名传数据
      New(json);//给最新排名传数据
      Total(json)//给综合排名传数据
      lowPrice(json)//给价格区间传数据
      }
    })

     // 加载底部  
     $(".head").load("../pages/head.html");
     // 加载底部
     $(".foot").load("../pages/foot.html");
    // 点击跳转到详情页
    $(".listmain").on("click","li",function(){
      let id=$(this).attr("key");
      setCookie({
        key:"id",
        val:id,
        day:1,
      })
      location.href="../pages/detail.html";//跳转
    })
    // 点击热度排名
    function Assoc (data){
      $(".hot").click(function(){
        $('.listmain').html('');
        // sort按照commont来排序
      data.sort(function(a,b){
          return parseInt(b.comment)-parseInt(a.comment)
      })
      loadList(data);
      }) 
    }
    // 点击按价格排名
    function Price (data){
      $(".price").click(function(){
        $('.listmain').html('');
      data.sort(function(a,b){
          return parseInt(a.price.slice(1))-parseInt(b.price.slice(1))
      })
      loadList(data);
      }) 
    }

    // 点击按最新排名
    function New (data){
      $(".new").click(function(){
        $('.listmain').html('');
      data.sort(function(a,b){
          return b.new- a.new;
      })
      loadList(data);
      }) 
    }
     // 按综合排名
    function Total (data){
      $(".total").click(function(){
        $('.listmain').html('');
        data.sort(function(a,b){
          return parseInt(b.goods)-parseInt(a.goods);
          console.log(goods)
      })
        loadList(data);
    
      }) 
    }
  
// 点击排序切换字体颜色
    $(".assoc").on("click",'em',function(){
      $(this).addClass("active").siblings("em").removeClass('active');
    })

    // 显示价格区间
    function lowPrice(data){
      $(".pricelist").on("click","input",function(){
        $('.listmain').html('');
        if($(this).prop('checked')){
          let low=$(this).parent().text().split("-")[0];
          let height=$(this).parent().text().split("-")[1];
          var num= data.filter(function(item){
            return parseInt(item.price.slice(1))>=low && parseInt(item.price.slice(1))<=height; })
            // console.log(num)
          // 判断几个选项都打勾，就全选
          if($('.lowPrice').prop('checked') && $('.heightPrice').prop('checked') ){
                num=data;
             }else{
             }
          loadList(num);
        }
        else{
          loadList(data);
        }
      })
    }

  // 移到列表上，列表变高
  $(".listmain").on("mouseenter",'li',function(){
    $(this).animate({"top":"-3px"},200);
  })
  $(".listmain").on("mouseleave",'li',function(){
    $(this).animate({"top":"0px"},200);
  })

// 通用的加载数据的函数
    function loadList(datalist
      ){
      for(var i=0;i<datalist
        .length;i++){
          var str='';
       var arr= datalist
       [i].display
       str='';
      //  循环遍历福利里面的数据
     $.each(arr,function(index,item){
        str+=`
        <span class="display1">${item}</span>`;
     })
     var str1='';
      //  进行分类判断，是否有货，是否有更多，是否是新品，
     if(datalist
      [i].more==1){
      if(datalist
        [i].goods==0){
           if(datalist
            [i].new==1){
            //  有更多，有货物，有新品
             str1+=
                  ` <li key="${datalist
                    [i].id}">
                    <div class="listBox">
                  <img src="${datalist
                    [i].scr}" alt="">
                  <b>暂时缺货</b>
                  <h4>${datalist
                    [i].name}</h4>
                  <p>${datalist
                    [i].price} <i>多款可选</i></p>
                  <div class="display">
                   ${str}
                  </div>
                  <div class="commont">
                      <em>${datalist
                        [i].comment}</em>
                       <em>${datalist
                        [i].goodCommont}</em>
                  </div>
                  <div class="new">
                      新品上市
                  </div>
                  </div>
              </li>`

           }else{
             //  有更多，有货物，无新品
             str1+=
                  ` <li key="${datalist
                    [i].id}">
                    <div class="listBox">
                  <img src="${datalist
                    [i].scr}" alt="">
                  <b>暂时缺货</b>
                  <h4>${datalist
                    [i].name}</h4>
                  <p>${datalist
                    [i].price} <i>多款可选</i></p>
                  <div class="display">
                   ${str}
                  </div>
                  <div class="commont">
                      <em>${datalist
                        [i].comment}</em>
                       <em>${datalist
                        [i].goodCommont}</em>
                  </div>
                  </div>
              </li>`
           }
      }else if(datalist
        [i].goods==1){
       if(datalist
        [i].new==1){
         //  有更多，无货物，有新品
         str1+=
              ` <li key="${datalist
                    [i].id}">
                <div class="listBox">
              <img src="${datalist
                [i].scr}" alt="">
              <h4>${datalist
                [i].name}</h4>
              <p>${datalist
                [i].price} <i>多款可选</i></p>
              <div class="display">
               ${str}
              </div>
              <div class="commont">
                  <em>${datalist
                    [i].comment}</em>
                   <em>${datalist
                    [i].goodCommont}</em>
              </div>
              <div class="new">
                  新品上市
              </div>
              </div>
          </li>`
       }else{
         //  有更多，无货物，无新品
         str1+=
         ` <li key="${datalist
                    [i].id}">
          <div class="listBox">
         <img src="${datalist
          [i].scr}" alt="">
         <h4>${datalist
          [i].name}</h4>
         <p>${datalist
          [i].price} <i>多款可选</i></p>
         <div class="display">
          ${str}
         </div>
         <div class="commont">
             <em>${datalist
              [i].comment}</em>
              <em>${datalist
                [i].goodCommont}</em>
         </div>
         </div>
     </li>`
       }
      }
 }else if(datalist
  [i].more==0){
   if(datalist
    [i].goods==0){
     if(datalist
      [i].new==1){
       //  无更多，有货物，有新品
         str1+=
                     ` <li key="${datalist
                    [i].id}">
                    <div class="listBox">
                     <img src="${datalist
                      [i].scr}" alt="">
                     <b>暂时缺货</b>
                     <h4>${datalist
                      [i].name}</h4>
                     <p>${datalist
                      [i].price} </p>
                     <div class="display">
                       ${str}
                     </div>
                     <div class="commont">
                         <em>${datalist
                          [i].comment}</em>
                           <em>${datalist
                            [i].goodCommont}</em>
                     </div>
                     <div class="new">
                         新品上市
                     </div>
                     </div>
                 </li>`
     }else{
       //  无更多，有货物，无新品
        str1+=
      ` <li key="${datalist
                    [i].id}">
      <div class="listBox">
      <img src="${datalist
        [i].scr}" alt="">
      <b>暂时缺货</b>
      <h4>${datalist
        [i].name}</h4>
      <p>${datalist
        [i].price} </p>
      <div class="display">
       ${str}
      </div>
      <div class="commont">
          <em>${datalist
            [i].comment}</em>
           <em>${datalist
            [i].goodCommont}</em>
      </div>
      </div>
  </li>`
     }
           
   }else if(datalist
    [i].goods==1){
     if(datalist
      [i].new==1){
       //  无更多，无货物，有新品
        str1+=
      ` <li key="${datalist
                    [i].id}">
      <div class="listBox">
      <img src="${datalist
        [i].scr}" alt="">
      <h4>${datalist
        [i].name}</h4>
      <p>${datalist
        [i].price} </p>
      <div class="display">
       ${str}
      </div>
      <div class="commont">
          <em>${datalist
            [i].comment}</em>
           <em>${datalist
            [i].goodCommont}</em>
      </div>
      <div class="new">
          新品上市
      </div>
      </div>
  </li>`
     }else{
         //  无更多，无货物，无新品
       str1+=
       ` <li key="${datalist
                    [i].id}">
      <div class="listBox">
       <img src="${datalist
        [i].scr}" alt="">
       <h4>${datalist
        [i].name}</h4>
       <p>${datalist
        [i].price} </p>
       <div class="display">
        ${str}
       </div>
       <div class="commont">
           <em>${datalist
            [i].comment}</em>
            <em>${datalist
              [i].goodCommont}</em>
       </div>
       </div>
   </li>`
     }
   }
 }
  $('.listmain').append($(str1));
    }
    }
   
          
    // 点击调整详情页
    $(".listmain").on("click","li",function(index,item){
      // 把li上面的id传给cookie
        let id=$(this).attr("key");
        setCookie({
          key:"id",
          val:id,
          days:1
      });
      

    })

      
      

    


