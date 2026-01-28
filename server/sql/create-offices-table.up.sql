CREATE TABLE offices (
  "officeId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organisationId" UUID NOT NULL,
  "officeName" VARCHAR NOT NULL,
  location VARCHAR,
  capacity INTEGER,
  "isGroup" BOOLEAN DEFAULT FALSE,
  "createdAt" DATE DEFAULT CURRENT_DATE,

  CONSTRAINT offices_organisation_fkey
    FOREIGN KEY ("organisationId")
    REFERENCES organisations("organisationId")
);
