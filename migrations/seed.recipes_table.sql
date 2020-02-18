INSERT INTO "public"."recipes"("username", "recipename", "ingredients", "instructions") VALUES('ellahorn', 'Pepper Steak', '{steak,soy sauce,onion}', '{marinate steak,cook steak,add veggies,serve}') RETURNING "id", "username", "recipename", "ingredients", "instructions";

INSERT INTO "public"."recipes"("username", "recipename", "ingredients", "instructions") VALUES('johnnicholas', 'Curry Shrimp', '{shrimp,red curry paste,veggies}', '{cook shrimp,add paste,serve}') RETURNING "id", "username", "recipename", "ingredients", "instructions";

