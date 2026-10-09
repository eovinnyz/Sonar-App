# Sonar — versão 1.16.1

Player de música no estilo Spotify feito para o grupo de amigos. Roda direto no navegador (PC e celular).

## Arquivos
- `index.html` — estrutura da página (telas de abertura, login e o esqueleto do app)
- `style.css` — todo o visual e as animações
- `script.js` — toda a lógica do app
- `assets/` — logo e ícone da aba
- `.nojekyll` — avisa o GitHub Pages para publicar os arquivos como estão

## Publicar no GitHub Pages
1. Crie um repositório **público** (ex.: `sonar`).
2. Envie todos estes arquivos e a pasta `assets` para a raiz do repositório.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
4. Em 1 a 2 minutos o site abre em `https://SEU-USUARIO.github.io/sonar/`.

## Testar no computador
Abra o `index.html` direto no navegador, ou rode `python -m http.server 8000` nesta pasta e acesse `http://localhost:8000`.

## Onde ligar o Google Drive depois
- Armazenamento hoje (IndexedDB, só no aparelho): `openDB`, `dbAll`, `dbPut`, `dbDel`, `adbAll`, `adbPut`, `adbDel` em `script.js`.
- Tocar a música: `play(i)` usa `s.file` (arquivo local). Trocar por uma URL do Drive.
- Enviar música nova: `createUp()`.
- Login: `doLogin()` hoje aceita só o nome de usuário, sem senha, e vale só neste navegador. Antes de liberar escrita no Drive, trocar por "Entrar com Google".
- Quem é administrador: `ADMINS` em `script.js`.

## Segurança
Não coloque senhas, chaves secretas nem músicas dentro do repositório (ele é público). Chave de API e ID de cliente do Google podem ficar no código, desde que restritos ao endereço do site.
