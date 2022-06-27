$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function (value) {
            if(value.length >6){
                return ('用户昵称必须在6个字符以内')
            }
        }
    })

    function initUserInfo() {
        $.ajax({
            method:'GET',
            url:'http://127.0.0.1:3007/my/userinfo',
            headers:{
                Authorization: localStorage.getItem('token') || ''
            },
            success:function (res) {
                if(res.status!=0){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                
                form.val('formUserInfo', res.data);
            }
        })
   
    }
    $('.btnreset').on('click',function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo()
        
    })

    $('.layui-form')
})