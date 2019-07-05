// 向服务器发送请求，获取文章分类数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('categoryTPL',{data:result});
    $('#category').html(html)
  }
})
// 当管理员选择文件的时候，触发事件
$('#feature').on('change',function(){
  // 获取到管理员选择到的文件
  var file = this.files[0] 
  // 创建二formdata对象，实现二进制文件上传
  var formData = new FormData();
  formData.append('avatar', file);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // 告诉$ajax方法不要设置参数类型
    contentType:false,
    // 告诉$ajax方法不要处理data属性对应的参数
    processData:false,
    success:function(result){//成功的回调函数
      console.log(result);
      $('.thumbnail').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})
// 当添加文章表单提交的时候
$('#addForm').on('submit',function(){
  // 获取管理员在表单中输入的内容
  console.log($(this).serialize());
  // 向服务器发送请求，实现添加文章功能
  $.ajax({
    type:'post',//get或post
    url:'/posts',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // 文章添加成共 跳转到文章列表页面
      location.href = 'posts.html'
    }
  })
  return false;
})