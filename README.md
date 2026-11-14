# OSINT LIPU — Catálogo de Ferramentas OSINT

Catálogo de ferramentas de **Inteligência de Fontes Abertas (OSINT)** com foco no contexto brasileiro.
Reúne 473 ferramentas descritas e classificadas por tipo de alvo, fonte de dados, função, plataforma e
custo, com notas de uso, cuidados de OPSEC e o resultado de verificações práticas.

É um site estático: HTML, CSS e JavaScript puros, sem build, sem servidor e sem dependências. Funciona
offline, abrindo os arquivos direto no navegador.

## Como usar

Abra `index.html` no navegador. Não há instalação.

- **Busca** em título, URL, tags, descrição, utilidade e notas, ignorando acentos.
- **Filtros por tag** com três estados por clique: *incluir* → *excluir* → *desligado*. Os contadores de
  cada tag se atualizam conforme os filtros ativos.
- **Glossário** da taxonomia de tags no botão `[ ? ]`.
- Visualização em grade ou lista; clique numa ferramenta para ver descrição, utilidade em OSINT e notas.

Existe também `catalogo-offline.html`: uma página única, com busca, que reúne nome, link e descrição
das ferramentas ativas, para levar num pendrive ou abrir sem os demais arquivos.

Para publicar, qualquer hospedagem de arquivos estáticos serve (por exemplo, GitHub Pages).

## Verificações

As ferramentas foram testadas na prática entre outubro e novembro de 2026. O resultado de cada teste
está nas **Notas de Uso** da ferramenta, na linha **Verificação (data)**: se funciona, o que entrega
de graça, o que exige conta ou pagamento, limitações e cuidados de privacidade. Ferramentas fora do ar
ou encerradas estão marcadas como descontinuadas.

## Estrutura

```
index.html              Catálogo
catalogo-offline.html   Versão de página única para uso offline
css/
  base.css              Tokens, reset, cabeçalho, layout e barra lateral
  catalogo.css          Estilos do catálogo
js/
  data.js               Catálogo de ferramentas (array TOOLS)
  app.js                Busca, filtros e detalhes
  components.js         Cabeçalho e rodapé
scripts/
  validate-data.cjs     Validação dos dados
```

## Dados

### Ferramenta (`js/data.js`)

```js
{
  "id": "Nome da Ferramenta",       // identificador único (igual ao título)
  "title": "Nome da Ferramenta",
  "url": "https://...",
  "tipo": "...",
  "utilidade": "resumo de uma linha",
  "descricao": "o que a ferramenta é",
  "utilidade_Osint": "como ela ajuda numa investigação",
  "notes": "dicas, cuidados de uso e verificações",
  "tags": ["alvo/empresa", "fonte/registros-publicos-gov", "acesso/gratuito"],
  "testada": true,                  // uso interno; não aparece no site
  "status": "active",               // opcional: active | limited | discontinued
  "lastVerified": "2026-11-13",     // opcional: data da última verificação (YYYY-MM-DD)
  "verificationUrl": "https://..." // opcional: fonte consultada
}
```

### Validar os dados

O workflow do GitHub Actions executa `node scripts/validate-data.cjs` em cada push e pull request.
A validação verifica campos obrigatórios, IDs, URLs, tags, status e datas. Para rodar localmente
(Node.js 20 ou superior):

```sh
node scripts/validate-data.cjs
```

### Taxonomia de tags

| Prefixo | Significado | Exemplos |
|---|---|---|
| `alvo/` | Tipo de entidade investigada | `pessoa-identidade`, `empresa`, `dominio`, `ip`, `veiculo` |
| `fonte/` | Origem dos dados | `redes-sociais`, `registros-publicos-gov`, `geoespacial` |
| `func/` | O que a ferramenta faz | `busca-identificacao`, `infraestrutura-cybint`, `forense-local` |
| `plataforma/` | Onde roda | `web`, `desktop`, `terminal`, `mobile` |
| `acesso/` | Custo | `gratuito`, `limitado`, `pago` |
| `opsec/` | Segurança do analista | `ambiente-seguro`, `personas` |

Ferramentas de apoio ao investigador (VPN, mapas, editores, OCR) não têm tag `alvo/` de propósito: não
são específicas de um tipo de alvo. A descrição de cada tag está no glossário do Catálogo.

## Uso responsável

O catálogo serve a investigações legítimas. Várias ferramentas tratam dados pessoais: use-as só com
base legal (no Brasil, observe a LGPD), prefira consultas passivas e leia os alertas nas notas. Telas
de recuperação de senha e de login estão marcadas com alerta: podem notificar o titular e registram
quem consulta.
