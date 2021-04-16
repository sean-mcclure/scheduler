az.hold_value.utility = {
    check_if_user_has_event_on_cell: function(this_id, user) {
        var res = false;
        var check = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(this_id), {
            "key": "store_event_data_" + user
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
    get_clicked_cell_date_number: function() {
        return (Number(az.hold_value.utility.get_clicked_cell_date().split(" ")[1].split(",").join("")))
    },
    prepare_date_time: function(day_number, pick_time) {
        const month_year = az.grab_value("calendar_today_date", 1).split(",");
        const month = month_year[0].trim();
        const year = month_year[1].trim();
        var fin = month + " " + day_number + ", " + year + " : " + pick_time;
        return (fin)
    },
    number_of_added_avatars_in_this_cell: function() {
        return ($(".calendar_calendar_layout_cells").eq(az.get_target_instance(az.hold_value.clicked_cell_id) - 1).children().find("img").length);
    },
    get_clicked_cell_date: function() {
        var calendar_month_year = az.grab_value("calendar_today_date", 1).split(",");
        var calendar_month = calendar_month_year[0].trim();
        var calendar_year = calendar_month_year[1].trim();
        var day_number = $("#" + az.hold_value.clicked_cell_id).text()
        return (calendar_month + " " + day_number + ", " + calendar_year)
    },
    twenty_four_hour_to_regular_time: function(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join('');
    },
    where_is_number_1_on_month: function() {
        var res;
        $(".calendar_calendar_layout_cells").each(function(i) {
            if ($(this).text() === "1") {
                res = i;
            }
        })
        return (res)
    },
    get_object_id_from_deleted_event: function() {
        az.hold_value.fetch_results.forEach(function(obj) {
            if (JSON.parse(obj.attributes.event)[user]["event"] === event_name) {
                res = obj.id
            }
        })
    },
    add_event_to_modal_and_save_to_parse: function(options) {
        var event_obj = {
            event: options.event_name,
            date_time: options.date_time
        }
        var target_id = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_layout_id",
        })
        var check_data = az.fetch_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + options.user
        })
        if (typeof(check_data) !== "undefined") {
            var event_arr = JSON.parse(check_data)
            event_arr.push(event_obj)
        } else {
            var event_arr = [];
            event_arr.push(event_obj)
        }
        az.store_data("calendar_calendar_layout_cells", az.get_target_instance(az.hold_value.clicked_cell_id), {
            "key": "store_event_data_" + options.user,
            "value": JSON.stringify(event_arr)
        })
        save_to_parse(event_obj, options.user)
        az.hold_value.events.add_event_line_to_scrollable(az.grab_value("event_name", 1), az.hold_value.utility.prepare_date_time(az.hold_value.utility.get_clicked_cell_date_number(), az.grab_value("pick_time", 1)), options.user);
        if (options.user === "kasandra") {
            az.style_html("avatar_layout_" + target_id + "_cells", 1, {
                "background": "#33d9b2"
            })
        } else {
            az.style_html("avatar_layout_" + target_id + "_cells", 2, {
                "background": "#35ACE0"
            })
        }
        az.clear_input("event_name", 1)
        az.clear_input("pick_time", 1)
    }
}