az.load_font("Oswald")

az.style_page({
    "background" : "#d1ccc0"
})

az.style_body({
    "background" : "#d1ccc0",
    "font-family" : "Oswald",
    "color" : "whitesmoke"
})

az.add_sections({
    "this_class" : "main_section",
    "sections" : 1
})

az.style_sections("main_section", 1, {
    "height" : "auto",
    "background" : "#218c74",
    "border-radius" : "6px"
})

az.call_once_satisfied({
    "condition" : "typeof(az.components.calendar) === 'function'",
    "function" : function() {
        az.components.calendar("main_section", 1, {
            this_class : "calendar",
            height: "80vh",
            on_click_cell : function(this_id) {
               // $("#" + this_id).css("background", "pink")
               az.add_modal({
                   "this_class" : "pop_schedule",
                   "content_class" : "pop_schedule_content"
               })
               az.style_modal("pop_schedule", 1, {
                   "width" : "500px",
                   "height" : "auto",
                   "overflow-y" : "hidden",
                   "background" : "#f7f1e3",
                   "box-shadow" : "2px 2px 100px #141414",
                   "border" : "4px solid #141414"
               })
               az.add_text("pop_schedule_content", 1, {
                   "this_class" : "schedular_title",
                   "text" : "ADD EVENT"
               })
               az.style_text("schedular_title", 1, {
                   "align" : "center",
                   "color" : "#141414",
                   "font-family" : "Oswald",
                   "font-size" : "26px",
                   "margin-bottom" : "40px"
               })
               az.add_text("pop_schedule_content", 1, {
                   "this_class" : "modal_titles",
                   "text" : "NAME"
               })
               az.add_input("pop_schedule_content", 1, {
                   "this_class" : "event_name",
                   "placeholder" : "name..."
               })
               az.style_input("event_name", 1, {
                  "margin-bottom" : "30px",
                   "font-family" : "Oswald"
               })
               az.all_style_input("event_name", {
                   "align" : "center",
                   "border" : "none",
                   "margin-top" : "10px",
                   "background" : "#ffda79",
                   "width" : "90%",
                   "outline" : 0
               })
               az.add_text("pop_schedule_content", 1, {
                   "this_class" : "modal_titles",
                   "text" : "TIME"
               })
               az.all_style_text("modal_titles", {
                   "font-family" : "Oswald",
                   "font-size" : "20px",
                   "align" : "center",
                   "color" : "#141414"
               })
               az.add_html("pop_schedule_content", 1, {
                   "html" : "<input type='time' class='pick_time' id='appt' name='appt' min='09:00' max='18:00' required>"
               })
               az.style_html("pick_time", 1, {
                   "align" : "center",
                   "margin-top" : "20px"
               })
               az.add_button("pop_schedule_content", 1, {
                   "this_class" : "add_event_button",
                   "text" : "ADD"
               })
               az.style_button("add_event_button", 1, {
                   "align" : "center",
                   "margin-top" : "20px",
                   "background" : "#218c74"
               })
               az.add_event("add_event_button", 1, {
                   "type" : "click",
                   "function" : function() {
                       az.animate_element("add_event_button", 1, {
                           "type" : "spin"
                       })
                   }
               })
            }
        })
    }
})