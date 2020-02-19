const UsersService = {
  getAllUsers(knex) {
    return knex.select("*").from("users");
  },

  createNewUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(users => {
        return users[0];
      });
  },

  getByUsername(knex, id) {
    return knex
      .from("users")
      .select("*")
      .where("id", id)
      .first();
  },

  updateUser(knex, id, newUserFields) {
    return knex("users")
      .where({ id })
      .update(newUserFields);
  },

  deleteUser(knex, id) {
    return knex("users")
      .where({ id })
      .delete();
  }
};

module.exports = UsersService;
