// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "forense",
  "categoria": "apoio",
  "tipo": "apoio",
  "icone": "🧰",
  "titulo": "Forense Local & Preservação",
  "subtitulo": "// Processar arquivos na própria estação e preservar evidências com validade.",
  "modulos": [
    {
      "num": "01",
      "nome": "Forense & Processamento Local",
      "icone": "🧰",
      "opsec": {
        "nivel": "passivo"
      },
      "vetor": "Arquivo / Dump ➔ Texto extraído / Metadados / Evidência indexada",
      "objetivo": "Tratar arquivos, dumps e mídias localmente, sem enviá-los a terceiros.",
      "camadas": [
        {
          "id": "forense-01-c1",
          "titulo": "Extração, Conversão e Análise Local",
          "tools": [
            {
              "id": "Extrator CPF/CNPJ Console",
              "aplicacao": "✅ Testada em 14/11: Script JavaScript para colar no console do navegador (repositório atualizado em 2026-10-08."
            },
            {
              "id": "GNU Awk (gawk)",
              "aplicacao": "✅ Testada em 14/11: Testado localmente (GNU Awk 5.4.0): extraiu o campo do CNPJ por separador."
            },
            {
              "id": "GNU grep",
              "aplicacao": "✅ Testada em 14/11: Testado localmente (GNU grep 3.0 no Git Bash do Windows): extraiu e-mails válidos de texto misto com -oE e descartou o inválido."
            },
            {
              "id": "GNU sed (Stream Editor)",
              "aplicacao": "✅ Testada em 14/11: Testado localmente (GNU sed 4.9): substituiu um CNPJ por [CNPJ] com expressão regular."
            },
            {
              "id": "JSON Viewer Pro",
              "aplicacao": "✅ Testada em 14/11: Extensão do Chrome (300 mil usuários) que formata e navega JSON (útil para ler respostas de API)."
            },
            {
              "id": "Extrator de Links (Inspetor de Elementos)",
              "aplicacao": "⚠️ Testada em 14/11: Script de console (repositório parado desde 2023-04-15."
            },
            {
              "id": "IPED",
              "aplicacao": "Processa e indexa imagens de disco, celulares e grandes acervos de arquivos, com busca, categorização e relatório forense em ambiente local."
            },
            {
              "id": "MarkItDown",
              "aplicacao": "Converte PDFs, planilhas e documentos Office em texto Markdown, preparando o material para busca, comparação ou análise com IA."
            },
            {
              "id": "NirSoft",
              "aplicacao": "Conjunto de utilitários portáteis para examinar artefatos do Windows (histórico de navegação, redes Wi-Fi conhecidas, dispositivos USB) em máquinas analisadas."
            },
            {
              "id": "qpdf",
              "aplicacao": "Inspeciona a estrutura interna de PDFs (objetos, metadados, versões incrementais), revelando edições posteriores e conteúdo oculto."
            }
          ],
          "nota": "Processamento de texto, documentos e mídia na estação.",
          "filtro": [
            "forense-local"
          ],
          "excluir": [
            "Trinket Python 3 Embed"
          ]
        }
      ]
    }
  ]
});
