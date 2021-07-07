const db = require("../data/db-config.js");

module.exports = {
  findSchemes,
  findSteps,
  findSchemeById,
  findStepById,
  findSteps,
  add,
  addStep,
  update,
  remove,
};

// find all schemes
function findSchemes() {
  return db("schemes");
}

// find all steps
function findSteps() {
  return db("steps");
}

// find scheme by id
function findSchemeById(id) {
  return db("schemes")
    .where({ id })
    .first();
  //? how to make it so that on invalid id, returns null?
}

// find step by id
function findStepById(id) {
  return db("steps")
    .where({ id })
    .first();
  //? how to make it so that on invalid id, returns null?
}

// find steps by scheme id
function findSteps(id) {
  return (
    db("steps")
      .innerJoin("schemes", "steps.scheme_id", "=", "schemes.id")
      .select(
        "steps.id",
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions",
      )
      .where({ scheme_id: id })
      //? order by step number, comes after where ?
      .orderBy("step_number")
  );
}

// add new scheme
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => findById(id));
}

// add new step by scheme id
function addStep(step, id) {
  return db("steps")
    .insert({ ...step, scheme_id: id })
    .then(([id]) => findStepById(id));
}

// update scheme
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(([id]) => findById(id));
}

// remove scheme
function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
  //? how to resolve to null on invalid id?
}
