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
                   "height" : "400px",
                   "background" : "#f7f1e3",
                   "box-shadow" : "2px 2px 100px #141414",
                   "border" : "2px solid #141414"
               })
               az.add_text("pop_schedule_content", 1, {
                   "this_class" : "schedular_title",
                   "text" : "ADD EVENT"
               })
               az.style_text("schedular_title", 1, {
                   "align" : "center",
                   "color" : "#141414",
                   "font-family" : "Oswald",
                   "font-size" : "26px"
               })
            }
        })
    }
})