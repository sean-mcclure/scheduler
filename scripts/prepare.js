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
az.add_layout("main_section", 1, {
    "this_class": "legend_layout",
    "row_class": "legend_layout_rows",
    "cell_class": "legend_layout_cells",
    "number_of_rows": 2,
    "number_of_columns": 2
})
az.style_layout("legend_layout", 1, {
    "height": "auto",
    "width": "auto",
    "column_widths": ["20%", "80%"],
    "border": 0
})
az.add_image("legend_layout_cells", 1, {
    "this_class": "legend_button",
    "image_path": "img/girl.png"
})
az.add_image("legend_layout_cells", 3, {
    "this_class": "legend_button",
    "image_path": "img/boy.png"
})
az.all_style_image("legend_button", {
    "align": "center",
    "width": "30px",
    "height": "30px",
    "border-radius": "4px",
    "padding": "5px",
    "color": "#141414",
    "cursor": "pointer",
    "outline": 0
})
az.style_image("legend_button", 1, {
    "background": "#33d9b2"
})
az.style_image("legend_button", 2, {
    "background": "#34ace0"
})
az.add_text("legend_layout_cells", 2, {
    "this_class": "legend_title",
    "text": "KASANDRA"
})
az.add_text("legend_layout_cells", 4, {
    "this_class": "legend_title",
    "text": "SEAN"
})
az.all_style_text("legend_title", {
    "color": "whitesmoke",
    "margin-left": "10px"
})
az.call_once_satisfied({
    "condition": "typeof(az.components.calendar) === 'function'",
    "function": function() {
        az.components.calendar("main_section", 1, {
            this_class: "calendar",
            height: "80vh",
            on_click_cell: function(this_id) {
                az.hold_value.clicked_cell_id = this_id;
                var check_kas = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(this_id), {
                    "key": "store_kasandra_added"
                })
                var check_sean = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(this_id), {
                    "key": "store_sean_added"
                })
                var day_number = az.get_target_instance(az.hold_value.clicked_cell_id) - 8;
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
                    "text": "ADD EVENT <span class='hold_edit_events' style='visibility:hidden;position:absolute;margin-left:10px'><i class='fa fa-pencil-square'></i></span"
                })
                az.style_text("schedular_title", 1, {
                    "align": "center",
                    "color": "#141414",
                    "font-family": "Oswald",
                    "font-size": "26px",
                    "margin-bottom": "10px"
                })
                az.style_html("hold_edit_events", 1, {
                    "cursor": "pointer"
                })
                az.add_event("hold_edit_events", 1, {
                    "type": "click",
                    "function": function() {
                        az.empty_contents("pop_schedule_content", 1)
                        var check_kas_data = az.fetch_data($("#" + az.hold_value.clicked_cell_id).attr("class"), az.get_target_instance(az.hold_value.clicked_cell_id), {
                            "key": "store_event_data_kasandra"
                        })
                        if (typeof(check_kas_data) !== "undefined") {
                            var event_data_kasandra = JSON.parse(check_kas_data)
                        }
                        var check_sean_data = az.fetch_data($("#" + az.hold_value.clicked_cell_id).attr("class"), az.get_target_instance(az.hold_value.clicked_cell_id), {
                            "key": "store_event_data_sean"
                        })
                        if (typeof(check_sean_data) !== "undefined") {
                            var event_data_sean = JSON.parse(check_sean_data)
                        }
                        az.add_text("pop_schedule_content", 1, {
                            "this_class": "edit_title",
                            "text": "EVENTS"
                        })
                        az.style_text("edit_title", 1, {
                            "align": "center",
                            "color": "#141414",
                            "font-family": "Oswald",
                            "font-size": "26px",
                            "margin-bottom": "4px"
                        })
                        az.add_text("pop_schedule_content", 1, {
                            "this_class": "edit_title_sub",
                            "text": get_clicked_cell_date()
                        })
                        az.style_text("edit_title_sub", 1, {
                            "font-size" : "20px",
                            "align" : "center",
                            "color" : "darkslategrey",
                            "margin-bottom" : "10px"
                        })
                        az.add_layout("pop_schedule_content", 1, {
                            "this_class": "edit_event_layout",
                            "row_class": "edit_event_layout_rows",
                            "cell_class": "edit_event_layout_cells",
                            "number_of_rows": 2,
                            "number_of_columns": 2
                        })
                        az.style_layout("edit_event_layout", 1, {
                            "width": "100%",
                            "height": "100%",
                            "border": 1
                        })
                        az.style_layout("edit_event_layout_rows", 1, {
                            "height": "30px",
                            "background" : "#218c74"
                        })
                        az.add_text("edit_event_layout_cells", 1, {
                            "this_class": "edit_event_who_title",
                            "text": "KASANDRA"
                        })
                        az.add_text("edit_event_layout_cells", 2, {
                            "this_class": "edit_event_who_title",
                            "text": "SEAN"
                        })
                        az.all_style_text("edit_event_who_title", {
                            "align": "center",
                            "font-family": "Oswald",
                            "color": "whitesmoke"
                        })
                        if (typeof(event_data_kasandra) !== "undefined") {
                            event_data_sean.kasandra.forEach(function(event_obj) {
                                az.add_text("edit_event_layout_cells", 3, {
                                    "this_class": "event_title_data",
                                    "text": "<span style='color: #218c74'>EVENT: </span>" + event_obj.event
                                })
                                az.add_text("edit_event_layout_cells", 3, {
                                    "this_class": "event_title_data",
                                    "text": "<span style='color: #218c74'>TIME: </span>" + event_obj.date_time.split(" ")[4]
                                })
                        })
                        }
                        if (typeof(event_data_sean) !== "undefined") {
                            event_data_sean.sean.forEach(function(event_obj) {
                                az.add_text("edit_event_layout_cells", 4, {
                                    "this_class": "event_title_data",
                                    "text": "<span style='color: #218c74'>EVENT: </span>" + event_obj.event
                                })
                                az.add_text("edit_event_layout_cells", 4, {
                                    "this_class": "event_title_data",
                                    "text": "<span style='color: #218c74'>TIME: </span>" + event_obj.date_time.split(" ")[4]
                                })
                            })
                        }
                        az.all_style_text("event_title_data", {
                            "align": "center",
                            "color": "#141414",
                            "font-family": "Oswald",
                            "font-size": "20px"
                        })
                    }
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
                setTimeout(function() {
                    az.click_element("who_button", 1)
                }, 300)
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
                        if (az.grab_value("pick_time", 1) !== "" && az.grab_value("event_name", 1) !== "") {
                            az.animate_element("add_event_button", 1, {
                                "type": "spin"
                            })
                            if (az.hold_value.clicked_instance === 1) {
                                var pass_user = "Kasandra"
                            } else {
                                var pass_user = "Sean"
                            }
                            var event = {
                                user: pass_user,
                                event: az.grab_value("event_name", 1),
                                date_time: prepare_date_time(day_number, az.grab_value("pick_time", 1))
                            }
                           
                            setTimeout(function() {
                                az.close_overlay("pop_schedule", 1)
                                var target_id = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                    "key": "store_layout_id",
                                })
                                if (pass_user !== "Sean") {
                                    var event_obj = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_kasandra_added",
                                    }))
                                    if(typeof(event_obj) !== "undefined") {
                                        event_obj.kasandra.push(event)
                                    } else {
                                        event_obj = {
                                            sean : [],
                                            kasandra : []
                                        }
                                         event_obj.kasandra.push(event)
                                    }
                                    save_to_parse(event_obj)
                                    az.style_html("avatar_layout_" + target_id + "_cells", 1, {
                                        "background": "#33d9b2"
                                    })
                                    az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_kasandra_added",
                                        "value": true
                                    })
                                    az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_event_data_kasandra",
                                        "value": JSON.stringify(event_obj)
                                    })
                                } else {
                                    var event_obj = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_sean_added",
                                    }))
                                    if(typeof(event_obj) !== "undefined") {
                                        event_obj.sean.push(event)
                                    } else {
                                        event_obj = {
                                            sean : [],
                                            kasandra : []
                                        }
                                         event_obj.sean.push(event)
                                    }
                                    save_to_parse(event_obj)
                                    az.style_html("avatar_layout_" + target_id + "_cells", 2, {
                                        "background": "#34ace0"
                                    })
                                    az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_sean_added",
                                        "value": true
                                    })
                                    az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                                        "key": "store_event_data_sean",
                                        "value": JSON.stringify(event_obj)
                                    })
                                }
                            }, 1000)
                        } else {
                            if (az.grab_value("pick_time", 1) === "") {
                                az.animate_element("pick_time", 1, {
                                    "type": "rubberBand"
                                })
                            } else {
                                az.animate_element("event_name", 1, {
                                    "type": "rubberBand"
                                })
                            }
                        }
                    }
                })
                if (check_kas || check_sean) {
                    az.style_html("hold_edit_events", 1, {
                        "visibility": "visible"
                    })
                }
            }
        })
        az.add_event("calendar_forward_icon", 1, {
            "type": "click",
            "function": function() {
                fetch_and_loop()
                set_inner_layouts()
            }
        })
        az.add_event("calendar_back_icon", 1, {
            "type": "click",
            "function": function() {
                fetch_and_loop()
                set_inner_layouts()
            }
        })
    }
})

function set_inner_layouts() {
    az.call_once_satisfied({
        "condition": "az.number_of_elements('calendar_calendar_layout_cells') > 30",
        "function": function() {
            az.call_multiple({
                "iterations": az.number_of_elements("calendar_calendar_layout_cells"),
                "function": function(dummy, index) {
                    var layout_id = "layout_" + az.makeid()
                    if ($(".calendar_calendar_layout_cells").eq(index).text() !== "") {
                        az.add_layout("calendar_calendar_layout_cells", index + 1, {
                            "this_class": "avatar_layout_" + layout_id,
                            "this_id": layout_id,
                            "row_class": "avatar_layout_" + layout_id + "_rows",
                            "cell_class": "avatar_layout_" + layout_id + "_cells",
                            "number_of_rows": 1,
                            "number_of_columns": 2
                        })
                        az.all_style_layout("avatar_layout_" + layout_id, {
                            "height": "20px",
                            "width": "100%",
                            "margin-top": "10px",
                            "pointer-events": "none",
                            "border": 0
                        })
                        az.all_style_layout("avatar_layout_" + layout_id + "_cells", {
                            "pointer-events": "none"
                        })
                        az.store_data("calendar_calendar_layout_cells", index + 1, {
                            "key": "store_layout_id",
                            "value": layout_id
                        })
                        az.store_data("calendar_calendar_layout_cells", index + 1, {
                            "key": "store_date_number",
                            "value": $(".calendar_calendar_layout_cells").eq(index).text()
                        })
                    }
                }
            })
            setTimeout(function() {
                fetch_and_loop()
            }, 2000)
        }
    })
}
setTimeout(function() {
    set_inner_layouts()
}, 1000)

function prepare_date_time(day_number, pick_time) {
    const month_year = az.grab_value("calendar_today_date", 1).split(",");
    const month = month_year[0].trim();
    const year = month_year[1].trim();
    var fin = month + " " + day_number + ", " + year + " : " + pick_time;
    return (fin)
}

function fetch_and_loop() {
    fetch_from_parse()
    az.call_once_satisfied({
        "condition": "typeof(az.hold_value.fetch_results) !== 'undefined'",
        "function": function() {
            console.log(az.hold_value.fetch_results)
            az.hold_value.fetch_results.forEach(function(obj) {
                event_obj = {
                    sean : [],
                    kasandra : []
                }
                var this_event = JSON.parse(obj.attributes.event);
                // event month and year
                var this_month = this_event.date_time.split(" ")[0]
                var this_year = this_event.date_time.split(" ")[2]
                // currently viewed month and year
                var calendar_month_year = az.grab_value("calendar_today_date", 1).split(",");
                var calendar_month = calendar_month_year[0].trim();
                var calendar_year = calendar_month_year[1].trim();
                if (this_month === calendar_month && this_year === calendar_year) {
                    if (this_event.user === "Kasandra") {
                        var pass_user = "Kasandra"
                    } else {
                        var pass_user = "Sean"
                    }
                    var use_instance = Number(this_event.date_time.split(" ")[1].replace(",", "")) + 8;
                    var target_id = az.fetch_data("calendar_calendar_layout_cells", use_instance, { // the set_inner_layouts ids are stored on each calendar cell 
                        "key": "store_layout_id",
                    })
                    if (pass_user !== "Sean") {
                        event_obj.kasandra.push(this_event)
                        az.style_html("avatar_layout_" + target_id + "_cells", 1, {
                            "background": "#33d9b2"
                        })
                        az.store_data("calendar_calendar_layout_cells", use_instance, {
                            "key": "store_event_data_kasandra",
                            "value": JSON.stringify(event_obj)
                        })
                        az.store_data("calendar_calendar_layout_cells", use_instance, {
                            "key": "store_kasandra_added",
                            "value": true
                        })
                    } else {
                        event_obj.sean.push(this_event)
                        az.style_html("avatar_layout_" + target_id + "_cells", 2, {
                            "background": "#34ace0"
                        })
                        az.store_data("calendar_calendar_layout_cells", use_instance, {
                            "key": "store_event_data_sean",
                            "value": JSON.stringify(event_obj)
                        })
                        az.store_data("calendar_calendar_layout_cells", use_instance, {
                            "key": "store_sean_added",
                            "value": true
                        })
                    }
                }
            })
        }
    })
    setTimeout(function() {
        az.hold_value.fetch_results = undefined;
    }, 2000)
}

function number_of_added_avatars_in_this_cell() {
    return ($(".calendar_calendar_layout_cells").eq(az.get_target_instance(az.hold_value.clicked_cell_id) - 1).children().find("img").length);
}

function get_clicked_cell_date() {
    var calendar_month_year = az.grab_value("calendar_today_date", 1).split(",");
    var calendar_month = calendar_month_year[0].trim();
    var calendar_year = calendar_month_year[1].trim();
    var day_number = az.get_target_instance(az.hold_value.clicked_cell_id) - 8;
    return(calendar_month + " " + day_number + ", " + calendar_year)
}