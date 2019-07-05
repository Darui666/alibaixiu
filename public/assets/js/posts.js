// 把数据库当中文章获取数据，并且渲染页面
$.ajax({
  type:'get',//get或post
  url:'/posts/',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('wordContens',{data:result.records});
    $('#word-contents').html(html)
  }
})
// 删除文章操作
// 利用事件委托给TBODY加点击事件，然后获取你要删除的id
$('#word-contents').on('click','.delete',function(){
  // 获得你要删除的ID
  var id = $(this).attr('data-id');
  // 利用ajax从数据库获得你要删除的id
  $.ajax({
    type:'delete',//get或post
    url:'/posts/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();
    }
  })
})
// 修改文章操作
$('#word-contents').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  console.log(id)
  $.ajax({
    type:'put',//get或post
    url:'/posts/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result);
      // location.href = 'post-add.html'
    }
  })

})