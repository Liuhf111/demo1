$(document).ready(function () {

    var d = new Date();
    var day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    $("header>span").html("Today is " + day);

    $('#reflesh').click(function () {
        window.location.reload();
    })
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    var tid = GetQueryString("tid");//调用
    var tname = GetQueryString("tname");
    $('h1').html(tname + '老师的时间表');
    var inputTable = function () {
        $.ajax({
            type: 'GET',
            url: "../php/boundary/student.ShowTable.php",
            data: { id: tid },
            datatype: 'json',
            beforeSend: function () {
            },
            success: function (data) {
                var w_day = d.getDay();
                var t = '';
                var val = '';
                var msg = eval("(" + data + ")");
                for (let i = 1; i < 7; i++) {
                    t = msg['T' + i].toString();
                    for (let j = 1; j < 6; j++) {
                        if (t.substr(j - 1, 1) == 1 && j > w_day) val = "可预约";
                        else val = "不可预约";
                        $("tr:eq(" + i + ") td:eq(" + j + ")").html(val);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                $("#list").html("加载失败");
            }
        })
    }
    inputTable();

    var order = function (day,time,msg) {
        $.ajax({
            type: "GET",
            url: "../php/boundary/student.SendOrder.php",
            data: { id: tid, day: day, time: time ,msg : msg},
            datatype: "json",
            beforeSend: function () {
            },
            success: function (data) {
                var msg = eval("(" + data + ")");
                console.log(msg);
                if (msg['state'] == "ok") {
                    alert('预约成功！');
                    window.location.reload();
                }
                else if (msg['state'] == "exit"){
                    alert('该时间您已有其他预约！');
                }
                else{
                    alert('预约失败，请稍后重试！');
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                $("#list").html("加载失败");
            }
        })
    }
    $("td").click(function () {
        var tdSeq = $(this).parent().find("td").index($(this)[0]);
        var trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0]);
        if ($(this).html() == '可预约') {
            $('.mask').removeClass('hide');
            $('.mask').addClass('show');
            $('.prompt_sure').click(function (){
                var msg = $.trim($('#s_msg').val());
                order(tdSeq,trSeq,msg);
                $('.mask').removeClass('show');
                $('.mask').addClass('hide');
            });
            $('.prompt_cancel').click(function () {
                $('.mask').removeClass('show');
                $('.mask').addClass('hide');
            })
        }
        else if (tdSeq > 0 && trSeq > 0) {
            alert('该时间段不可预约');
        }

    });
})