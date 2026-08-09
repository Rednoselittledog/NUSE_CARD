CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- สำหรับ gen_random_uuid()

CREATE TYPE member_role AS ENUM ('member', 'staff');
CREATE TYPE activity_status AS ENUM ('draft', 'published', 'closed');

CREATE TABLE member (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    text NOT NULL UNIQUE,
  name          text NOT NULL,
  password_hash text NOT NULL,
  role          member_role NOT NULL DEFAULT 'member',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE activity (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  description    text,
  cover_image    text,
  location       text,
  starts_at      timestamptz NOT NULL,
  ends_at        timestamptz,
  checkin_token  text NOT NULL UNIQUE,
  checkin_open   boolean NOT NULL DEFAULT false,
  status         activity_status NOT NULL DEFAULT 'draft',
  created_by     uuid NOT NULL REFERENCES member(id),
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE attendance (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id    uuid NOT NULL REFERENCES activity(id),
  member_id      uuid NOT NULL REFERENCES member(id),
  checked_in_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (activity_id, member_id)
);

-- Every uploaded photo lives here: scoped to an activity (activity_id set)
-- or general/unscoped (null). `featured` marks it for display on the home
-- page gallery, independent of whether it's also tied to an activity.
CREATE TABLE image (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url            text NOT NULL,
  activity_id    uuid REFERENCES activity(id) ON DELETE CASCADE,
  featured       boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);
