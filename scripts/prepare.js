az.load_font("Oswald")
az.hold_value.clicked_instance = 1;
az.style_page({
    "background": "#d1ccc0"
})
az.style_body({
    "background": "#d1ccc0",
    "font-family": "Oswald",
    "color": "whitesmoke"
})
az.add_sections({
    "this_class": "main_section",
    "sections": 1
})
az.style_sections("main_section", 1, {
    "height": "auto",
    "background": "#218c74",
    "border-radius": "6px"
})
az.call_once_satisfied({
    "condition": "typeof(az.components.calendar) === 'function'",
    "function": function() {
        az.components.calendar("main_section", 1, {
            this_class: "calendar",
            height: "80vh",
            on_click_cell: function(this_id) {
                az.hold_value.clicked_cell_id = this_id;
                az.add_modal({
                    "this_class": "pop_schedule",
                    "content_class": "pop_schedule_content"
                })
                az.style_modal("pop_schedule", 1, {
                    "width": "500px",
                    "height": "auto",
                    "overflow-y": "hidden",
                    "background": "#f7f1e3",
                    "box-shadow": "2px 2px 100px #141414",
                    "border": "4px solid #141414"
                })
                az.add_text("pop_schedule_content", 1, {
                    "this_class": "schedular_title",
                    "text": "ADD EVENT"
                })
                az.style_text("schedular_title", 1, {
                    "align": "center",
                    "color": "#141414",
                    "font-family": "Oswald",
                    "font-size": "26px",
                    "margin-bottom": "10px"
                })
                az.add_layout("pop_schedule_content", 1, {
                    "this_class": "my_layout",
                    "row_class": "my_layout_rows",
                    "cell_class": "my_layout_cells",
                    "number_of_rows": 1,
                    "number_of_columns": 2
                })
                az.style_layout("my_layout", 1, {
                    "height": "auto",
                    "width": "200px",
                    "align": "center",
                    "margin-bottom": "10px",
                    "border": 0
                })
                az.add_image("my_layout_cells", 1, {
                    "this_class": "who_button",
                    "image_path": "img/girl.png"
                })
                az.add_image("my_layout_cells", 2, {
                    "this_class": "who_button",
                    "image_path": "img/boy.png"
                })
                az.all_style_image("who_button", {
                    "align": "center",
                    "width": "50px",
                    "height": "50px",
                    "background": "#d1ccc0",
                    "border-radius": "4px",
                    "padding": "5px",
                    "color": "#141414",
                    "cursor": "pointer",
                    "outline": 0
                })
                az.style_image("who_button", 1, {
                    "background": "#ffda79",
                    "border": "1px solid black"
                })
                az.all_add_event("who_button", {
                    "type": "click",
                    "function": function(this_id) {
                        az.hold_value.clicked_instance = az.get_target_instance(this_id)
                        az.all_style_button("who_button", {
                            "background": "#d1ccc0",
                            "border": "0px solid black"
                        })
                        az.style_button("who_button", az.get_target_instance(this_id), {
                            "background": "#ffda79",
                            "border": "1px solid black"
                        })
                    }
                })
                az.add_input("pop_schedule_content", 1, {
                    "this_class": "event_name",
                    "placeholder": "event name..."
                })
                az.style_input("event_name", 1, {
                    "margin-bottom": "30px",
                    "font-family": "Oswald"
                })
                az.all_style_input("event_name", {
                    "align": "center",
                    "border": "none",
                    "margin-top": "10px",
                    "background": "#ffda79",
                    "width": "90%",
                    "outline": 0
                })
                az.add_html("pop_schedule_content", 1, {
                    "html": "<input type='time' class='pick_time' id='appt' name='appt' min='09:00' max='18:00' required>"
                })
                az.style_html("pick_time", 1, {
                    "align": "center",
                    "margin-top": "-10px"
                })
                az.add_button("pop_schedule_content", 1, {
                    "this_class": "add_event_button",
                    "text": "ADD"
                })
                az.style_button("add_event_button", 1, {
                    "align": "center",
                    "margin-top": "20px",
                    "background": "#218c74"
                })
                az.add_event("add_event_button", 1, {
                    "type": "click",
                    "function": function() {
                        az.animate_element("add_event_button", 1, {
                            "type": "spin"
                        })
                        if (az.hold_value.clicked_instance === 1) {
                            var pass_user = "Kasandra"
                            var this_avater = "img/girl.png"
                        } else {
                            var pass_user = "Sean"
                            var this_avater = "img/boy.png"
                        }
                        save_to_parse({
                            user: pass_user,
                            event: az.grab_value("event_name", 1),
                            date_time: az.grab_value("pick_time", 1)
                        })
                        setTimeout(function() {
                            az.close_overlay("pop_schedule", 1)
                            var target_index_of_avatar_layout = $(".avatar_layout").eq(az.get_target_instance("layout_Nipvmf6elDEq11U") - 1).find(".add_avatar").length + 1;
                            var target_id = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                "key": "store_layout_id",
                            })
                                                        var ind = get_last_colored_index("avatar_layout_" + target_id)

                            if(pass_user !== "Sean") {
                            az.style_html("avatar_layout_" + target_id + "_cells", ind + 1, {
                                "background": "#ff5252"
                            })
                        } else {
                            az.style_html("avatar_layout_" + target_id + "_cells", ind + 13, {
                                "background": "#ff5252"
                            })
                        }
                            /*
                            az.add_image("avatar_layout_cells", az.get_target_instance(target_id)*6 - (6 - target_index_of_avatar_layout), {
                                "this_class": "add_avatar",
                                "image_path": this_avater
                            })
                            az.all_style_image("add_avatar", {
                                "width": "30px",
                                "align" : "center"
                            })
                            */
                        }, 1000)
                    }
                })
            }
        })
    }
})
az.call_once_satisfied({
    "condition": "az.number_of_elements('calendar_calendar_layout_cells') > 30",
    "function": function() {
        az.call_multiple({
            "iterations": az.number_of_elements("calendar_calendar_layout_cells"),
            "function": function(dummy, index) {
                var layout_id = "layout_" + az.makeid()
                az.add_layout("calendar_calendar_layout_cells", index + 1, {
                    "this_class": "avatar_layout_" + layout_id,
                    "this_id": layout_id,
                    "row_class": "avatar_layout_" + layout_id + "_rows",
                    "cell_class": "avatar_layout_" + layout_id + "_cells",
                    "number_of_rows": 2,
                    "number_of_columns": 12
                })
                az.all_style_layout("avatar_layout_" + layout_id, {
                    "height": "20px",
                    "width": "100%"
                })
                az.store_data("calendar_calendar_layout_cells", index + 1, {
                    "key": "store_layout_id",
                    "value": layout_id
                })
            }
        })
    }
})

function get_last_colored_index(layout_id) {
    var res;
    var cnt = 0;
    $("." + layout_id).children().find("td").each(function(index) {
        cnt++;
        if ($(this).css("background-color") != "rgba(0, 0, 0, 0)") {
            res = cnt;
        }
    })
    if(typeof(res) === "undefined") {
        res = 0
    }
    return (res)
}