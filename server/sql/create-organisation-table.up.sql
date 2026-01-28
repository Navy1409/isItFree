CREATE TABLE organisations (
  "organisationId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organisationName" VARCHAR NOT NULL,
  "createdAt" DATE DEFAULT CURRENT_DATE,
  open_time TIME DEFAULT '09:00:00',
  close_time TIME DEFAULT '17:00:00'
);
