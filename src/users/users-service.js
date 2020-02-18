//const bcrypt = require("bcrypt");
//import { randomBytes } from "crypto";

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

  getByUsername(knex, username) {
    return knex
      .from("users")
      .select("*")
      .where("username", username)
      .first();
  },

  updateUser(knex, username, newUserFields) {
    return knex("users")
      .where({ username })
      .update(newUserFields);
  },

  deleteUser(knex, username) {
    return knex("users")
      .where({ username })
      .delete();
  }
};

module.exports = UsersService;

//password hashing
/* hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        err ? reject(err) : resolve(hash);
      });
    });
  },

  createToken() {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, data) => {
        err ? reject(err) : resolve(data.toString("base64"));
      });
    });
  }, */
