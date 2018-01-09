module.exports = function (models) {
    for (let i = 0; i < 10; i++) {
        models.User.create({
            name: "test" + i,
            email: "test" + i + "@test" + i + ".de",
            password: "lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4="
        });

        models.APIKey.create({user_id: 1 + i, apiKey: "l" + (1 + i)});
    }
    [
        {name: "Super Party 1", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 1},
        {name: "Super Party 2", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 2},
        {name: "Super Party 3", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 3},
        {name: "Super Party 4", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 4},
        {name: "Super Party 5", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 5},
        {name: "Super Party 6", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 6},
        {name: "Super Party 7", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 7},
        {name: "Super Party 8", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 8}
    ].forEach((value) => {
        models.Party.create(value);
    });
    [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
        [4, 5],
        [6, 7],
        [7, 8]
    ].forEach(value => {
        models.Contactlist.create({user_id1: value[0], user_id2: value[1]});
        models.Guestlist.create({user_id: value[0], party_id: value[1]});
    });
    [
        {party_id: 1, text: "Freitext1", status: 0},
        {party_id: 1, text: "Freitext2", status: 0},
        {party_id: 2, text: "Freitext3", status: 0},
        {party_id: 3, text: "Freitext4", status: 0},
        {party_id: 4, text: "Freitext5", status: 0},
        {party_id: 5, text: "Freitext6", status: 0},
        {party_id: 6, text: "Freitext7", status: 0},
        {party_id: 1, text: "Freitext8", status: 0},
        {party_id: 1, text: "Freitext9", status: 0}
    ].forEach(value => {
        models.Todolistitem.create(value);
        value.user_id = value.party_id;
        models.Task.create(value);
    });
};