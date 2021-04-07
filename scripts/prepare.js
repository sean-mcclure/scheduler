az.load_font("Oswald")
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