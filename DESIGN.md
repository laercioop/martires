---
name: Mártires
description: Um atlas da memória no tempo e no mundo
colors:
  ink: "#213b47"
  muted: "#536b76"
  line: "#d3dee3"
  paper: "#fcfdfd"
  blue: "#e8f0f3"
  accent: "#933c50"
  past-marker: "#537586"
  white: "#ffffff"
  field-border: "#a3b4bd"
  search-surface: "#f0f5f7"
  active-surface: "#f4e9ec"
  reviewed-surface: "#e4eee8"
  reviewed-text: "#365c46"
  pending-surface: "#edf1f4"
  pending-text: "#4b626d"
typography:
  headline:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "0.95rem"
    lineHeight: 1.65
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
rounded:
  badge: "3px"
  field: "4px"
  control: "5px"
  scene: "6px"
  circle: "50%"
spacing:
  compact: "0.5rem"
  control-inline: "0.8rem"
  sidebar-inline: "1.25rem"
  map-inset: "32px"
components:
  button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.8rem"
  button-hover:
    backgroundColor: "{colors.blue}"
  play-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "44px"
  search-field:
    backgroundColor: "{colors.search-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.65rem 0.5rem 0.65rem 2.5rem"
  scene:
    rounded: "{rounded.scene}"
    padding: "1.4rem 1.6rem 1.2rem"
  reviewed-badge:
    backgroundColor: "{colors.reviewed-surface}"
    textColor: "{colors.reviewed-text}"
    rounded: "{rounded.badge}"
    padding: "0.25rem 0.4rem"
  pending-badge:
    backgroundColor: "{colors.pending-surface}"
    textColor: "{colors.pending-text}"
    rounded: "{rounded.badge}"
    padding: "0.25rem 0.4rem"
---

# Design System: Mártires

## Overview

**Creative North Star: "O atlas da memória"**

A cartografia ocupa o centro da experiência. A moldura azul esverdeada escura, as superfícies claras e a cor de vinho orientam a exploração sem competir com os lugares e os testemunhos. A atmosfera é sóbria, documental e contemplativa.

A tipografia serifada dá voz aos nomes e à narrativa; os controles usam uma sans-serif legível e compacta. Painéis pequenos e camadas discretas mantêm o mapa visível, enquanto a linha do tempo oferece um eixo contínuo para a leitura histórica.

**Key Characteristics:**
- Mapa como superfície principal.
- Narrativa serifada e controles sans-serif.
- Vinho para o momento atual; azul para os anos anteriores.
- Camadas claras, contornos finos e sombras discretas.

## Colors

A paleta combina tinta azul esverdeada, papel frio e vinho contido. Os valores normativos estão no frontmatter; as cores cartográficas vêm do mapa e recebem dessaturação.

### Primary
- **Vinho da memória** (`accent`): pontos do ano atual, progresso temporal, foco e seleção.

### Secondary
- **Azul dos testemunhos anteriores** (`past-marker`): registros acumulados no mapa.
- **Azul de repouso** (`blue`): superfície de hover dos botões comuns.

### Neutral
- **Tinta azul esverdeada** (`ink`): cabeçalho, texto principal e botão de reprodução.
- **Ardósia suave** (`muted`): texto de apoio e rótulos.
- **Papel frio** (`paper`) e **branco** (`white`): painéis e controles.
- **Linha fria** (`line`) e **borda de campo** (`field-border`): divisórias e campos.
- **Névoa de busca** (`search-surface`): campo de pesquisa.
- **Rosa de seleção** (`active-surface`): controle de acompanhamento ativo.

Os pares `reviewed-surface` / `reviewed-text` e `pending-surface` / `pending-text` identificam a conferência editorial, sempre acompanhados de texto.

**The Temporal Color Rule.** Reserve a cor de vinho para o ano atual, a posição na linha do tempo, a seleção e os estados de interação; preserve o azul dos registros anteriores.

## Typography

**Display Font:** Libre Baskerville, com Georgia e serif como alternativas.
**Body Font:** Source Sans 3, com sans-serif como alternativa.

A serifada permanece reservada à marca, aos títulos narrativos e à data em destaque. Os textos operacionais usam a sans-serif, com peso semibold nos controles e nomes de resultados.

### Hierarchy
- **Headline:** título da cena; cresce em telas largas e reduz progressivamente no celular.
- **Title:** nome na ficha individual; o título de fontes usa a mesma família e tamanho, com entrelinha ligeiramente mais aberta.
- **Body:** descrição e ficha; na cena a entrelinha é mais compacta que na ficha.
- **Label:** anos nos resultados, filtros e metadados. Metadados secundários podem reduzir para 0.8rem ou 0.75rem.

Os números de anos usam algarismos tabulares. A marca usa 1.55rem no desktop e 1.25rem no celular. A data principal usa 1.8rem no desktop e reduz nos pontos de quebra móveis.

## Layout

A aplicação ocupa a janela inteira, sem rolagem da página. O mapa preenche o espaço entre cabeçalho e linha do tempo. No desktop, o cabeçalho tem 76px, a linha do tempo 190px e a navegação lateral 360px. A navegação é uma camada rolável independente; sua abertura oculta a cena e desloca a legenda.

A cena fica no canto superior esquerdo, com recuo de 32px e largura máxima de 330px; as ferramentas ficam no canto superior direito. A legenda ocupa o canto inferior esquerdo. O painel temporal mantém transporte, ano e resumo em uma linha, seguido por histograma, slider e instruções.

Até 760px, cabeçalho e linha do tempo passam a 64px e 174px. A navegação mede no máximo a largura da janela menos 45px; a velocidade e informações secundárias do cabeçalho são ocultadas. A legenda desaparece quando a navegação abre. Até 430px, o ano e o século formam uma grade compacta, e o rodapé respeita a área segura do dispositivo. A partir de 1600px, a navegação cresce para 400px e a cena para 360px. Em desktop com altura até 620px, cabeçalho e linha do tempo reduzem para 60px e 160px.

## Elevation & Depth

O sistema usa divisórias finas para organizar conteúdo e sombras leves para separar controles flutuantes da cartografia. A cena e a legenda têm papel quase opaco; não há desfoque de fundo. O mapa é dessaturado por filtro para preservar a hierarquia dos pontos.

### Shadow Vocabulary
- **Cena:** sombra difusa sob o texto narrativo, para legibilidade sobre ruas e nomes.
- **Ferramentas:** sombra curta, unificando a pilha de controles.
- **Navegação:** sombra lateral, distinguindo a superfície rolável do mapa.
- **Linha do tempo:** sombra superior muito discreta; a borda define a separação principal.
- **Marcadores:** sombra pequena e borda branca para destacar os pontos da cartografia.

Os valores exatos de sombras e movimento estão no sidecar. Transições de estado são breves; a câmera usa uma viagem mais lenta. Movimento reduzido desativa as transições e as animações da câmera.

## Shapes

As formas são discretamente arredondadas: badges compactos, campos e legendas, botões e cena usam a pequena escala do frontmatter. Marcadores e reprodução são circulares. Resultados e abas são planos, com divisórias ou sublinhado de estado; não são cartões separados. Ícones são lineares, normalmente com 22px e traço de 1.7.

## Components

### Buttons

Controles compactos, claros e de peso semibold. O botão comum usa borda fria e hover azul claro. Ferramentas do mapa formam uma pilha contínua com divisórias internas. A reprodução é um círculo escuro com ícone branco. O menu inverte o tratamento sobre o cabeçalho escuro. O foco visível usa contorno vinho de 3px, afastado 4px; botões desabilitados reduzem a opacidade para 0.35.

### Inputs / Fields

Campos claros com borda fria e pequenos cantos arredondados. A busca usa superfície azul muito clara e ícone à esquerda. Selects têm seta linear e espaço à direita. O cursor de texto e o foco usam vinho. O ano é um campo numérico sem caixa aparente, com tipografia serifada.

### Navigation

Duas abas textuais, com a ativa em tinta e sublinhado vinho. O topo da navegação permanece fixo durante a rolagem. Resultados separam ano e identificação em duas colunas e usam divisória horizontal; o hover recebe um fundo frio discreto.

### Cards / Containers

A cena é uma única placa narrativa flutuante, com título serifado, explicação e ação separada por linha. A ficha usa tipografia e espaçamento para hierarquia dentro do painel, sem cartões aninhados. As fontes permanecem links sublinhados.

### Status badges

Badges pequenos distinguem fonte católica conferida de importação pendente. O estado conferido usa verde suave; o pendente, cinza azulado. O texto explicita o estado.

### Map markers

Pontos anteriores são azuis, e os do ano atual são maiores e em vinho. Uma cruz representa um registro; grupos mostram contagem. A seleção adiciona contorno vinho afastado. Tooltip escuro com texto branco identifica o lugar.

### Timeline

Histograma discreto atrás do eixo temporal, vinho na posição atual e azul nos períodos passados. O slider tem trilho fino, progresso vinho e puxador circular com borda branca. Reprodução, anterior e próximo permitem navegar entre anos com registros. Os pontos permanecem acumulados e a câmera acompanha sua expansão geográfica; arrastar o mapa desativa o acompanhamento.

## Do's and Don'ts

### Do:
- Do manter os controles em Source Sans 3 e os títulos narrativos em Libre Baskerville.
- Do preservar a distinção entre registros do ano atual e registros acumulados.
- Do manter a linha do tempo acessível na base da janela em todas as larguras.
- Do conservar indicação textual para o estado de conferência das fontes.

### Don't:
- Don't usar a cor de vinho como preenchimento genérico de grandes superfícies.
- Don't transformar a navegação lateral em uma grade de cartões decorativos.
- Don't ocultar os créditos cartográficos ou a indicação de revisão dos dados.
- Don't impor movimento quando a preferência por movimento reduzido estiver ativa.
