# Validação da primeira versão

19/11/2026. Chromium local, Playwright; viewports 1440×900 e 390×844.

- Entrada padrão: c. 36, Santo Estêvão, um testemunho e um lugar; zoom de cidade em Jerusalém.
- Parâmetro `?year=2026`: 1.112 testemunhos acumulados, câmera expandida até o mundo.
- Próximo ano com registros, retorno ao início e reprodução automática verificados no navegador.
- Controle da timeline por teclado: seta direita altera o ano de 36 para 37.
- Sidebar abre/fecha; busca por Soveral em 1645 retorna André de Soveral; ficha e seção de fontes abrem.
- O cartão oculto é `inert` e `aria-hidden`; tentativa de foco no botão invisível não o seleciona.
- Sem erro JavaScript não tratado nas capturas finais.
- Sem transbordamento horizontal no celular; rodapé da timeline dentro da altura da tela.
- Sintaxe JavaScript e integridade de todos os registros verificadas por `npm run check`.
- Revisão Impeccable: dois apontamentos corrigidos (foco em controle oculto e contexto acima do título). Verdict pass: ship, limitado à resolução desses apontamentos.

Limitações conhecidas: pontos próximos se sobrepõem no enquadramento mundial; zoom e lista pesquisável permitem consultar os registros. O mapa detalhado requer acesso aos tiles do OpenStreetMap. A maior parte da base é importada, ainda sem conferência editorial; 16 registros possuem conferência explícita.

As capturas locais de QA ficam em `.impeccable/review/` e não são versionadas.
