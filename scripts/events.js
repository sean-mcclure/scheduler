events = {
    add_calendar: function() {},
    save_to_parse: function() {},
    fetch_from_parse: function() {},
    get_clicked_cell_date: function() {},
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