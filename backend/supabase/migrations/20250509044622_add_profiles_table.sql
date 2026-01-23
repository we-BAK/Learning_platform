create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  email text unique,
  role text default 'user'
);
