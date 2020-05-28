$(document).ready(function () {
    var tid;
    var tname;
    $('#fir').hide();
    var btn = 1;

    var find = function (my, id) {
        $('#fir').hide();
        $("table  tr:not(:first)").html("");
        $("li").removeClass("current");
        $("#sel div").removeClass("show");
        $(my).addClass("current");
        $(id).addClass("show");
    }
    $("#find1").click(function () {
        if (btn != 1) {
            btn = 1;
            var my = '#find1';
            var id = '#dp';
            find(my, id);
        }
    });

    $("#find2").click(function () {
        if (btn != 2) {
            btn = 2;
            var my = '#find2';
            var id = '#detail';
            find(my, id);
        }
    });

    $("#find3").click(function () {
        if (btn != 3) {
            btn = 3;
            var id = '#time';
            var my = '#find3';
            find(my, id);
        }
    });

    var getTable = function (s) {
        $("table  tr:not(:first)").html("");

        $.ajax({
            type: "POST",
            url: "../php/boundary/student.SelectTea.php",
            data: s,
            datatype: "json",
            beforeSend: function () {
            },
            success: function (msg) {
                var result = eval("(" + msg + ")");
                if (result != "") {
                    $('#fir').show();
                    $.each(result, function (index, value) {
                        var str = '<tr>';
                        $.each(value, function (key, value2) {
                            if (key != 'password')
                                str += '<td>' + value2 + '</td>';
                        });
                        str += '</tr>'
                        $("#list table").append(str);
                    });
                    $("#list").find("tr").click(function () {
                        var trSeq = $(this).parent().find("tr").index($(this)[0]);
                        if (trSeq > 0) {
                            tid = $(this).find("td:eq(0)").text();
                            tname = $(this).find("td:eq(1)").text();
                            window.location.href = "order_time.html?tid=" + tid + "&tname=" + tname;
                        }
                    });
                }
                else {
                    $("#err").html('没有满足条件的教师');
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                $("#list").html("加载失败");
            }
        })
    };
    $("#btn1").click(function () {
        var d = $.trim($("#dept").val());
        var p = $.trim($("#profession").val());
        var str = "find=1&dept=" + d + "&profession=" + p;
        getTable(str);
    });
    $("#btn2").click(function () {
        var n = $.trim($("#name").val());
        if (n == "")
            alert("input name!");
        else{
            var str = "find=2&name=" + n;
            getTable(str);
        }
        
    });
    $("#btn3").click(function () {
        var d = $("#day").val();
        var t = $("#hour").val();
        var str = "find=3 & day=" + d + "& time=" + t;
        getTable(str);
    });


})