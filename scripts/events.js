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
                    }
                })
            }
        })
    },
    add_title_to_modal : function(title) {
 az.add_text("pop_schedule_content", 1, {
                            "this_class": "edit_title",
                            "text": title
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
    },
    check_if_user_has_event_on_cell: function(user) {
        var res = false;
        var check = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(this_id), {
            "key": "store_" + user + "_added"
        })
        if (typeof(check) !== "undefined") {
            res = true;
        }
        return (res)
    },
    get_user_events_from_cell: function(user) {
        var event_data = az.fetch_data($("#" + az.hold_value.clicked_cell_id).attr("class"), az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + user
        })
        return (JSON.parse(check_sean_data))
    },
    get_clicked_cell_date: function() {
        return (az.get_target_instance(az.hold_value.clicked_cell_id) - 8)
    },
    add_event_to_cell: function() {
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
        az.hold_value.events.show_cell_events("pop_schedule_content", 1)
    },
    show_cell_events: function(target_class, target_instance) {
        az.empty_contents("pop_schedule_content", 1)
        az.add_layout(target_class, target_instance, {
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
            "background": "#218c74"
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
    },
    number_of_added_avatars_in_this_cell: function() {},
    fetch_and_loop: function() {},
    prepare_date_time: function() {},
    set_inner_layouts: function() {},
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
                            "type": "swing"
                        })
                    }
                })
            }
        })
    }
}