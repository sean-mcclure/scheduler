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

