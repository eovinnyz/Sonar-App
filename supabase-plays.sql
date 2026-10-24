-- Contador de reproduções de todos os aparelhos (rode no SQL Editor do Supabase)
create table if not exists plays (song_id text primary key, artist text, title text, n bigint not null default 0);
alter table plays enable row level security;
drop policy if exists "plays" on plays;
create policy "plays" on plays for all using (true) with check (true);
create or replace function inc_play(sid text, art text, ttl text) returns bigint language sql security definer as $$
  insert into plays(song_id, artist, title, n) values (sid, art, ttl, 1)
  on conflict (song_id) do update set n = plays.n + 1, artist = excluded.artist, title = excluded.title
  returning n;
$$;
grant execute on function inc_play(text, text, text) to anon, authenticated;
