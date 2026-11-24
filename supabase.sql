-- Banco do Pausa no Supabase.
-- Cole tudo no SQL Editor do projeto e clique em Run. Pode rodar de novo sem problema.

-- Uma linha por conta, com todos os dados do app num JSON.
-- Formato de "dados": { "<chave>": { "v": <valor>, "t": <hora do servidor em ms> } }
create table if not exists public.pausa_dados (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);

-- Permissão para quem está logado usar a tabela (projetos novos podem vir sem isso).
-- O RLS logo abaixo garante que cada conta só enxerga e altera a própria linha.
grant usage on schema public to authenticated;
grant select, insert, update on public.pausa_dados to authenticated;

-- Cada conta só enxerga e altera a própria linha.
alter table public.pausa_dados enable row level security;

drop policy if exists "pausa: dono le" on public.pausa_dados;
drop policy if exists "pausa: dono cria" on public.pausa_dados;
drop policy if exists "pausa: dono altera" on public.pausa_dados;
create policy "pausa: dono le" on public.pausa_dados
  for select to authenticated using (auth.uid() = user_id);
create policy "pausa: dono cria" on public.pausa_dados
  for insert to authenticated with check (auth.uid() = user_id);
create policy "pausa: dono altera" on public.pausa_dados
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Recebe só as partes que mudaram, carimba com a hora do servidor
-- e devolve tudo o que está salvo. A hora é sempre a do servidor,
-- então o relógio errado de um aparelho não atrapalha.
create or replace function public.pausa_sync(mudancas jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  atual jsonb;
  agora bigint := (extract(epoch from clock_timestamp()) * 1000)::bigint;
  k text;
  v jsonb;
begin
  if auth.uid() is null then
    raise exception 'login necessario';
  end if;

  insert into public.pausa_dados (user_id) values (auth.uid())
    on conflict (user_id) do nothing;

  select dados into atual from public.pausa_dados
    where user_id = auth.uid()
    for update;

  for k, v in select key, value from jsonb_each(coalesce(mudancas, '{}'::jsonb)) loop
    atual := jsonb_set(atual, array[k], jsonb_build_object('v', v, 't', agora), true);
  end loop;

  update public.pausa_dados set dados = atual, atualizado_em = now()
    where user_id = auth.uid();

  return atual;
end;
$$;

revoke all on function public.pausa_sync(jsonb) from public, anon;
grant execute on function public.pausa_sync(jsonb) to authenticated;
