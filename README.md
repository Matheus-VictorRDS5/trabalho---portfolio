# Portfólio · Fitas VHS

## Como abrir
Abra o `index.html` no navegador (precisa de internet: Three.js e as fontes VT323 e Playfair Display vêm de CDN).
Se preferir um servidor local: `python3 -m http.server 8000` e acesse http://localhost:8000.

## Seleção de fitas (carrossel 3D)
Arraste, use a roda do mouse, as setas do teclado ou os botões < > para girar o arco.
Clique na fita do meio para abrir. A lógica está em `js/main.js` (bloco "carrossel 3D em arco"):
os números de espaçamento, inclinação e brilho ficam na função `render`.
O visual das capas (borda desgastada, "Home Video", selo VHS) está em `css/style.css`.

## Fitas
Edite `js/data.js` (os campos estão explicados no topo do arquivo):
- `imagem`: arte da capa em `assets/` (de preferência 600x1200). Se ficar vazio, a capa usa um padrão gerado com o nome da fita.
- `cor`: cor de destaque da capa.
- `animacao` (por cena, opcional): `"combinado"`, `"vhs"` ou `"digitacao"`. Vazio = o site alterna sozinho.

## PC 3D
O PC dos anos 90 é construído em código, na função `initGL` de `js/main.js`.

## Fonte
Troque `--font` no topo de `css/style.css`.
