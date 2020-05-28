$(document).ready(function () {
  var role = 1;
  $("#student").click(function () {
    role = 1;
    $(this).addClass("current");
    $("#teacher").removeClass("current");
    $('#btn').val('学生登录');
  });

  $("#teacher").click(function () {
    role = 2;
    $(this).addClass("current");
    $("#student").removeClass("current");
    $('#btn').val('教师登录');
  });


  $('#btn').click(function () {
    var u = $.trim($('#username').val());
    var p = $.trim($('#password').val());
    $('#txtHint').html("");
    if (u == "" || p == "") {
      $('#txtHint').html("请输入用户名或密码");
      console.log("null");
      return;
    }

    var str = "username=" + u + "&password=" + p + "&role=" + role;
    $.ajax({
      type: "POST",
      url: "../php/boundary/Login.php",
      data: str,
      datatype: 'json',
      beforeSend: function () {
      },
      success: function (data) {
        var msg = eval("(" + data + ")");
        if (msg['state'] == 'ok') {
            window.location.href = msg['url'];
        }
        else {
          alert("用户名或密码错误！");
        }
      },
      error: function (XMLHttpRequest, textStatus, thrownError) {
      }
    });
  });
});
