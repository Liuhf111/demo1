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
            getTable(s, f1);
        }
    }
    var btn2 = function () {
        if (btn != 2) {
            btn = 2;
            var id = '#func2';
            func(id);
            s = 'find=2';
            getTable(s, f2);
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
            url: "../php/boundary/student.ShowOrder.php",
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
                    $("#main").html('没有满足条件的预约');
                }

            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                $("#main").html("加载失败");
            }
        })
    };
    var TeaMsg = function (id) {
        $.ajax({
            type: "GET",
            url: "../php/boundary/student.ShowOrder.php",
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
                        if (index != 'tid') {
                            switch (index) {
                                case 'name': key = '教师姓名'; break;
                                case 'sex': key = '性别'; break;
                                case 'dept': key = '院系'; break;
                                case 'prof': key = '职称'; break;
                                case 'tel': key = '手机号'; break;
                                case 'room': key = '办公室'; break;
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
    var Del=function (tid, date, time){
        $.ajax({
            type: "GET",
            url: "../php/boundary/student.ShowOrder.php",
            data: {func:3,tid:tid,date:date,time:time},
            datatype: "json",
            beforeSend: function () {
            },
            success: function (msg) {
                var result = eval("(" + msg + ")");
                if (result['state']=='ok') {
                    alert('删除成功!');
                }
                else {
                    alert('删除失败!');
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
            }
        })
    };
    var f1 = function (result) {
        $('#fir').show();
        $.each(result, function (index, value) {
            var str = '<tr>';
            $.each(value, function (key, value2) {
                if (key == 'tid' || key == 'date' || key == 'T' || key == 's_msg') {
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
            tid = $(this).parent().parent().find('td:eq(0)').text();
            tname = $(this).parent().parent().find('td:eq(1)').text();
            TeaMsg(tid);
        });
        
    }
    var f2 = function (result) {
        $('#fir').show();
        $.each(result, function (index, value) {
            var str = '<tr>';
            $.each(value, function (key, value2) {
                if (key == 'tid' || key == 'date' || key == 'T' || key == 's_msg') {
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
            str += "<td><span id='tea'>查看详情</span></td><td><span id='del'>取消预约</a></td></tr>";
            $("#list").append(str);
        });
        $('#list tr td').find('#tea').click(function () {
            tid = $(this).parent().parent().find('td:eq(0)').text();
            tname = $(this).parent().parent().find('td:eq(1)').text();
            TeaMsg(tid);
        });
        $('#list tr td').find('#del').click(function () {
            tid = $(this).parent().parent().find('td:eq(0)').text();
            date = $(this).parent().parent().find('td:eq(2)').text();
            time = $(this).parent().parent().find('td:eq(1)').text();
            switch (time) {
                case '8:00-9:00': time = 'T1'; break;
                case '9:00-10:00': time = 'T2'; break;
                case '10:00-11:00': time = 'T3'; break;
                case '14:00-15:00': time= 'T4'; break;
                case '15:00-16:00': time = 'T5'; break;
                case '16:00-17:00': time = 'T6'; break;
                default:
                    break;
            }
            Del(tid,date,time);
        });

    }

})