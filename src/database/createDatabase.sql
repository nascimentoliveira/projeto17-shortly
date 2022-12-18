CREATE DATABASE "shortly";

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"shortUrl" TEXT UNIQUE NOT NULL,
	"url" TEXT NOT NULL,
	"visitCount" INTEGER NOT NULL DEFAULT 0,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);