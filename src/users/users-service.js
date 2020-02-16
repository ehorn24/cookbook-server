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
  }
};

module.exports = UsersService;
