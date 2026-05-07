# Ativa

Landing page profissional para a agência Ativa, focada em automação de atendimento com IA, qualificação de leads e agendamento automático com SDR.

Inclui modo claro/escuro com preferência salva no navegador e variante da logo preparada para dark mode.

## URLs legais

Quando publicado em `ativa.business`, use:

- `https://ativa.business/politica-de-privacidade/`
- `https://ativa.business/termos-de-servico/`
- `https://ativa.business/exclusao-de-dados/`

## Como rodar localmente

Abra o arquivo `index.html` diretamente no navegador.

Se preferir servir por HTTP local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Ajustar WhatsApp

Troque `55SEUNUMERO` pelo número real da Ativa em `script.js`. Para manter o fallback sem JavaScript, troque também as ocorrências de `55SEUNUMERO` em `index.html`.
