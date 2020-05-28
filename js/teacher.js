
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "../php/tool/role.php",
        beforeSend: function () {
        },
        success: function (msg) {
            if (msg != "") {
                $("#uid").html("您好，" + msg + "老师");
            }
            else {
                $("#uid").html("请登录！");

            }
        },
        error: function (XMLHttpRequest, textStatus, thrownError) {
        }
    });

    $("#func1").click(function () {
        $("li").removeClass("current");
        $(".fra").removeClass("show");
        $(this).addClass("current");
        $("#personal").addClass("show");

    });

    $("#func2").click(function () {
        $("li").removeClass("current");
        $(".fra").removeClass("show");
        $(this).addClass("current");
        $("#timetable").addClass("show");
    });
    
    $("#func3").click(function () {
        $("li").removeClass("current");
        $(".fra").removeClass("show");
        $(this).addClass("current");
        $("#order").addClass("show");
    });

    $("#func4").click(function () {
        $("li").removeClass("current");
        $(".fra").removeClass("show");
        $(this).addClass("current");
        $("#newmsg").addClass("show");
    });

    $("#exit").click(function () {

    });

})