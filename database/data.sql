insert into "users" ("username", "hashedPassword")
values ('johndoe', '$argon2i$v=19$m=4096,t=3,p=1$fL8yC/yIvlnx+WDvFdedDA$4EG0LFH/W/CUOekumGQpzswUD4j22VDYVnhJx4Emzqk');

insert into "cookbook" ("uri", "label", "image", "calories", "mealType")
values ('http://www.edamam.com/ontologies/edamam.owl#recipe_63ccc00c3c1051750933c9ad8fb9e987', 'Pie', 'https://www.edamam.com/web-img/847/847f01b1c8ade1d802f913e2c7981ba5.jpg', 500, 'dessert')
