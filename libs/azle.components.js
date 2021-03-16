/*! Azle v1.1.1 | (c) Kedion Inc. | Created by Sean McClure - MIT License */
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
az.components.utility = {}
az.components.loading_screen = function loading_screen(options) {
    az.add_overlay({
        "this_class": "loading_overlay",
        "outside_close": false
    })
    az.style_overlay("loading_overlay", 1, {
        "width": "100%",
        "height": "100%",
        "background": "rgba(0, 0, 0, 0.5)"
    })
    az.remove_element("x_out_overlay", 1)
    az.add_text("loading_overlay", 1, {
        "this_class": "loading_title",
        "text": options.title
    })
    az.all_style_text("loading_title", {
        "color": "whitesmoke",
        "font-size": "17px",
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "margin-right": "-50%",
        "transform": "translate(-50%, -50%)",
        "margin-top": "-40px"
    })
    az.components.loading_screen.functions.add_loader("loading_overlay", 1, {
        "stop_condition": options.stop_condition
    })
}
az.components.loading_screen.load_cnt = 0
az.components.loading_screen.functions = {
    "add_loader": function add_loader(target_class, target_instance, options) {
        az.hold_value.options = options
        az.add_layout(target_class, target_instance, {
            "this_class": "loading_layout",
            "row_class": "loading_layout_rows",
            "cell_class": "loading_layout_cells",
            "number_of_rows": 1,
            "number_of_columns": 10
        })
        az.style_layout("loading_layout", 1, {
            "width": "auto",
            "height": "40px",
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "margin-right": "-50%",
            "transform": "translate(-50%, -50%)",
            "border": 0
        })
        az.call_every({
            "every": 300,
            "function": function() {
                az.components.loading_screen.load_cnt++
                az.add_html("loading_layout_cells", az.components.loading_screen.load_cnt, {
                    "html": "<div class='added_load'></div>"
                })
                az.all_style_html("added_load", {
                    "width": "20px",
                    "height": "20px",
                    "background": "rgb(122, 82, 246)",
                    "margin": "4px",
                    "display": "inline-block"
                })
                if (az.components.loading_screen.load_cnt == az.get_cell_count('loading_layout', 1)) {
                    az.components.loading_screen.load_cnt = 0
                    az.all_remove_element('added_load')
                }
            }
        })
        az.call_once_satisfied({
            "condition": az.hold_value.options.stop_condition,
            "function": function() {
                az.stop_call_every()
                az.all_remove_element('added_load')
            }
        })
    }
}
az.components.page_layout = function page_layout(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_page_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class,
        "row_class": options.row_class,
        "cell_class": options.cell_class,
        "number_of_rows": options.rows,
        "number_of_columns": options.columns
    })
    default_page_styles = {
        "height": options.height,
        "width": options.width,
        "border": options.border
    }
    if (options.hasOwnProperty("cell_styles")) {
        custom_page_styles = options.layout_styles
    } else {
        custom_page_styles = {}
    }
    default_cell_styles = [{}]
    if (options.hasOwnProperty("cell_styles")) {
        custom_cell_styles = options.cell_styles
    } else {
        custom_cell_styles = {}
    }
    var page_styles_concat = Object.assign(default_page_styles, custom_page_styles);
    var cell_styles_concat = default_cell_styles.concat(custom_cell_styles)
    az.style_layout(options.this_class, 1, page_styles_concat)
    cell_styles_concat.forEach(function(elem, i) {
        az.style_layout(options.cell_class, i + 1, elem)
    })
}
az.components.table = function table(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_main_table", 1)
    az.remove_element(options.this_class + "_main_table_header", 1)
    if (options.hasOwnProperty("header")) {
        az.add_layout(target_class, target_instance, {
            "this_class": options.this_class + "_main_table_header",
            "row_class": options.this_class + "_main_table_header_rows",
            "cell_class": options.this_class + "_main_table_header_cells",
            "number_of_rows": 1,
            "number_of_columns": Object.keys(Object.values(options.data)[0]).length
        })
        az.style_layout(options.this_class + "_main_table_header", 1, {
            "table-layout": "auto",
            "height": "30px",
            "border": options.border
        })
        az.all_style_layout(options.this_class + "_main_table_header_cells", {
            "width" : "50px",
            "table-layout": "auto"
        })
        if (options.hasOwnProperty("column_widths")) {
            az.style_layout(options.this_class + "_main_table_header", 1, {
                "column_widths": options.column_widths,
            })
        }
        az.fill_row(options.this_class + "_main_table_header", 1, {
            "header": false,
            "cell_class": options.this_class + "_main_table_header_cells",
            "text_class": options.this_class + "_header_cell_text",
            "row_number": 1,
            "array": options.header
        })
    }
    if (options.hasOwnProperty("header_styles")) {
        az.all_style_layout(options.this_class + "_main_table_header_cells", options.header_styles)
        if (typeof(options.header_styles.border) !== "undefined") {
            az.style_layout(options.this_class + "_main_table_header", 1, {
                "border": options.header_styles.border
            })
        }
    }
    az.add_scrollable_container(target_class, target_instance, {
        "this_class": options.this_class + "_scrollable_table",
        "direction": "vertical"
    })
    az.style_scrollable_container(options.this_class + "_scrollable_table", 1, {
        "background": "transparent",
        "width": "100%",
        "height": "100%",
        "border": "none"
    })
    az.add_layout(options.this_class + "_scrollable_table", 1, {
        "this_class": options.this_class + "_main_table",
        "row_class": options.this_class + "_main_table_rows",
        "cell_class": options.this_class + "_main_table_cells",
        "number_of_rows": options.data.length,
        "number_of_columns": Object.keys(Object.values(options.data)[0]).length
    })
    az.style_layout(options.this_class + "_main_table", 1, {
        "table-layout": "fixed",
        "height": options.height,
        "border": options.border
    })
    
    if (options.hasOwnProperty("column_widths")) {
        az.style_layout(options.this_class + "_main_table", 1, {
            "column_widths": options.column_widths,
        })
    }
    if (options.hasOwnProperty("table_styles")) {
        az.style_layout(options.this_class + "_main_table", 1, options.table_styles)
    }
    az.all_style_layout(options.this_class + "_main_table_cells", {
        "height": options.row_height
    })
    strip = `elem.split('"').join('')`
    clean_header = []
    az.loop_array({
        "function": strip,
        "array": Object.keys(options.data[0]),
        "new_array": clean_header
    })
    var truncated_table_text;
    az.call_multiple({
        "iterations": options.data.length,
        "function": function(elem, index) {
            truncated_table_text = Object.values(Object.values(options.data)[index]).map(function(v) {
                if (typeof(v) !== null && v.length > 10) {
                    return ("<span data-full_title='" + v + "'>" + v.substring(0, 10) + "..." + "</span>")
                } else {
                    return ("<span data-full_title='" + v + "'>" + v + "</span>")
                }
            })
            az.fill_row(options.this_class + "_main_table", 1, {
                "header": false,
                "cell_class": options.this_class + "_main_table_cells",
                "text_class": options.this_class + "_cell_text",
                "row_number": index + 1,
                "array": truncated_table_text
            })
        }
    })
    if (options.hasOwnProperty("style_columns")) {
        options.style_columns.forEach(function(style_obj, i) {
            az.style_column(options.this_class + "_main_table", 1, {
                "header": false,
                "cell_class": options.this_class + "_cell_text",
                "column_number": i + 1,
                "styles": style_obj
            })
        })
    }
    if (options.hasOwnProperty("click_cell_function")) {
        az.all_add_event(options.this_class + "_cell_text", {
            "type": "click",
            "function": function(this_id) {
                az.call_callback(options.click_cell_function())
            }
        })
    }
    if (options.hasOwnProperty(options.this_class + "_store_data_on_cell")) {
        store_cnt = 0
        store_cnt_b = 0
        az.delay_multiple({
            "delay": 100,
            "iterations": 30,
            "function": function() {
                store_cnt++
                if ((store_cnt % 5) == 0) {
                    store_cnt_b++
                    az.store_data(options.this_class + "_cell_text", store_cnt_b, {
                        "key": "store_data",
                        "value": options.store_data_on_cell
                    })
                }
            }
        })
    }
    if (options.hasOwnProperty("hover_cell_function")) {
        az.all_add_event(options.this_class + "_cell_text", {
            "type": "hover",
            "function": function(this_id) {
                az.call_callback(options.hover_cell_function())
            }
        })
    }
    if (options.hasOwnProperty("row_even_color") && options.hasOwnProperty("row_odd_color")) {
        az.alternate_row_color(options.this_class + "_main_table", 1, options.row_even_color, options.row_odd_color, "whitesmoke", "whitesmoke", false) // header set to false (see above)
    }
    if (options.hasOwnProperty("column_html")) {
        options.column_html.forEach(function(elem) {
            az.fill_column(options.this_class + "_main_table", 1, {
                "header": false,
                "cell_class": options.this_class + "_cell_text",
                "cell_number": elem.column_number,
                "text_class": options.this_class + "_cell_content",
                "array": elem.html
            })
        })
    }
    $("." + options.this_class + "_main_table_rows").eq(0).removeClass(options.this_class + "_main_table_rows").addClass("toggle_first_row")
}
az.components.status_box = function status_box(target_class, target_instance, options) {


    az.remove_element(options.this_class + "_status_box_layout_outer", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_status_box_layout_outer",
        "row_class": options.this_class + "_status_box_layout_outer_rows",
        "cell_class": options.this_class + "_status_box_layout_outer_cells",
        "number_of_rows": 1,
        "number_of_columns": 2
    })
    az.style_layout(options.this_class + "_status_box_layout_outer", 1, {
        "table-layout": "fixed",
        "height": options.height,
        "width": options.width,
        "column_widths": ["40%", "60%"],
        "border": 0
    })
    az.style_layout(options.this_class + "_status_box_layout_outer_cells", 1, {
        "background": options.side_cell_color
    })
    az.add_scrollable_container(options.this_class + "_status_box_layout_outer_cells", 2, {
        "this_class": options.this_class + "_scrollable",
        "direction": "vertical"
    })
    az.style_scrollable_container(options.this_class + "_scrollable", 1, {
        "background": "transparent",
        "width": "100%",
        "height": "100%",
        "border": "none"
    })
    az.add_layout(options.this_class + "_scrollable", 1, {
        "this_class": options.this_class + "_status_box_layout",
        "row_class": options.this_class + "_status_box_layout_rows",
        "cell_class": options.this_class + "_status_box_layout_cells",
        "number_of_rows": options.status_values.length,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_status_box_layout", 1, {
        "height": "100%",
        "width": "100%",
        "border": options.border
    })
    az.all_style_layout(options.this_class + "_status_box_layout_cells", {
        "padding": "6px",
        "valign": "center"
    })
    options.status_values.forEach(function(elem, i) {
        if(typeof(options.status_titles[i]) !== "undefined" && typeof(options.status_values[i]) !== "undefined") {
        az.add_html(options.this_class + "_status_box_layout_cells", i + 1, {
            "html": "<div class='" + options.this_class + "_hold_status_bar'></div>"
        })
        if (options.hasOwnProperty("divide_values_by")) {
            az.hold_value.divide_by = options.divide_values_by
        } else {
            az.hold_value.divide_by = 1
        }
        console.log(options.status_values[i])
        az.style_html(options.this_class + "_hold_status_bar", i + 1, {
            "position": "relative",
            "height": "auto",
            "width": (options.status_values[i] / az.hold_value.divide_by).toString() + "px",
            "background": options.bar_color,
            "border-radius": "4px",
            "padding-top": "5px",
            "padding-bottom": "5px",
            "padding-left": "5px"
        })
        if((options.status_values[i] / az.hold_value.divide_by) === 0) {
            az.style_html(options.this_class + "_hold_status_bar", i + 1, {
                "display" : "none"
            })
        }
        if (options.hasOwnProperty("slice_bar_titles")) {
            if(options.status_titles[i] != "") {
            az.add_text(options.this_class + "_hold_status_bar", i + 1, {
                "this_class": options.this_class + "_status_bar_title",
                "text": options.status_titles[i].slice(0, 10) + "..."
            })
        }
        } else {
            az.add_text(options.this_class + "_hold_status_bar", i + 1, {
                "this_class": options.this_class + "_status_bar_title",
                "text": options.status_titles[i]
            })
        }
        az.all_style_text(options.this_class + "_status_bar_title", {
            "white-space": "nowrap",
            "color": "whitesmoke",
            "font-size": "16px",
            "font-family": "arial",
        })
    }
    })
    if (options.hasOwnProperty("pop_option")) {
        az.add_icon(options.this_class + "_status_box_layout_outer_cells", 1, {
            "this_class": options.this_class + "_pop_status_icon",
            "icon_class": "fa-object-ungroup"
        })
        az.style_icon(options.this_class + "_pop_status_icon", 1, {
            "color": "whitesmoke",
            "font-size": "20px",
            "cursor": "pointer",
            "position": "absolute",
            "margin-top": "-120px",
            "margin-left" : "10px"
        })
        az.add_event(options.this_class + "_pop_status_icon", 1, {
            "type": "click",
            "function": function(this_id) {
                az.toggle_functions({
                    "function1": function() {
                       
                        az.make_draggable(options.this_class + "_status_box_layout_outer", 1)
                        az.style_layout(options.this_class + "_status_box_layout_outer", 1, {
                            "width": "200%",
                            "border": "2px solid whitesmoke",
                            "box-shadow": "1px 1px 150px grey",
                            "column_widths" : ["10%", "90%"],
                            "z-index" : 999999999999
                        })
                        az.style_scrollable_container(options.this_class + "_scrollable", 1, {
                            "background": "#171D36"
                        })
                        
                    },
                    "function2": function() {
                        az.click_element("menu_icons", 6)
                    }
                })
            }
        })
    }
    az.add_text(options.this_class + "_status_box_layout_outer_cells", 1, {
        "this_class": options.this_class + "_status_box_title",
        "text": options.title
    })
    az.style_text(options.this_class + "_status_box_title", 1, options.title_styles)
    az.add_text(options.this_class + "_status_box_layout_outer_cells", 1, {
        "this_class": options.this_class + "_status_box_subtitle",
        "text": options.subtitle
    })
    az.style_text(options.this_class + "_status_box_subtitle", 1, options.subtitle_styles)
}
az.components.banner = function banner(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_banner_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_banner_layout",
        "row_class": options.this_class + "_banner_layout_rows",
        "cell_class": options.this_class + "_banner_layout_cells",
        "number_of_rows": 1,
        "number_of_columns": options.cell_content.length
    })
    az.style_layout(options.this_class + "_banner_layout", 1, {
        "table-layout": "fixed",
        "height": options.height,
        "width": options.width,
        "border": options.border
    })
    az.all_style_layout(options.this_class + "_banner_layout_cells", {
        "halign": "center",
        "background": options.cell_color
    })
    options.cell_content.forEach(function(elem, i) {
        az.add_html(options.this_class + "_banner_layout_cells", i + 1, {
            "html": elem
        })
    })
}
az.components.menu = function menu(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_banner_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_menu_layout",
        "row_class": options.this_class + "_menu_layout_rows",
        "cell_class": options.this_class + "_menu_layout_cells",
        "number_of_rows": options.cell_content.length,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_menu_layout", 1, options.menu_styles)
    var menu_defaults = {
        "border-collapse": "collapse",
        "border": 1
    }
    var menu_styles_concat = Object.assign(menu_defaults, options.menu_styles);
    var menu_cell_defaults = {
        "border": "1px dashed grey",
        "border-top-style": "none",
        "border-right-style": "none",
        "border-bottom-style": "1px dashed lightgrey",
        "border-left-style": "none",
        "cursor": "pointer"
    }
    var menu_cell_concat = Object.assign(menu_cell_defaults, options.all_cell_styles);
    az.style_layout(options.this_class + "_menu_layout", 1, menu_styles_concat)
    az.all_style_layout(options.this_class + "_menu_layout_cells", menu_cell_concat)
    options.cell_styles.forEach(function(elem, i) {
        az.style_layout(options.this_class + "_menu_layout_cells", i + 1, elem)
    })
    if (options.hasOwnProperty("row_heights")) {
        options.row_heights.forEach(function(elem, i) {
            az.style_layout(options.this_class + "_menu_layout_cells", i + 1, {
                "height": elem
            })
        })
    }
    if (options.hasOwnProperty("on_cell_clicks")) {
        options.on_cell_clicks.forEach(function(elem, i) {
            if (typeof(elem) === "function") {
                az.add_event(options.this_class + "_menu_layout_cells", i + 1, {
                    "type": "click",
                    "function": function() {
                        az.call_callback(elem())
                    }
                })
            }
        })
    }
    options.cell_content.forEach(function(elem, i) {
        az.add_html(options.this_class + "_menu_layout_cells", i + 1, {
            "html": elem
        })
    })
}
az.components.side_menu = function side_menu(options) {
    az.remove_element(options.this_class, 1)
    az.add_overlay({
        "this_class": options.this_class + "_overlay",
        "speed": 400,
        "outside_close": true
    })
    az.style_overlay(options.this_class + "_overlay", 1, {
        "height": "100%",
        "width": options.width,
        "background": options.background_color
    })
    az.add_text(options.this_class + "_overlay", 1, {
        "this_class": options.this_class + "_overlay_title",
        "text": options.title
    })
    az.style_text(options.this_class + "_overlay_title", 1, {
        "margin-top": "10px",
        "align": "center",
        "font-size": "20px",
        "color": options.title_color,
        "margin-bottom": "20px",
        "font-family": "arial"
    })
    az.all_style_text("close_overlay_x", {
        "display": "none"
    })
    az.add_layout(options.this_class + "_overlay", 1, {
        "this_class": options.this_class + "_hamburger_layout",
        "row_class": options.this_class + "_hamburger_layout_rows",
        "cell_class": options.this_class + "_hamburger_layout_cells",
        "number_of_rows": options.menu_items.length,
        "number_of_columns": options.columns
    })
    az.fill_column(options.this_class + "_hamburger_layout", 1, {
        "header": false,
        "column_number": 1,
        "cell_class": options.this_class + "_hamburger_layout_cells",
        "text_class": options.this_class + "_ham_menu_text",
        "array": options.menu_items
    })
    az.style_layout(options.this_class + "_hamburger_layout", 1, {
        "width": "95%",
        "height": "auto",
        "align": "center",
        "border": 0
    })
    az.all_style_text(options.this_class + "_ham_menu_text", {
        "font-size": options.font_size,
        "color": options.font_color,
        "align": "left",
        "margin": "20px",
        "cursor": "pointer",
        "font-family": "Ubuntu"
    })
    az.all_style_layout(options.this_class + "_hamburger_layout_cells", {
        "halign": "center"
    })
    az.all_add_event(options.this_class + "_ham_menu_text", {
        "type": "hover",
        "function": function(this_id) {
            az.style_text(options.this_class + "_ham_menu_text", az.get_target_instance(this_id), {
                "color": options.hover_color
            })
        }
    })
    az.all_add_event(options.this_class + "_ham_menu_text", {
        "type": "unhover",
        "function": function(this_id) {
            az.all_style_text(options.this_class + "_ham_menu_text", {
                "color": options.font_color
            })
        }
    })
    options.call_on_click.forEach(function(elem, i) {
        az.add_event(options.this_class + "_ham_menu_text", i + 1, {
            "type": "click",
            "function": function() {
                az.call_callback(elem())
            }
        })
    })
    az.add_event("background_dark_23kjh423", 1, {
        "type": "click",
        "function": function() {
            az.all_remove_element(options.this_class + "_overlay_title")
            az.all_remove_element(options.this_class + "_ham_menu_text")
        }
    })
}
az.components.search_and_scroll = function(target_class, target_instance, options) {
    az.remove_element(options.this_class, 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_layout",
        "row_class": options.this_class + "_layout_rows",
        "cell_class": options.this_class + "_layout_cells",
        "number_of_rows": 2,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_layout", 1, {
        "height": options.height,
        "width": options.width,
        "align": "center",
        "border": 0
    })
    az.style_layout(options.this_class + "_layout_cells", 1, {
        "height": "20%"
    })
    az.all_style_layout(options.this_class + "_layout_cells", {
        "halign": "center"
    })
    az.add_scrollable_container(options.this_class + "_layout_cells", 2, {
        "this_class": options.this_class + "_scrollable",
        "direction": "vertical"
    })
    az.style_scrollable_container(options.this_class + "_scrollable", 1, {
        "width": "100%",
        "height": "100%",
        "background": "transparent",
        "border": "none"
    })
    options.html_content.forEach(function(elem, i) {
        az.add_html(options.this_class + "_scrollable", 1, {
            "html": elem
        })
        if (options.hasOwnProperty("on_click_cell")) {
            az.add_event(options.this_class + "_hold_html", i + 1, {
                "type": "click",
                "function": function() {
                    az.call_callback(options.on_click_cell())
                }
            })
        }
    })
    az.add_input(options.this_class + "_layout_cells", 1, {
        "this_class": options.this_class + "_input",
        "placeholder": "search ..."
    })
    az.style_input(options.this_class + "_input", 1, {
        "width": "85%",
        "align": "center",
        "background": options.search_background_color,
        "color": options.search_font_color
    })
    az.hide_and_seek(options.this_class + "_input", 1, {
        "show_class": options.show_class
    })
}
az.components.utility.create_conditional_color_array = function(arr_of_values, default_color, threshold, threshold_color) {
    var colors = az.create_array(1, arr_of_values.length, default_color)
    cnt = -1
    arr_of_values.forEach(function(elem) {
        cnt++
        var indexes = []
        if (elem > threshold) {
            indexes.push(cnt)
            colors[cnt] = threshold_color
        }
    })
    return (colors)
}
az.components.utility.check_if_id_exists = function(id) {
    var check = document.getElementById(id);
    if (check) return (true)
    else return (false)
}
az.components.utility.revserse_array = function reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        newArray.push(arr[i]);
    }
    return newArray;
}
az.components.utility.map_values_to_color_spectrum = function(values, color_spectrum) {
    const valueMap = values.map((val, i) => ({
        oldIndex: i,
        value: val
    })).sort((a, b) => a.value - b.value);
    valueMap.forEach((val, i) => val.color = color_spectrum[i]);
    valueMap.sort((a, b) => a.oldIndex - b.oldIndex);
    const newColors = valueMap.map(val => val.color);
    return (newColors);
}
az.components.bar_chart = function(target_class, target_instance, options) {
    az.remove_element(options.this_class, 1)
    var color_spectrum = az.components.utility.create_color_spectrum_array(options.conditional_coloring_b.max_color, options.conditional_coloring_b.min_color, options.values.length)
    var this_row_color_arr = az.components.utility.map_values_to_color_spectrum(options.values, color_spectrum)
    var data = [{
        x: options.names,
        y: options.values,
        marker: {
            color: this_row_color_arr //az.components.utility.create_conditional_color_array(options.values, options.default_color, options.conditional_coloring.threshold, options.conditional_coloring.color)
        },
        type: 'bar'
    }]
    var config = {
        responsive: true,
        "displayModeBar": false
    }
    var layout = {
        height: options.height,
        showticklabels: false,
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        font: {
            color: options.axis_font_color
        },
        xaxis: {
            tickangle: 90,
            tickfont: {
                size: 14
            }
        },
        margin: options.margins,
        title: ""
    }
    az.add_html(target_class, target_instance, {
        "html": "<div id='hold_bar_chart'></div>"
    })
    Plotly.newPlot("hold_bar_chart", data, layout, config);
}
az.components.heatmap = function(target_class, target_instance, options) {
    az.remove_element(options.this_class, 1)
    var data = [{
        z: options.data.values,
        x: options.data.x_categories,
        y: options.data.y_categories,
        type: 'heatmap',
        hoverongaps: true,
        colorscale: [
            ['0.0', "#429501"],
            ['0.5', "#F59C08"],
            ['1.0', "#FE0C00"]
        ]
    }];
    var layout = {
        height: 300,
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        font: {
            color: "white",
            size: 14
        },
        margin: options.margins,
        title: {
            text: "",
            font: {
                family: "Ubuntu",
                size: 18,
                color: "white"
            }
        },
        yaxis: {
            title: options.y_axis_title,
            tickmode: "array",
            tickvals: az.components.utility.revserse_array(az.create_array(0, options.data.y_categories.length - 1)),
            ticktext: options.data.y_categories
        }
    }
    var config = {
        responsive: true,
        "displayModeBar": false
    }
    az.add_html(target_class, target_instance, {
        "html": "<div id='hold_heat_map'></div>"
    })
    az.call_once_satisfied({
        condition: "az.components.utility.check_if_id_exists('hold_heat_map')",
        function: function() {
            Plotly.newPlot("hold_heat_map", data, layout, config)
            document.getElementById('hold_heat_map').on('plotly_hover', function(data) {
                var infotext = data.points.map(function(d) {
                    console.log(d.data.name + " : " + d.x + " : " + d.y)
                });
            })
        }
    })
}
az.components.gauge = function(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_layout",
        "row_class": options.this_class + "_layout_rows",
        "cell_class": options.this_class + "_layout_cells",
        "number_of_rows": 1,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_layout", 1, {
        "width": options.width,
        "height": options.height,
        "border": 0
    })
    var data = [{
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        value: options.value,
        number: {
            suffix: options.suffix
        },
        title: {
            text: "<span style='color:#ffda79'>" + options.title + "</span>"
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [0, 100],
                tickwidth: 0,
                tickformat: "",
                tickcolor: "transparent"
            },
            bar: {
                color: "#FE1301"
            },
            bgcolor: "transparent",
            borderwidth: 2,
            bordercolor: "white",
            steps: [{
                range: [0, 1],
                color: "grey"
            }, {
                range: [0, 1],
                color: "green"
            }],
            threshold: {
                line: {
                    color: "red",
                    width: 4
                },
                thickness: 0.75,
                value: 75
            }
        }
    }];
    var config = {
        responsive: true,
        "displayModeBar": false
    }
    var layout = {
        width: 280,
        height: 200,
        margin: {
            t: 0,
            b: 0,
            l: 50,
            r: 50
        },
        paper_bgcolor: "transparent",
        font: {
            color: "whitesmoke",
            family: "Arial"
        }
    };
    az.hold_value.last_gauge_id = "gauge_" + az.makeid()
    az.add_html(options.this_class + "_layout_cells", 1, {
        "html": "<div id=" + az.hold_value.last_gauge_id + "></div>"
    })
    az.call_once_satisfied({
        condition: "az.components.utility.check_if_id_exists(az.hold_value.last_gauge_id)",
        function: function() {
            Plotly.newPlot(az.hold_value.last_gauge_id, data, layout, config);
        }
    })
}
az.components.heatmap_2 = function(target_class, target_instance, options) {
    az.remove_element(options.this_class, 1)
    var longest_array_length = az.components.utility.longest_array_length(options.values)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_layout_outer",
        "row_class": options.this_class + "_layout_outer_rows",
        "cell_class": options.this_class + "_layout_outer_cells",
        "number_of_rows": 1,
        "number_of_columns": 4
    })
    az.style_layout(options.this_class + "_layout_outer", 1, {
        "width": options.width,
        "height": options.height,
        "column_widths": ["20%", "70%", "4%", "6%"],
        "border": 0
    })
    az.add_layout(options.this_class + "_layout_outer_cells", 1, {
        "this_class": options.this_class + "_y_category_layout",
        "row_class": options.this_class + "_y_category_layout_rows",
        "cell_class": options.this_class + "_y_category_layout_cells",
        "number_of_rows": options.y_categories.length,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_y_category_layout", 1, {
        "border": 0
    })
    az.fill_column(options.this_class + "_y_category_layout", 1, {
        "header": false,
        "cell_class": options.this_class + "_y_category_layout_cells",
        "cell_number": 1,
        "text_class": options.this_class + "_y_categories",
        "array": options.y_categories.map(function(x) {return(x.slice(0,10))})
    })
    az.all_style_text(options.this_class + "_y_categories", {
        "color": "whitesmoke",
        "align" : "right",
        "font-family" : "arial",
        "font-size" : "18px"
    })
    az.call_multiple({
        "iterations": az.number_of_elements(options.this_class + "_y_categories"),
        "function": function(elem, index) {
            az.add_tooltip(options.this_class + "_y_category_layout_cells", index + 1, {
                "this_class": "category_tooltip",
                "text": "<span style='color: #FFDA79'>" + options.y_categories[index] + "</span>"
            })
            az.style_tooltip("category_tooltip", 1, {
                "background": "#313954",
                "color": "whitemoke",
                "box-shadow": "1px 1px 15px #141414",
                "border": "2px solid #FFDA79",
                "margin-top": "-25px",
                "margin-left": "-80px"
            })
        }
    })
    az.add_layout(options.this_class + "_layout_outer_cells", 2, {
        "this_class": options.this_class + "_layout",
        "row_class": options.this_class + "_layout_rows",
        "cell_class": options.this_class + "_layout_cells",
        "number_of_rows": options.y_categories.length,
        "number_of_columns": longest_array_length
    })
    az.style_layout(options.this_class + "_layout", 1, {
        "width": "100%",
        "height": "100%",
        "border": options.border
    })
    az.all_style_layout(options.this_class + "_layout_cells", {
        "background": "#313954"
    })
    az.call_multiple({
        "iterations": az.get_row_count(options.this_class + "_layout", 1),
        "function": function(dummy, row_index) {
            az.fill_row(options.this_class + "_layout", 1, {
                "header": false,
                "cell_class": options.this_class + "_layout_cells",
                "text_class": options.this_class + "_value",
                "row_number": row_index + 1,
                "array": options.values[row_index]
            })
            az.all_style_html(options.this_class + "_layout_cells", {
                "color": "whitesmoke",
                "font-family" : "arial"
            })
            az.all_style_text(options.this_class + "_value", {
                "visibility": "hidden"
            })
            var color_spectrum = az.components.utility.create_color_spectrum_array(options.max_color, options.min_color, longest_array_length)
            var this_row_color_arr = az.components.utility.map_values_to_color_spectrum(options.values[row_index], color_spectrum)
            options.values[row_index].forEach(function(value, i) {
                az.style_layout(options.this_class + "_layout_cells", (row_index * longest_array_length) + (i + 1), {
                    "background": this_row_color_arr[i]
                })
                az.add_text(options.this_class + "_layout_cells", (row_index * longest_array_length) + (i + 1), {
                    "this_class": "show_heamap_value",
                    "text": "<span style='display:none'>" + value.toFixed(2) + "</span>"
                })
                az.add_tooltip(options.this_class + "_layout_cells", (row_index * longest_array_length) + (i + 1), {
                    "this_class": "my_tooltip",
                    "text": "<span style='color: #FFDA79'>Device ID: </span>" + options.y_categories[row_index] + "<br>" + "<span style='color: #FFDA79'>Value: </span>" + value.toFixed(2) + "<br>" + "<span style='color: #FFDA79'>Metric Name: </span>" + options.names[row_index][i]
                })
                az.style_tooltip("my_tooltip", 1, {
                    "background": "#313954",
                    "color": "whitemoke",
                    "box-shadow": "1px 1px 15px #141414",
                    "border": "2px solid #FFDA79",
                    "margin-top": "-80px",
                    "margin-left": "-80px"
                })
            })
        }
    })
    az.style_html(options.this_class + "_layout_outer_cells", 4, {
        "background-image": "linear-gradient(to bottom, red, #f06d06, rgb(255, 255, 0), green)"
    })
}
az.components.utility.create_color_spectrum_array = function(start_hex, end_hex, number_of_colors) {
    function hex(c) {
        var s = "0123456789abcdef";
        var i = parseInt(c);
        if (i == 0 || isNaN(c)) return "00";
        i = Math.round(Math.min(Math.max(0, i), 255));
        return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
    }

    function convertToHex(rgb) {
        return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
    }

    function trim(s) {
        return (s.charAt(0) == '#') ? s.substring(1, 7) : s
    }

    function convertToRGB(hex) {
        var color = [];
        color[0] = parseInt((trim(hex)).substring(0, 2), 16);
        color[1] = parseInt((trim(hex)).substring(2, 4), 16);
        color[2] = parseInt((trim(hex)).substring(4, 6), 16);
        return color;
    }

    function generateColor(colorStart, colorEnd, colorCount) {
        var start = convertToRGB(colorStart);
        var end = convertToRGB(colorEnd);
        var len = colorCount;
        var alpha = 0.0;
        var saida = [];
        for (i = 0; i < len; i++) {
            var c = [];
            alpha += (1.0 / len);
            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];
            saida.push(convertToHex(c));
        }
        return saida;
    }
    var res = generateColor(start_hex, end_hex, number_of_colors);
    res = res.map(function(x) {
        return ("#" + x.toString())
    })
    return (res)
}
az.components.utility.longest_array_length = function(values) {
    var lengths = []
    values.forEach(function(arr) {
        lengths.push(arr.length)
    })
    max_length = Math.max.apply(null, lengths);
    return (max_length)
}
az.components.bar_chart_multiple = function(target_class, target_instance, options) {
    az.remove_element(options.this_class + "_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_layout",
        "row_class": options.this_class + "_layout_rows",
        "cell_class": options.this_class + "_layout_cells",
        "number_of_rows": 1,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_layout", 1, {
        "width": options.width,
        "height": options.height,
        "border": 0
    })
    var trace1 = {
        x: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5', 'Device 6', 'Device 7', 'Device 8', 'Device 9', 'Device 10'],
        y: [20, 14, 25, 16, 18, 22, 19, 15, 12, 16],
        type: 'bar',
        name: "Previous",
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };
    var trace2 = {
        x: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5', 'Device 6', 'Device 7', 'Device 8', 'Device 9', 'Device 10'],
        y: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12],
        type: 'bar',
        name: "Current Time Window",
        marker: {
            color: 'rgb(204,204,204)',
            opacity: 0.5
        }
    };
    var data = [trace1, trace2];
    var config = {
        responsive: true,
        "displayModeBar": false
    }
    var layout = {
        title: "",
        height: 270,
        width: 750,
        font: {
            color: "white"
        },
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        xaxis: {
            tickangle: -45
        },
        margin: {
            l: 10,
            r: 10,
            b: 50,
            t: 10,
            pad: 0
        },
        barmode: 'group',
        legend: {
            x: 0.4,
            y: 1.2
        }
    };
    az.hold_value.last_bar_multiple_id = "gauge_" + az.makeid()
    az.add_html(options.this_class + "_layout_cells", 1, {
        "html": "<div id=" + az.hold_value.last_bar_multiple_id + "></div>"
    })
    az.call_once_satisfied({
        condition: "az.components.utility.check_if_id_exists(az.hold_value.last_bar_multiple_id)",
        function: function() {
            Plotly.newPlot(az.hold_value.last_bar_multiple_id, data, layout, config);
        }
    })
}
az.components.calendar = function(target_class, target_instance, options) {
    az.load_script("https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js")
    az.remove_element(options.this_class + "_outer_layout", 1)
    az.add_layout(target_class, target_instance, {
        "this_class": options.this_class + "_outer_layout",
        "row_class": options.this_class + "_outer_layout_rows",
        "cell_class": options.this_class + "_outer_layout_cells",
        "number_of_rows": 3,
        "number_of_columns": 1
    })
    az.style_layout(options.this_class + "_outer_layout", 1, {
        "height": options.height,
        "width": options.width,
        "align": "center",
        "border": 0
    })
    az.add_layout(options.this_class + "_outer_layout_cells", 1, {
        "this_class": options.this_class + "_header_layout",
        "row_class": options.this_class + "_header_layout_rows",
        "cell_class": options.this_class + "_header_layout_cells",
        "number_of_rows": 1,
        "number_of_columns": 3
    })
    az.style_layout(options.this_class + "_header_layout", 1, {
        "height": "100%",
        "width": "100%",
        "margin-bottom": "10px",
        "border": 0
    })
    az.add_text(options.this_class + "_header_layout_cells", 2, {
        "this_class": options.this_class + "_today_date",
        "text": az.components.utility.get_today_date()
    })
    az.style_text(options.this_class + "_today_date", 1, {
        "align": "center",
        "color": "whitesmoke",
        "font-size": "18px",
        "font-family": "arial",
        "white-space": "nowrap"
    })
    az.add_icon(options.this_class + "_header_layout_cells", 1, {
        "this_class": options.this_class + "_back_icon",
        "icon_class": "fa-arrow-circle-left"
    })
    az.add_icon(options.this_class + "_header_layout_cells", 3, {
        "this_class": options.this_class + "_forward_icon",
        "icon_class": "fa-arrow-circle-right"
    })
    az.style_icon(options.this_class + "_back_icon", 1, {
        "font-size": "30px",
        "color": "whitesmoke",
        "cursor": "pointer"
    })
    az.style_icon(options.this_class + "_forward_icon", 1, {
        "font-size": "30px",
        "color": "whitesmoke",
        "float": "right",
        "cursor": "pointer"
    })
    az.components.selected_month_datetime = {}
    az.add_event(options.this_class + "_back_icon", 1, {
        "type": "click",
        "function": function() {
            if (typeof(az.components.selected_month_datetime[options.this_class]) === "undefined") {
                az.components.selected_month_datetime[options.this_class] = az.components.utility.add_months(new Date(), -1)
            } else {
                az.components.selected_month_datetime[options.this_class] = az.components.utility.add_months(az.components.selected_month_datetime[options.this_class], -1)
            }
            var month_name = az.components.utility.months[az.components.selected_month_datetime[options.this_class].getMonth()]
            az.components.utility.fill_calendar(options, month_name, az.components.selected_month_datetime[options.this_class].getFullYear())
            $("." + options.this_class + "_today_date").text(az.components.utility.format_date(az.components.selected_month_datetime[options.this_class]))
        }
    })
    az.add_event(options.this_class + "_forward_icon", 1, {
        "type": "click",
        "function": function() {
            if (typeof(az.components.selected_month_datetime[options.this_class]) === "undefined") {
                az.components.selected_month_datetime[options.this_class] = az.components.utility.add_months(new Date(), 1)
            } else {
                az.components.selected_month_datetime[options.this_class] = az.components.utility.add_months(az.components.selected_month_datetime[options.this_class], 1)
            }
            var month_name = az.components.utility.months[az.components.selected_month_datetime[options.this_class].getMonth()]
            az.components.utility.fill_calendar(options, month_name, az.components.selected_month_datetime[options.this_class].getFullYear())
            $("." + options.this_class + "_today_date").text(az.components.utility.format_date(az.components.selected_month_datetime[options.this_class]))
        }
    })
    az.add_layout(options.this_class + "_outer_layout_cells", 2, {
        "this_class": options.this_class + "_days_layout",
        "row_class": options.this_class + "_days_layout_rows",
        "cell_class": options.this_class + "_days_layout_cells",
        "number_of_rows": 1,
        "number_of_columns": 7
    })
    az.style_layout(options.this_class + "_days_layout", 1, {
        "height": "auto",
        "width": "100%",
        "border": 0
    })
    var days = az.components.utility.days
    var months = az.components.utility.months
    days.forEach(function(day, i) {
        if (options.hasOwnProperty("day_name_length")) {
            if (options.day_name_length === "short") {
                var show_day = day.slice(0, 3)
            } else {
                var show_day = day
            }
        } else {
            var show_day = day
        }
        az.add_text(options.this_class + "_days_layout_cells", i + 1, {
            "this_class": options.this_class + "_show_day",
            "text": show_day
        })
        az.all_style_text(options.this_class + "_show_day", {
            "align": "center",
            "color": "whitesmoke",
            "font-family": "arial",
            "font-size": "18px"
        })
    })
    az.components.utility.fill_calendar(options, az.get_everything_before(az.components.utility.get_today_date(), ","), new Date().getFullYear())
}
az.components.utility.fill_calendar = function(options, month, year) {
    az.remove_element(options.this_class + "_calendar_layout", 1)
    az.add_layout(options.this_class + "_outer_layout_cells", 3, {
        "this_class": options.this_class + "_calendar_layout",
        "row_class": options.this_class + "_calendar_layout_rows",
        "cell_class": options.this_class + "_calendar_layout_cells",
        "number_of_rows": 7,
        "number_of_columns": 7
    })
    az.style_layout(options.this_class + "_calendar_layout", 1, {
        "border": options.border,
        "height": options.height
    })
    az.style_layout(options.this_class + "_calendar_layout_rows", 1, {
        "pointer-events": "none",
        "height": "0px"
    })
    az.style_layout(options.this_class + "_calendar_layout_rows", 7, {
        "height": "0px"
    })
    days_per_month = {
        "january": 31,
        "february": 28,
        "march": 31,
        "april": 30,
        "may": 31,
        "june": 30,
        "july": 31,
        "august": 31,
        "september": 30,
        "october": 31,
        "november": 30,
        "december": 31,
    }
    az.call_once_satisfied({
        "condition": "typeof(dateFns) === 'object'",
        "function": function() {
            start_on_calendar = az.components.utility.get_first_day_of_month_year(dateFns, month, year);
            if (month === "February" && (year % 4) === 0) {
                var use_iterations = Object.values(days_per_month)[az.components.utility.months.indexOf(month)] + 1
            } else {
                var use_iterations = Object.values(days_per_month)[az.components.utility.months.indexOf(month)]
            }
            az.call_multiple({
                "iterations": use_iterations + 8, // adding 8 to account for header
                "function": function(elem, index) {
                    if( index < use_iterations) {
                    az.add_text(options.this_class + "_calendar_layout_cells", index + 8 + start_on_calendar.getDay(), {
                        "this_class": options.this_class + "_show_day_number",
                        "text": index + 1
                    })
                    az.style_text(options.this_class + "_show_day_number", index + 1, {
                        "color": "whitesmoke",
                        "align": "center",
                        "pointer-events" : "none"
                    })
                    }
                    if (options.hasOwnProperty("on_click_cell")) {
                        az.add_event(options.this_class + "_calendar_layout_cells", index + 1, {
                            "type": "click",
                            "function": function(this_id) {
                                az.call_callback(options.on_click_cell(this_id))
                            }
                        })
                    }
                    if(index === new Date().getDate()) {
                        setTimeout(function() {
                        if(az.grab_value("calendar_today_date", 1).includes(az.components.utility.months[new Date().getMonth()])) {
                            az.style_html(options.this_class + "_calendar_layout_cells", index + 8, {
                                "background" : "#ccae62"
                            })
                        }
                    }, 200)
                    }
                    /*
                    if (typeof(az.components.selected_month_datetime[options.this_class]) !== "undefined") {
                        if ((new Date().getDay() - 1) === (index + 1) && (az.components.utility.months.indexOf(month) === new Date().getMonth())) {
                            az.style_text(options.this_class + "_show_day_number", index + 1, {
                                "background": "blue" // today's day
                            })
                        }
                    } else {
                        if ((new Date().getDay() - 1) === (index + 1) && az.components.utility.months.indexOf(month) == (new Date().getMonth())) {
                            az.style_text(options.this_class + "_show_day_number", index + 1, {
                                "background": "blue" // today's day
                            })
                        }
                    }
                    */
                    if (options.hasOwnProperty("only_past_dates")) {
                        if (options.only_past_dates) {
                            if (az.components.selected_month_datetime[options.this_class] <= new Date()) {
                                az.style_text(options.this_class + "_show_day_number", index + 1, {
                                    "pointer-events": "auto",
                                    "color": "rgba(250,250,250,1)"
                                })
                                az.store_data(options.this_class + "_show_day_number", index + 1, {
                                    "key": "store_date",
                                    "value": (index + 1).toString() + " : " + month.toString() + " : " + year.toString()
                                })
                                if (az.components.selected_month_datetime[options.this_class].getMonth() === new Date().getMonth()) {
                                    if (index > (new Date().getDay() - 2)) {
                                        az.style_text(options.this_class + "_show_day_number", index + 1, {
                                            "pointer-events": "none",
                                            "color": "rgba(250,250,250,0.4)"
                                        })
                                    }
                                }
                            } else {
                                az.style_text(options.this_class + "_show_day_number", index + 1, {
                                    "pointer-events": "none",
                                    "color": "rgba(250,250,250,0.4)"
                                })
                            }
                            if (typeof(az.components.selected_month_datetime[options.this_class]) === "undefined") {
                                az.style_text(options.this_class + "_show_day_number", index + 1, {
                                    "pointer-events": "auto",
                                    "color": "rgba(250,250,250,1)"
                                })
                                az.store_data(options.this_class + "_show_day_number", index + 1, {
                                    "key": "store_date",
                                    "value": (index + 1).toString() + " : " + month.toString() + " : " + year.toString()
                                })
                                if (index > (new Date().getDay() - 2)) {
                                    az.style_text(options.this_class + "_show_day_number", index + 1, {
                                        "pointer-events": "none",
                                        "color": "rgba(250,250,250,0.4)"
                                    })
                                }
                            }
                        }
                    }
                }
            })
        }
    })
}
az.components.utility.get_first_day_of_month_year = function(dateFns, month, year) {
    var months = az.components.utility.months
    month_number = months.indexOf(month)
    first_day = dateFns.startOfMonth(new Date(year, month_number))
    return (first_day)
}
az.components.utility.get_today_date = function() {
    var today = new Date();
    var res = az.components.utility.format_date(today)
    return (res)
}
az.components.utility.format_date = function(datetime_object) {
    var dd = String(datetime_object.getDate()).padStart(2, '0');
    var mm = String(datetime_object.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = datetime_object.getFullYear();
    //var show_day_name = az.components.utility.days[Number(dd)]
    //var show_day_number = dd
    res = az.components.utility.months[Number(mm) - 1] + ", " + yyyy;
    return (res)
}
az.components.utility.add_months = function(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}
az.components.line_chart = function(target_class, target_instance, options) {
    rows = options.data
    var first_date = az.components.utility.get_first_and_last_date(options.data)["first_date"]
    var last_date = az.components.utility.get_first_and_last_date(options.data)["last_date"]

    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key];
        });
    }
    var trace1 = {
        type: "scatter",
        mode: "lines",
        x: unpack(rows, 'timestamp'),
        y: unpack(rows, 'value'),
        line: {
            color: '#17BECF'
        }
    }
    var data = [trace1]
    var config = {
        responsive: true,
        "displayModeBar": false
    }
    var layout = {
        height: 350,
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        font: {
            color: "white"
        },
        title: options.title,
        xaxis: {
            autorange: true,
            rangeslider: {
                range: [first_date, last_date]
            },
            gridcolor: "grey",
            type: 'date'
        },
        yaxis: {
            autorange: true,
            range: [-2, 2],
            gridcolor: "grey",
            type: 'linear'
        },
        margin: {
            l: 50,
            r: 10,
            b: 50,
            t: 50,
            pad: 0
        }
    };
    az.add_html(target_class, target_instance, {
        "html": "<div id='hold_line_chart'></div>"
    })
    Plotly.newPlot("hold_line_chart", data, layout, config);
}
az.components.utility.get_first_and_last_date = function(data) {
    var times = []
    data.forEach(function(elem) {
        times.push(elem["timestamp"])
    })
    var res = {}
    res["first_date"] = times[0]
    res["last_date"] = times.filter(x => x).pop() // gets last non-null date entry
    return (res)
}
az.components.utility.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
az.components.utility.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

az.components.fancy_alert = function(options) {
    az.add_modal({
        "this_class" : options.this_class + "_modal",
        "content_class" : options.this_class + "_modal_content"
    })
    az.style_modal(options.this_class + "_modal", 1, {
        "width" : "auto",
        "height" : "auto",
        "background" : options.background_color,
        "box-shadow": "1px 1px 150px grey"
    })
    az.add_text(options.this_class + "_modal_content", 1, {
        "this_class" : options.this_class + "_fancy_alert_text",
        "text" : options.text
    })
    az.style_text(options.this_class + "_fancy_alert_text", 1, {
        "align" : "center"
    })
}