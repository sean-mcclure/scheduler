az.load_font("Oswald")

az.style_page({
    "background" : "#227093"
})

az.style_body({
    "background" : "#227093",
    "font-family" : "Oswald",
    "color" : "whitesmoke"
})

az.add_sections({
    "this_class" : "main_section",
    "sections" : 1
})

az.style_sections("main_section", 1, {
    "height" : "auto",
    "background" : "#218c74"
})

az.call_once_satisfied({
    "condition" : "typeof(az.components.calendar) === 'function'",
    "function" : function() {
        az.components.calendar("main_section", 1, {
            this_class : "calendar",
            height: "80vh"
        })
    }
})