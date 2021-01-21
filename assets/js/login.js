$(function() {
    //点击去注册账号
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    //点击去登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //layui表单验证
    let form = layui.form
    form.verify({
        // 验证密码格式
        pwd: [/^\S{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 确定2次密码是否一致
        repwd: function(value) {
            if (value != $('.reg-box [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })

    let layer = layui.layer
        // 用户注册
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message, { time: 500 }, function() {
                    $('#link_login').click()
                })
            }
        })
    })

    // 用户登录
    $('#form-login').on('click', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})