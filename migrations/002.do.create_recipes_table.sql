CREATE TABLE recipes (
  username TEXT REFERENCES users(username) NOT NULL,
  recipename TEXT NOT NULL,
  picture TEXT NOT NULL,
)