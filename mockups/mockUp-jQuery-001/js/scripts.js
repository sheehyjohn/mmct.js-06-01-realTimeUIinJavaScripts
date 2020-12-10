console.log("--scripts.js loaded");


$(function () {

    $("#accordion")
        .accordion({
        active: false,
        collapsible: true,
        animate: false,
        heightStyle: "content",
        autoHeight: false,
        header: "> div > h2"
    })
        .sortable({
        axis: "y",
        handle: "h2",
        stop: function (event, ui) {
            // IE doesn't register the blur when sorting
            // so trigger focusout handlers to remove .ui-state-focus
            ui.item.children("h2").triggerHandler("focusout");
        }
    });


    $("ul.available").sortable({
        connectWith: "ul",
        scroll: true,
        helper: 'clone', //keeps children visible when pulling out of container
        appendTo: '#swaplist' //temporarily stores children in hidden div
    });

    $("ul.saved").sortable({
        connectWith: "ul",
        receive: function (event, ui) {

            if ($(this).children().length > 9) {
                //ui.sender: will cancel the change.
                //Useful in the 'receive' callback.
                $(ui.sender).sortable('cancel');
            }
        },
        items: "li[id!=nomove]",
        update: function () {
            var order = $(this).sortable("serialize") + '&action=update';
            $.post("ajax_file", order, function (theResponse) {
                $("#info").html(theResponse);
            });
        },
        helper: 'clone', //keeps children visible when pulling out of container
        appendTo: '#swaplist' //temporarily stores children in hidden div
    });

    $("#sortable1, #sortable2").disableSelection();
    $("#sortable1, #sortable2").disableSelection();
});