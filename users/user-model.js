const db = require("../data/db-config.js")


module.exports = {
    add,
    update
}

function add(user) {
    return db('users').insert(user, 'id')
}

function update(id, changes) {
    return db('users')
    // where here is NOT destructuring it is saying
    // ...: { id: id }
    .where({ id })
    .update(changes);
}