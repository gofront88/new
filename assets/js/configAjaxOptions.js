//在发起请求时，对请求的配置进行预处理
$.ajaxPrefilter(function(options) {
    //在监听到ajax发起请求时，把网址，和请求地址进行拼接,
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 给需要权限访问的请求地址，配置请求头，携带服务器需要的参数
    // 请求地址如果包含 /my 则表示请求的是有权限的接口，就添加请求头
    if (options.url.indexOf('/my') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //当用户强行url跳转需要权限访问的页面时，查看当前页面ajax的返回数据，如果失败跳转到登录页面，并清空token
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})