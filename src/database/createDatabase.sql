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
  "userId" INTEGER NOT NULL,
	"token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "shortURLs" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL,
	"bigURLId" INTEGER NOT NULL,
	"shortURL" TEXT UNIQUE NOT NULL,
	"visitCount" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "bigURLs" (
	"id" SERIAL PRIMARY KEY,
	"bigURL" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "shortURLs" ADD CONSTRAINT "shortURLs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "shortURLs" ADD CONSTRAINT "shortURLs_fk1" FOREIGN KEY ("bigURLId") REFERENCES "bigURLs"("id");
