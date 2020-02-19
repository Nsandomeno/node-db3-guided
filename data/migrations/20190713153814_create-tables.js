exports.up = function(knex) {
  return knex.schema
    // Users Table
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
    })
    // Posts Table
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');
      // Foreign Key
      tbl.integer('user_id') // the foreign key must be the same type as the primary key it references
        .unsigned() // always include .unsigned() when referencing as integer primary key
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')  // what happens if the value of the primary key is changed
        .onDelete('CASCADE'); // what happens if the primary key table row is deleted
        // RESTRICT, DO NOTHING, SET NULL, CASCADE
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
