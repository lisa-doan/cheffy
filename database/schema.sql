set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."cookbook" (
  "recipeId"    serial,
  "uri"       text not null,
  "label"       text not null,
  "image"       text not null,
  "calories"    text not null,
  "mealType"     text not null,
  "createdAt" timestamptz(6) not null default now(),
  primary key ("recipeId")
);

 create table "public"."users" (
  "userId"             serial,
  "username"           text              not null,
  "hashedPassword"     text              not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
 );
