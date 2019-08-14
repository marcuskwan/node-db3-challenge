const db = require('../data/db-config.js');

module.exports = {
    getUsers,
    getById,
    add,
    getUserPosts,
    update,
    remove,
};

function getUsers() {
    return db('users');
}
function getById(id) {
    return db('users').where({ id });
}

function add(user) {
    return db('users').insert(user);
}

function getUserPosts(id) {
    return db('posts as p')
        .innerJoin('users as u', 'p.user_id', '=', 'u.id')
        .select('p.id', 'p.contents', 'u.username as postedBy')
        .where({ user_id: id });
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}