//聚焦显示边框，失去焦点变透明
$('.ipt').focus(function(){
   $(this).css("border-color","#22B1C6");
})
$('.ipt').blur(function(){
   $(this).css("border-color","transparent");
})
$('.pass').focus(function(){
   $(this).css("border-color","#22B1C6");
})
$('.pass').blur(function(){
    $(this).css("border-color","transparent");
 })
 $('.ipt').one("keydown",function(){
    $(this).val('');
})
$('.pass').one("keydown",function(){
    $(this).val('');
})
$('.pass').keyup(function(){
    form('.pass','密码123456');

  })
  $('.ipt').keyup(function(){
    form('.ipt','用户名xiaocuo');
    console.log(222)
    $(this).prop("type","text");

  })
function form(dom,cont){
    $(dom).prop("type","password");
    if($(dom).val()==''){
        $(dom).val(cont);
         $(dom).prop("type","text");
         $(dom).one("keydown",function(){
            $(dom).val('');
        })
    }
}
$('.sub').click(function(e){
    e.preventDefault();
    if($('.pass').val()=='' || $('.ipt').val()==''){
        alert('账号或者密码不能为空');
        return false;
    }
    $.ajax({
        url:'../data/login.json',
        type:"get",
        dataType:"json",
        success:function(data){
           $.each(data,function(index,item){
              if( $(".ipt").val()==item.user && $(".pass").val()==item.pass){
                    // 存用户名到cookie
                    setCookie({
                    key:"user",
                    val:"xiaocuo",
                    days:1
                    });
                    alert("登录成功");
                    location.href="../pages/index.html";//跳转到主页
              }else{
                  alert("用户或者密码不正确");
                  location.reload();//刷新重新输入
              }
           })
            
        }
    })
})