$(document).ready(function () {
    var btn = 1;
    var s;
    $('#fir').hide();

    var func = function (id) {
        $('#fir').hide();
        $("#list  tr:not(:first)").html("");
        $('li').removeClass('current');
        $(id).addClass('current');
    }
    var btn1 = function () {
        if (btn != 1) {
            btn = 1;
            var id = '#func1';
            func(id);
            s = 'find=1';
            getTable(s, ShowOrder);
        }
    }
    var btn2 = function () {
        if (btn != 2) {
            btn = 2;
            var id = '#func2';
            func(id);
            s = 'find=2';
            getTable(s, ShowOrder);
        }
    }
    btn1();
    $("#func1").click(function () {
        btn1();
    });

    $("#func2").click(function () {
        btn2();
    });

    var getTable = function (s, f) {
        $.ajax({
            type: "GET",
            url: "../php/boundary/teacher.ShowOrder.php",
            data: s + '&func=1',
            datatype: "json",
            beforeSend: function () {
            },
            success: function (msg) {
                if (msg) {
                    var result = eval("(" + msg + ")");
                    f(result);
                }
                else {
                    alert('没有满足条件的预约');
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                alert("加载失败");
            }
        })
    };
    var StuMsg = function (id) {
        $.ajax({
            type: "GET",
            url: "../php/boundary/teacher.ShowOrder.php",
            data: { func: 2, id: id },
            datatype: "json",
            beforeSend: function () {
            },
            success: function (msg) {
                if (msg) {
                    $('.mask').removeClass('hide');
                    $('.mask').addClass('show');
                    var result = eval("(" + msg + ")");
                    var str = '';
                    $.each(result, function (index, value) {   // 解析出data对应的Object数组  
                        var key;
                        if (index != 'sid') {
                            switch (index) {
                                case 'name': key = '学生姓名'; break;
                                case 'sex': key = '性别'; break;
                                case 'dept': key = '院系'; break;
                                case 'tel': key = '手机号'; break;
                                default:
                                    break;
                            }
                            str += '<label>' + key + ':</label>  <span> ' + value + '</span>';
                        }
                    });
                    $("#detail").html(str);
                    $('#prompt_close').click(function () {
                        $('.mask').removeClass('show');
                        $('.mask').addClass('hide');
                    })
                }
                else {
                    $("#detail").html('');
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                $("#main").html("加载失败");
            }
        })
    };
    var ShowOrder = function (result) {
        $('#fir').show();
        $.each(result, function (index, value) {
            var str = '<tr>';
            $.each(value, function (key, value2) {
                if (key == 'sid' || key == 'date' || key == 'T' || key == 's_msg') {
                    switch (value2) {
                        case 'T1': value2 = '8:00-9:00'; break;
                        case 'T2': value2 = '9:00-10:00'; break;
                        case 'T3': value2 = '10:00-11:00'; break;
                        case 'T4': value2 = '14:00-15:00'; break;
                        case 'T5': value2 = '15:00-16:00'; break;
                        case 'T6': value2 = '16:00-17:00'; break;
                        default:
                            break;
                    }
                    str += '<td>' + value2 + '</td>';
                }
            });
            str += "<td><span>查看详情</span></td></tr>";
            $("#list").append(str);
        });

        $('#list tr td').find('span').click(function () {
            sid = $(this).parent().parent().find('td:eq(0)').text();
            tname = $(this).parent().parent().find('td:eq(1)').text();
            StuMsg(sid);
        });

    }

})