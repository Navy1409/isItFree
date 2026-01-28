CREATE TABLE office_bookings (
  id SERIAL PRIMARY KEY,
  "userId" UUID NOT NULL,
  "officeId" UUID NOT NULL,
  "bookingDate" DATE NOT NULL,
  "startTime" TIME NOT NULL,
  "endTime" TIME NOT NULL,
  "createdAt" DATE DEFAULT CURRENT_DATE,
  config JSONB NOT NULL,

  CONSTRAINT office_bookings_user_fkey
    FOREIGN KEY ("userId")
    REFERENCES users("userId"),

  CONSTRAINT office_bookings_office_fkey
    FOREIGN KEY ("officeId")
    REFERENCES offices("officeId"),

  CONSTRAINT office_booking_config_valid
    CHECK (
      config ? 'row'
      AND config ? 'column'
      AND (config->>'row')::int > 0
      AND (config->>'column')::int > 0
    )
);
