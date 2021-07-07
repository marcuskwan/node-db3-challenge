exports.up = function(knex) {
  return knex.schema
    .createTable("schemes", tbl => {
      tbl.increments();
      tbl
        .text("scheme_name", 128)
        .unique()
        .notNullable();
    })
    .createTable("steps", tbl => {
      tbl.increments();
      tbl
        .integer("step_number")
        // bans negative integers
        .unsigned()
        // required
        .notNullable();
      tbl.text("instructions").notNullable();
      tbl
        .integer("scheme_id")
        .unsigned()
        .notNullable()
        // references id..
        .references("id")
        // in the table 'schemas'
        .inTable("schemes")
        //? updates all relational foreign keys/scheme_ids if id in schemes gets updated?
        .onUpdate("CASCADE")
        //? deletes if a scheme_id in steps or a id in schemes gets deleted?
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("steps").dropTableIfExists("schemes");
};
