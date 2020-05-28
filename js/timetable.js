$(document).ready(function () {
    var d = new Date();
    var day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    $('#time').html("今天是 " + day);
    var update = 0;

    var inputTable = function () {
        $.ajax({
            type: "GET",
            url: "../php/boundary/teacher.TimeTable.php",
            data: {func:1},
            datatype: 'json',
            beforeSend: function () {
            },
            success: function (data) {
                var t = '';
                var val = '';
                var msg = eval("(" + data + ")");
                for (let i = 1; i < 7; i++) {
                    t = msg['T' + i].toString();
                    for (let j = 1; j < 6; j++) {
                        switch(t.substr(j - 1, 1)){
                            case '1': val = "空闲";break;
                            case '2': val = "已预约";break;
                            default: val = "×";
                        }
                        $("tr:eq(" + i + ") td:eq(" + j + ")").html(val);
                    }
                }
            }
        });
    }
    inputTable();
    $("#change").click(function () {
        update = 1;
        $("#change").html('修改中');
        $("td").click(function () {
            if (update == 0 || $(this).parent().find("td").index($(this)[0]) == 0 ||
                $(this).parent().parent().find("tr").index($(this)[0]) == 0) {
            }
            else {
                if ($(this).html() == "空闲")
                    $(this).html("×");
                else if ($(this).html() == "×")
                    $(this).html("空闲");
                else
                    alert('该时间段已预约，不可修改');
            }

        })
    });

    $("#submit").click(function () {
        $('.mask').removeClass('hide');
        $('.mask').addClass('show');
        $('.prompt_sure').click(function () {
            var arr = [];
            for (let i = 1; i < 7; i++) {
                var str = "";
                for (let j = 1; j < 6; j++) {
                    var val = $("tr:eq(" + i + ") td:eq(" + j + ")").html();
                    if (val == '×') str = str + '0';
                    else if (val == '空闲') str = str + '1';
                    else str = str + '2';
                }
                arr.push(str);
            }
            $.ajax({
                type: "GET",
                url: "../php/boundary/teacher.TimeTable.php",
                data: {
                    func:2,
                    T1: arr[0], T2: arr[1],
                    T3: arr[2], T4: arr[3],
                    T5: arr[4], T6: arr[5]
                },
                datatype: 'json',
                beforeSend: function () {
                    $('.mask').removeClass('show');
                    $('.mask').addClass('hide');
                },
                success: function (data) {
                    var msg = eval("(" + data + ")");
                    if (msg['state'] == "ok") {
                        console.log(msg['state']);
                        alert('修改成功！');
                    }
                    else {
                        alert('修改失败！');
                    }
                    update = 0;
                    $("#change").html('修改');
                    inputTable();
                }

            });
        });

        $('.prompt_cancel').click(function () {
            $('.mask').removeClass('show');
            $('.mask').addClass('hide');
        })

    });

});
