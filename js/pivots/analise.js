// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "analise",
  "categoria": "apoio",
  "tipo": "apoio",
  "icone": "🧠",
  "titulo": "Análise & Visualização",
  "subtitulo": "// Transformar dados coletados em entendimento: mapas de vínculo, grafos, processamento por IA e análise de mídia.",
  "modulos": [
    {
      "num": "01",
      "nome": "Mapas de Vínculo & Grafos",
      "icone": "🧠",
      "opsec": {
        "nivel": "passivo"
      },
      "vetor": "Dados dispersos ➔ Grafo de relacionamentos / Linha do tempo",
      "objetivo": "Organizar visualmente pessoas, entidades e eventos e suas conexões.",
      "camadas": [
        {
          "id": "analise-01-c1",
          "titulo": "Diagramas e Grafos de Relacionamento",
          "tools": [
            {
              "id": "Mermaid Live Editor",
              "aplicacao": "✅ Testada em 14/11: Abre com diagrama de exemplo renderizado (1 SVG, 6 nós) e o código fica na própria URL (#pako:…), sem conta."
            },
            {
              "id": "MITRE ATT&CK",
              "aplicacao": "✅ Testada em 14/11: /techniques/{ID}/: T1566 → Phishing, com 4 subtécnicas, procedimentos, mitigações e detecções."
            },
            {
              "id": "Chatmind",
              "aplicacao": "Transforma anotações e relatórios brutos em um primeiro mapa mental do caso, útil para enxergar rapidamente entidades e lacunas antes de montar o grafo definitivo."
            },
            {
              "id": "Google Keep",
              "aplicacao": "Caixa de entrada rápida para registrar achados, links e prints durante a coleta, que depois são transferidos para o grafo ou relatório."
            },
            {
              "id": "MindMeister",
              "aplicacao": "Organiza hipóteses e frentes de investigação em mapa mental hierárquico, facilitando dividir tarefas e acompanhar o que já foi verificado."
            },
            {
              "id": "MindMup",
              "aplicacao": "Mapa mental gratuito e leve para estruturar o cenário da investigação, com exportação para documentar o raciocínio no relatório."
            },
            {
              "id": "Miro",
              "aplicacao": "Quadro colaborativo para montar o mural do caso (pessoas, empresas, endereços, evidências) e trabalhar em equipe sobre o mesmo mapa de vínculos."
            },
            {
              "id": "MISP (Open Source Threat Intelligence Platform)",
              "aplicacao": "Registra os indicadores técnicos do caso (IPs, domínios, hashes) e os correlaciona automaticamente com eventos anteriores e comunidades de compartilhamento."
            },
            {
              "id": "OpenCTI (Open Cyber Threat Intelligence)",
              "aplicacao": "Base estruturada para relacionar atores, campanhas, infraestrutura e indicadores, consolidando investigações cibernéticas de longo prazo."
            },
            {
              "id": "Plataforma Lucidchart",
              "aplicacao": "Diagramas de vínculo, organogramas societários e cronologias com aparência profissional, adequados para anexar a relatórios formais."
            },
            {
              "id": "Whimsical",
              "aplicacao": "Fluxogramas e mapas de relacionamento rápidos para explicar a cadeia de pivotagem que levou de um dado inicial às conclusões."
            },
            {
              "id": "yEd Graph Editor",
              "aplicacao": "Importa planilhas de vínculos e organiza automaticamente grafos grandes (sócios, contas, transações), revelando agrupamentos e nós centrais."
            }
          ],
          "nota": "Mapas mentais, fluxogramas e link analysis.",
          "filtro": [
            "analise-visualizacao"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Processamento por IA",
      "icone": "🤖",
      "opsec": {
        "nivel": "passivo"
      },
      "vetor": "Volume de texto/dados ➔ Resumo / Estruturação / Classificação",
      "objetivo": "Usar IA para resumir, estruturar e classificar grandes volumes.",
      "camadas": [
        {
          "id": "analise-02-c1",
          "titulo": "Modelos, RAG e Ambientes de IA",
          "tools": [
            {
              "id": "LlamaIndex",
              "aplicacao": "Indexa grandes volumes de documentos coletados (PDFs, relatórios, dumps) para consultá-los em linguagem natural com um LLM, citando o trecho de origem."
            },
            {
              "id": "Undetectable AI",
              "aplicacao": "Ajuda a avaliar se um texto suspeito (perfil, avaliação, comunicado) foi provavelmente gerado por IA, como indício a ser confirmado por outras fontes."
            }
          ],
          "nota": "Processamento de linguagem e dados com IA.",
          "filtro": [
            "analise-processamento-ia"
          ],
          "excluir": [
            "Bluegrass AI"
          ]
        }
      ]
    }
  ]
});
