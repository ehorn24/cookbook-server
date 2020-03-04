INSERT INTO "public"."users"("firstname", "lastname", "username", "password","profilepicture","profilebio")
VALUES('Ella', 'Horn', 'ellahorn', 'password','https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.fit-760w.jpg','This is me, editing my bio.') RETURNING "id", "firstname", "lastname", "username", "password", "profilepicture","profilebio";

INSERT INTO "public"."users"("firstname", "lastname", "username", "password", "profilepicture", "profilebio")
VALUES('John', 'Nicholas', 'johnnicholas', 'hello123','https://www.nationalgeographic.com/content/dam/yourshot/2014/03/3143130.jpg','My speciality is ordering Dominos pizza.') RETURNING "id", "firstname", "lastname", "username", "password", "profilepicture","profilebio";

INSERT INTO "public"."users"("firstname", "lastname", "username", "password", "profilepicture", "profilebio")
VALUES('Praveen', 'Kumar', 'praveenk', 'ilikecats','https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*','The best things in life are cats and food.') RETURNING "id", "firstname", "lastname", "username", "password", "profilepicture","profilebio";

INSERT INTO "public"."users"("firstname", "lastname", "username", "password", "profilepicture", "profilebio")
VALUES('Bob', 'Smith', 'bobsmith', 'iambobsmith','https://static1.bigstockphoto.com/6/0/3/large1500/306858373.jpg','Did someone say dessert?') RETURNING "id", "firstname", "lastname", "username", "password", "profilepicture","profilebio";
