$(function () {
    getUserInfo()
let layer = layui.layer
    $('#btnlogout').on('click',function () {
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})
// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:3007/my/userinfo',
        headers:{
            Authorization: localStorage.getItem('token') || ''
        },
        success:function (res) {
            if(res.status!=0){
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            // 调用这个函数渲染用户头像
            renderAvatar(res.data)
        },
        // 未登录时候的，强制跳转 不让访问首页
        complete:function (res) {
            // console.log('执行了complete');
            // console.log(res.responseJSON);
            if(res.responseJSON.status=1 && res.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
            }
        }
    })
}
function renderAvatar(user) {
    // 1.获取用户的名称
    let name = user.nickname ||user.username
    // 2.设置欢迎的文本信息
    $('#welcome').html('欢迎&nbsp,'+name)
    if(user.user_pic!=null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}