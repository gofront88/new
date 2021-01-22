$(function() {
    getUserinfo()

    $('#exitBtn').on('click', function() {
        console.log(11);
        layui.layer.confirm('确定要退出吗', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
                //不知道什么的干活
            layer.close(index);
        });
    })
})

//发起请求，获取用户信息
function getUserinfo() {
    $.ajax({
        url: "/my/userinfo",
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

//更具服务器返回的数据渲染用户头像和名称
function renderAvatar(user) {
    let uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_img').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = uname.slice(0, 1).toUpperCase()
        $('.text_img').html(first).show()
    }
}