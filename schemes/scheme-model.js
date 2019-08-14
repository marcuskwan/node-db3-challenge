const db = require('../data/db-config.js');

module.exports = {
    getSchemes,
    getById,
    add,
    getSchemeSteps,
    update,
    remove,
};

function getSchemes() {
    return db('schemes');
}
function getById(id) {
    return db('schemes').where({ id });
}

function add(scheme) {
    return db('schemes').insert(scheme);
}

function getSchemeSteps(id) {
    return db('steps)
        .innerJoin('schemes', 'steps.scheme_id', '=', 'schemes.id')
        .select('steps.id',
            'schemes.scheme_name',
            'steps.step_number',
            'steps.instructions')
        .where({ scheme_id: id });
}

function update(id, changes) {
    return db('schemes')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
}