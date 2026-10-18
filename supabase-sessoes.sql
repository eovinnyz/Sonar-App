create table sessions (id text primary key, device text not null, seen bigint not null);
alter table sessions enable row level security;
create policy "sessoes" on sessions for all using (true) with check (true);
drop policy if exists "sessoes" on sessions;
create policy "sessoes" on sessions for all using (true) with check (true);
