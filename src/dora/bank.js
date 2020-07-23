/*
 * @Author: your name
 * @Date: 2020-06-01 18:46:15
 * @LastEditTime: 2020-07-06 17:27:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\dora\bank.js
 */ 
$(function () {
    $(".btn-top-back").on("click", function () {
        history.back();
    })
    $(".btn-reflesh").on("click", function () {
        location.reload();
    })
})

// 银行选择
var banks = {
    title: "选择开户银行",
    items: [
        {
            title: "中国工商银行",
            value: "001",
        },
        {
            title: "中国建设银行",
            value: "002",
        },
        {
            title: "中国银行",
            value: "003",
        },
        {
            title: "中国农业银行",
            value: "004",
        },
        {
            title: "中国民生银行",
            value: "005",
        },
        {
            title: "中国光大银行",
            value: "006",
        },
        {
            title: "中国邮政储蓄银行",
            value: "007",
        },
        {
            title: "交通银行",
            value: "008",
        },
        {
            title: "招商银行",
            value: "009",
        },
        {
            title: "中信银行",
            value: "012",
        },
        {
            title: "兴业银行",
            value: "013",
        },
        {
            title: "华夏银行",
            value: "014",
        },
    ]
}
$("#bankPicker").on("click", function () {
    $(this).attr('disabled', 'disabled');
    var html_bank = '<div id="select_bank">';
    $.each(banks.items, function (i, obj) {
        html_bank += '<a href="javascript:;" class="item" data-title="' + obj.title + '" data-value="' + obj.value + '">' + obj.title + '</a>';
    })
    html_bank += '</div>'
    layer.open({
        title: ['选择开户银行', 'text-align:center;background: #ffffff;height: 50px;line-height: 45px;border-radius: 5px;margin-bottom: -5px;']
        , content: html_bank
        , className: 'layer_bank_list'
        , btn: ['确定']
        , skin: 'footer'
        , yes: function (index) {
            if ($("#select_bank .item.checked").length == 1) {
                $("#bankPicker").val($("#select_bank .item.checked").attr("data-title"));
                $("#bankPicker").attr("data-values", $("#select_bank .item.checked").attr("data-value"));
                layer.close(index);
            }
        },
        end: function () {//无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。layer.open关闭事件
            $("#bankPicker").removeAttr('disabled');
        }
    });
})

