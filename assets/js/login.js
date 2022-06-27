$(function(){
    // 登录跳转注册逻辑
    $("#login").on("click", function(){
        $(".login-box").hide(),
        $(".reg-box").show()
    });
     
      // 注册跳转登录逻辑
  $('#reg').on('click',function(){
      $('.reg-box').hide(),
      $(".login-box").show()
  })
//   表单验证规则
// 从layui中获取form对象
    let form =layui.form
    let layer = layui.layer
  form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
      
      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if(value === 'xxx'){
        alert('用户名不能为敏感词');
        return true;
      }
    }
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  }); 
  // 监听注册表单的提交事件,无语子 form_reg和[]之间一定要有空格
  $('#form_reg').on('submit',function(e){
    // 阻止跳转
    e.preventDefault();
    console.log($('#form_reg[name=username]'));
    $.post("http://127.0.0.1:3007/api/reguser", {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
      console.log(res);
      if(res.status!=0){
        return layer.msg('注册失败')
      }layer.msg('注册成功')
     });
  })
  // $('#form_reg').submit(function (e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url:"http://127.0.0.1:3007/api/reguser",
  //     method:'POST',
  //     data:$(this).serialize(),
  //     success:function (res) {
  //       if(res.status!=0){
  //         return layer.msg('注册失败')
  //       }
  //       layer.msg('注册成功')
  //       location.href='/index.html'}
  //   })
  // })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url:"http://127.0.0.1:3007/api/login",
      method:'POST',
      data:$(this).serialize(),
      success:function (res) {
        if(res.status!=0){
          return layer.msg('登录失败')
        }
        layer.msg('登陆成功')
        console.log(res.token);
        localStorage.setItem('token',res.token)
        location.href='/index.html'
      }
    })
  })
 
  });