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
