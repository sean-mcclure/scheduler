function save_to_parse(data) {
    var data = JSON.stringify(data)
    const new_event = Parse.Object.extend("events");
    const this_event = new new_event();
    this_event.set("event", data);
    this_event.save().then((res) => {
        console.log(res)
    }, (error) => {
        console.log(error)
    });
}
async function fetch_from_parse() {
    var events_res = Parse.Object.extend("events");
    var query = new Parse.Query(events_res);
    const res = await query.find();
    az.hold_value.fetch_results = res;
}
async function delete_from_parse(object_id) {
    var events_res = Parse.Object.extend("events");
    var query = new Parse.Query(events_res);
    query.get(object_id, {
        success: function(obj) {
            obj.destroy({});
        },
        error: function(object, error) {}
    });
}