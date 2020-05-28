$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../php/boundary/GetMsg.php",
        beforeSend: function () {
            $(".msg .text").html('信息加载中。。。');
        },
        success: function (data) {
            var msg = eval("(" + data + ")");
            var str = '';
            $.each(msg, function (index, value) {   // 解析出data对应的Object数组  
                var key;
                switch (index) {
                    case 'sid': key = '学号'; break;
                    case 'tid': key = '学工号'; break;
                    case 'name': key = '姓名'; break;
                    case 'sex': key = '性别'; break;
                    case 'dept': key = '院系'; break;
                    case 'prof': key = '职称'; break;
                    case 'tel': key = '手机号'; break;
                    case 'room':key = '办公室'; break;
                    default:
                        break;
                }
                str += '<label>' + key + ':</label>  <span> ' + value + '</span>';
            });
            $(".msg .text").html(str);
        },
        error: function (XMLHttpRequest, textStatus, thrownError) {
            alert('加载出错')
        }
    });
})