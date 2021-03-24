az.add_overlay({
    "this_class": "loading_screen",
    "close_text_class": "x_out"
})
az.style_overlay('loading_screen', 1, {
    "width": "100%",
    "height": "100%",
    "background": "#218c74"
})
az.style_text('x_out', 1, {
    "display": "none"
})
// progress bar
split_loader({
    "overlay_class": "loading_screen",
    "close_text_class": "x_out",
    "loading_text": "SEAN & KASANDRA \n CALENDAR",
    "progress_bar_color": "#f7f1e3",
    "open_time": 3000
})

function split_loader(options) {
    use_options = options
    setTimeout(function() {
        az.click_element(options['close_text_class'], 1)
    }, options['open_time'])
    $('.' + options['overlay_class']).append("<div class='main_prog_bar' id='myProgress'><div id='myBar'>10%</div></div>")
    $('#myProgress').css('width', '60%').css('background-color', '#ddd')
    $('#myBar').css('width', '10%').css('height', '30px').css('background-color', options['progress_bar_color']).css('text-align', 'center').css('line-height', '30px').css('color', 'black').css('font-weight', 'bold').css('border-radius', '20px')
    $('#myProgress').css('margin-top', '40px')
    az.align_element('main_prog_bar', 1, 'center')
    az.add_text(options['overlay_class'], 1, {
        "this_class": "overlay_txt",
        "text": options['loading_text']
    })
    az.style_text("overlay_txt", 1, {
        "color": "#f7f1e3",
        "font-size": "40px",
        "font-family": "Oswald",
        "margin-top": "-50px",
        "align": "center_screen"
    })
    az.animate_element('overlay_txt', 1, {
        "type": "fadeIn"
    })
    az.delay_event({
        "delay": 500,
        "function": "progress_bar(use_options)"
    })
    $('.' + use_options['image_class']).css("position", "fixed").css("top", "50%").css("left", "50%").css("-webkit-transform", "translate(-50%, -50%)").css("transform", "translate(-50%, -50%)")
    $('#' + 'myBar').css("position", "fixed").css("top", "60%").css("left", "50%").css("-webkit-transform", "translate(-50%, -50%)").css("transform", "translate(-50%, -50%)").css('display', 'none')
}

function progress_bar(use_options) {
    var elem = document.getElementById("myBar");
    setTimeout(function() {
        $(elem).css("display", "block")
    }, 100)
    var width = 10;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width / 2 + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}