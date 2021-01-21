//在发起请求时，对请求的配置进行预处理
$.ajaxPrefilter(function(options) {
    //把网址，和请求地址进行拼接
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})