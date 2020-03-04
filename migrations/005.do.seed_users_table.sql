INSERT INTO "public"."users"("firstname", "lastname", "username", "password") VALUES('Ella', 'Horn', 'ellahorn', 'password') RETURNING "id", "firstname", "lastname", "username", "password";
INSERT INTO "public"."users"("firstname", "lastname", "username", "password") VALUES('John', 'Nicholas', 'johnnicholas', 'hello123') RETURNING "id", "firstname", "lastname", "username", "password";
