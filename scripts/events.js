az.hold_value.events = {
    add_calendar: function() {
        az.call_once_satisfied({
            "condition": "typeof(az.components.calendar) === 'function'",
            "function": function() {
                az.components.calendar("main_section", 1, {
                    this_class: "calendar",
                    height: "80vh",
                    on_click_cell: function(this_id) {
                        az.hold_value.clicked_cell_id = this_id;
                        var check_sean = az.hold_value.utility.check_if_user_has_event_on_cell(this_id, "sean")
                        var check_kasandra = az.hold_value.utility.check_if_user_has_event_on_cell(this_id, "kasandra")
                        az.hold_value.events.general_modal()
                        az.hold_value.events.add_title_to_modal("EVENTS")
                        az.hold_value.events.show_cell_events(check_kasandra, check_sean)
                    }
                })
            }
        })
        az.add_event("calendar_forward_icon", 1, {
            "type": "click",
            "function": function() {
                az.hold_value.events.fetch_and_loop()
                az.hold_value.events.set_inner_layouts()
            }
        })
        az.add_event("calendar_back_icon", 1, {
            "type": "click",
            "function": function() {
                az.hold_value.events.fetch_and_loop()
                az.hold_value.events.set_inner_layouts()
            }
        })
    },
    general_modal: function() {
        az.add_modal({
            "this_class": "pop_schedule",
            "content_class": "pop_schedule_content"
        })
        az.style_modal("pop_schedule", 1, {
            "width": "700px",
            "height": "auto",
            "overflow-y": "hidden",
            "background": "#f7f1e3",
            "box-shadow": "2px 2px 100px #141414",
            "border": "4px solid #141414"
        })
    },
    add_title_to_modal: function(title) {
        az.add_text("pop_schedule_content", 1, {
            "this_class": "modal_title",
            "text": title
        })
        az.style_text("modal_title", 1, {
            "align": "center",
            "color": "#141414",
            "font-family": "Oswald",
            "font-size": "26px",
            "margin-bottom": "4px"
        })
        az.add_text("pop_schedule_content", 1, {
            "this_class": "modal_title_sub",
            "text": az.hold_value.utility.get_clicked_cell_date()
        })
        az.style_text("modal_title_sub", 1, {
            "font-size": "20px",
            "align": "center",
            "color": "darkslategrey",
            "margin-top": "-7px",
            "margin-bottom": "10px"
        })
    },
    show_cell_events: function(check_kasandra, check_sean) {
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
        az.style_layout("edit_event_layout_cells", 3, {
            "padding": "10px"
        })
        az.style_layout("edit_event_layout_cells", 4, {
            "padding": "10px"
        })
        az.style_layout("edit_event_layout_rows", 1, {
            "height": "60px",
            "background": "#218c74"
        })
        az.add_scrollable_container("edit_event_layout_cells", 3, {
            "this_class": "scrollable_events",
            "direction": "vertical"
        })
        az.add_scrollable_container("edit_event_layout_cells", 4, {
            "this_class": "scrollable_events",
            "direction": "vertical"
        })
        az.all_style_scrollable_container("scrollable_events", {
            "width": "100%",
            "height": "250px",
            "background": "transparent",
            "border": "none"
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
            "color": "whitesmoke",
            "font-size": "22px"
        })
        az.add_icon("edit_event_who_title", 1, {
            "this_class": "calendar_add_icon",
            "icon_class": "fa-calendar-plus-o"
        })
        az.add_icon("edit_event_who_title", 2, {
            "this_class": "calendar_add_icon",
            "icon_class": "fa-calendar-plus-o"
        })
        az.all_style_icon("calendar_add_icon", {
            "font-size": "20px",
            "margin-left": "10px",
            "cursor": "pointer",
            "font-size": "22px",
            "position": "absolute",
            "margin-top": "5px"
        })
        az.add_event("calendar_add_icon", 1, {
            "type": "click",
            "function": function() {
                az.hold_value.events.add_event_content("kasandra")
            }
        })
        az.add_event("calendar_add_icon", 2, {
            "type": "click",
            "function": function() {
                az.hold_value.events.add_event_content("sean")
            }
        })
        if (check_kasandra) {
            var event_data = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                "key": "store_event_data_kasandra"
            }))
            event_data.forEach(function(event_obj) {
                var layout_id = "layout_" + az.makeid();
                az.add_layout("scrollable_events", 1, {
                    "this_class": "line_event_layout_" + layout_id,
                    "row_class": "line_event_layout_rows_" + layout_id,
                    "cell_class": "line_event_layout_cells_" + layout_id,
                    "number_of_rows": 1,
                    "number_of_columns": 2
                })
                az.style_layout("line_event_layout_" + layout_id, 1, {
                    "width": "100%",
                    "height": "auto",
                    "column_widths": ["90%", "10%"],
                    "border": 0
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #218c74'>EVENT: </span>" + event_obj.event
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #673523'>&#8594;TIME: </span>" + az.hold_value.utility.twenty_four_hour_to_regular_time(event_obj.date_time.split(" ")[4])
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #673523'>- - - - - - - - - - - - - - - - - - - - - - - - - -</span>"
                })
                az.add_icon("line_event_layout_cells_" + layout_id, 2, {
                    "this_class": "delete_event_" + layout_id,
                    "icon_class": "fa-times-circle"
                })
                az.style_icon("delete_event_" + layout_id, 1, {
                    "color": "red",
                    "font-size": "30px",
                    "align": "center",
                    "cursor": "pointer"
                })
                if (check_kasandra) {
                    az.hold_pass_user = "kasandra"
                } else {
                    az.hold_pass_user = "sean"
                }
                az.add_event("delete_event_" + layout_id, 1, {
                    "type": "click",
                    "function": function(this_id) {
                        az.hold_value.events.delete_event(layout_id, az.hold_pass_user, event_obj.id)
                    }
                })
            })
        }
        if (check_sean) {
            var event_data = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                "key": "store_event_data_sean"
            }))
            event_data.forEach(function(event_obj) {
                var layout_id = "layout_" + az.makeid();
                az.add_layout("scrollable_events", 2, {
                    "this_class": "line_event_layout_" + layout_id,
                    "row_class": "line_event_layout_rows_" + layout_id,
                    "cell_class": "line_event_layout_cells_" + layout_id,
                    "number_of_rows": 1,
                    "number_of_columns": 2
                })
                az.style_layout("line_event_layout_" + layout_id, 1, {
                    "width": "100%",
                    "height": "auto",
                    "column_widths": ["90%", "10%"],
                    "border": 0
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #218c74'>EVENT: </span>" + event_obj.event
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #673523'>&#8594;TIME: </span>" + az.hold_value.utility.twenty_four_hour_to_regular_time(event_obj.date_time.split(" ")[4])
                })
                az.add_text("line_event_layout_cells_" + layout_id, 1, {
                    "this_class": "event_title_data",
                    "text": "<span style='color: #673523'>- - - - - - - - - - - - - - - - - - - - - - - - - -</span>"
                })
                az.add_icon("line_event_layout_cells_" + layout_id, 2, {
                    "this_class": "delete_event_" + layout_id,
                    "icon_class": "fa-times-circle"
                })
                az.style_icon("delete_event_" + layout_id, 1, {
                    "color": "red",
                    "font-size": "30px",
                    "align": "center",
                    "cursor": "pointer"
                })
                if (check_kasandra) {
                    az.hold_pass_user = "kasandra"
                } else {
                    az.hold_pass_user = "sean"
                }
                az.add_event("delete_event_" + layout_id, 1, {
                    "type": "click",
                    "function": function(this_id) {
                        az.hold_value.events.delete_event(layout_id, az.hold_pass_user, event_obj.id)
                    }
                })
            })
        }
        az.all_style_text("event_title_data", {
            "text-align": "left",
            "color": "#141414",
            "font-family": "Oswald",
            "font-size": "20px"
        })
    },
    add_event_content: function(user) {
        if (user === "kasandra") {
            var inst = 1
            az.style_layout("edit_event_layout_cells", 1, {
                "pointer-events": "auto",
                "opacity": "1"
            })
            az.style_layout("edit_event_layout_cells", 2, {
                "pointer-events": "none",
                "opacity": "0.5"
            })
        } else {
            var inst = 2
            az.style_layout("edit_event_layout_cells", 2, {
                "pointer-events": "auto",
                "opacity": "1"
            })
            az.style_layout("edit_event_layout_cells", 1, {
                "pointer-events": "none",
                "opacity": "0.5"
            })
        }
        $(".edit_event_who_title").eq(inst - 1).parent().addClass("swoosh")
        az.animate_element("swoosh", 1, {
            "type": "bounceOutLeft"
        })
        setTimeout(function() {
            az.hold_value.events.add_event_line(user)
            az.focus_element("event_name", 1)
        }, 1000)
    },
    add_event_line: function(user) {
        if (user === "kasandra") {
            var inst = 1
        } else {
            var inst = 2
        }
        az.style_text("edit_event_who_title", inst, {
            "display": "none"
        })
        az.add_input("edit_event_layout_cells", inst, {
            "this_class": "event_name",
            "placeholder": "event name..."
        })
        az.style_input("event_name", 1, {
            "font-family": "Oswald",
            "height": "30px",
            "border": "none",
            "width": "110px"
        })
        az.add_html("edit_event_layout_cells", inst, {
            "html": "<input type='time' class='pick_time' id='appt' name='appt' min='09:00' max='18:00' required>"
        })
        az.style_html("pick_time", 1, {
            "height": "27px",
            "width": "110px",
            "border": "none",
            "margin-top": "8px"
        })
        az.add_icon("edit_event_layout_cells", inst, {
            "this_class": "add_event_button",
            "icon_class": "fa-plus-square-o"
        })
        az.style_icon("add_event_button", 1, {
            "color": "#f7f1e3",
            "font-size": "35px",
            "position": "absolute",
            "margin-top": "14px",
            "margin-left": "10px",
            "cursor": "pointer"
        })
        az.add_event("add_event_button", 1, {
            "type": "click",
            "function": function(this_id) {
                az.hold_value.events.add_event_to_cell(user)
            }
        })
    },
    add_event_to_cell: function(user) {
        if (az.grab_value("pick_time", 1) !== "" && az.grab_value("event_name", 1) !== "") {
            az.hold_value.utility.add_event_to_modal_and_save_to_parse({
                user: user,
                event_name: az.grab_value("event_name", 1),
                date_time: az.hold_value.utility.prepare_date_time(az.hold_value.utility.get_clicked_cell_date_number(), az.grab_value("pick_time", 1))
            })
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
    },
    add_event_line_to_scrollable: function(event_name, date_time, user) {
        if (user === "kasandra") {
            var inst = 1;
        } else {
            var inst = 2;
        }
        var event_data = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + user
        }))
        var layout_id = "layout_" + az.makeid();
        az.add_layout("scrollable_events", inst, {
            "this_class": "line_event_layout_" + layout_id,
            "row_class": "line_event_layout_rows_" + layout_id,
            "cell_class": "line_event_layout_cells_" + layout_id,
            "number_of_rows": 1,
            "number_of_columns": 2
        })
        az.style_layout("line_event_layout_" + layout_id, 1, {
            "width": "100%",
            "height": "auto",
            "column_widths": ["90%", "10%"],
            "border": 0
        })
        az.add_text("line_event_layout_cells_" + layout_id, 1, {
            "this_class": "event_title_data",
            "text": "<span style='color: #218c74'>EVENT: </span>" + event_name
        })
        az.add_text("line_event_layout_cells_" + layout_id, 1, {
            "this_class": "event_title_data",
            "text": "<span style='color: #673523'>&#8594;TIME: </span>" + az.hold_value.utility.twenty_four_hour_to_regular_time(date_time.split(" ")[4])
        })
        az.add_text("line_event_layout_cells_" + layout_id, 1, {
            "this_class": "event_title_data",
            "text": "<span style='color: #673523'>- - - - - - - - - - - - - - - - - - - - - - - - - -</span>"
        })
        az.add_icon("line_event_layout_cells_" + layout_id, 2, {
            "this_class": "delete_event_" + layout_id,
            "icon_class": "fa-times-circle"
        })
        az.style_icon("delete_event_" + layout_id, 1, {
            "color": "red",
            "font-size": "30px",
            "align": "center",
            "cursor": "pointer"
        })
        az.add_event("delete_event_" + layout_id, 1, {
            "type": "click",
            "function": function(this_id) {
                az.hold_value.events.delete_event(layout_id, user, event_obj.id)
            }
        })
        az.all_style_text("event_title_data", {
            "text-align": "left",
            "color": "#141414",
            "font-family": "Oswald",
            "font-size": "20px"
        })
    },
    fetch_and_loop: function() {
        fetch_from_parse("kasandra")
        fetch_from_parse("sean")
        az.call_once_satisfied({
            "condition": "typeof(az.hold_value.fetch_results['kasandra']) !== 'undefined' && typeof(az.hold_value.fetch_results['sean']) !== 'undefined'",
            "function": function() {
                az.hold_value.events.grab_events_from_parse_and_store_on_cell({
                    user: "kasandra"
                })
                az.hold_value.events.grab_events_from_parse_and_store_on_cell({
                    user: "sean"
                })
            }
        })
        setTimeout(function() {
            az.hold_value.fetch_results['kasandra'] = undefined;
            az.hold_value.fetch_results['sean'] = undefined;
        }, 2000)
    },
    grab_events_from_parse_and_store_on_cell: function(options) {
        var event_arr = [];
        var last_event_day = "NA";
        az.hold_value.fetch_results[options.user].forEach(function(obj) {
            var this_event = JSON.parse(obj.attributes.event);
            this_event.id = obj.id;
            // event month and year
            var this_month = this_event.date_time.split(" ")[0]
            var this_year = this_event.date_time.split(" ")[2]
            // currently viewed month and year
            var calendar_month_year = az.grab_value("calendar_today_date", 1).split(",");
            var calendar_month = calendar_month_year[0].trim();
            var calendar_year = calendar_month_year[1].trim();
            if (this_month === calendar_month && this_year === calendar_year) {
                var use_instance = Number(this_event.date_time.split(" ")[1].replace(",", "")) + az.hold_value.utility.where_is_number_1_on_month()
                var target_id = az.fetch_data("calendar_calendar_layout_cells", use_instance, {
                    "key": "store_layout_id",
                })
                var this_event_day = Number(this_event.date_time.split(" ")[1].replace(",", "")) + az.hold_value.utility.where_is_number_1_on_month()
                if (last_event_day === use_instance || last_event_day === "NA") {
                    event_arr.push(this_event)
                    last_event_day = use_instance;
                } else {
                    event_arr = []
                    event_arr.push(this_event)
                    last_event_day = use_instance;
                }
                if (options.user === "kasandra") {
                    az.style_html("avatar_layout_" + target_id + "_cells", 1, {
                        "background": "#33D9B2"
                    })
                } else {
                    az.style_html("avatar_layout_" + target_id + "_cells", 2, {
                        "background": "#35ACE0"
                    })
                }
                az.store_data("calendar_calendar_layout_cells", use_instance, {
                    "key": "store_event_data_" + options.user,
                    "value": JSON.stringify(event_arr)
                })
            }
        })
    },
    set_inner_layouts: function() {
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
                    az.hold_value.events.fetch_and_loop()
                }, 2000)
            }
        })
    },
    animate_cells: function() {
        az.call_once_satisfied({
            "condition": "az.check_exists('calendar_calendar_layout_rows', 1)",
            "function": function() {
                az.style_layout("calendar_calendar_layout_rows", 1, {
                    "visibility": "hidden"
                })
                az.all_add_event("calendar_calendar_layout_cells", {
                    "type": "hover",
                    "function": function(this_id) {
                        az.animate_element("calendar_calendar_layout_cells", az.get_target_instance(this_id), {
                            "type": "swing",
                            "speed": "0.1s"
                        })
                    }
                })
            }
        })
    },
    delete_event: function(layout_id, user, event_id) {
        // fetch from cell
        var event_data = JSON.parse(az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + user
        }))
        // remove from cell
        var event_arr = [];
        event_data.forEach(function(obj) {
            if (obj.id !== event_id) {
                event_arr.push(obj)
            }
        })
        // store back on cell
        az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + user,
            "value": JSON.stringify(event_arr)
        })
        if (event_arr.length === 0) {
            var target_id = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
                "key": "store_layout_id",
            })
            if (user === "kasandra") {
                az.style_html("avatar_layout_" + target_id + "_cells", 1, {
                    "background": "transparent"
                })
            } else {
                az.style_html("avatar_layout_" + target_id + "_cells", 2, {
                    "background": "transparent"
                })
            }
        }
        // delete from parse
        delete_from_parse(event_id, uaser)
        // remove from scrollable
        az.remove_element("line_event_layout_" + layout_id, 1)
    }
}