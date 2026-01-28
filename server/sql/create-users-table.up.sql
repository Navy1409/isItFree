CREATE TABLE users (
  "userId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "userName" VARCHAR NOT NULL,
  "emailId" VARCHAR NOT NULL UNIQUE,
  password TEXT NOT NULL,
  "isAdmin" BOOLEAN DEFAULT FALSE,
  "organisationId" UUID NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE,

  CONSTRAINT users_organisation_fkey
    FOREIGN KEY ("organisationId")
    REFERENCES organisations("organisationId")
);
