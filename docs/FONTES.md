# Pesquisa de fontes — 19/11/2026

## Escolha: Wikidata + conferência editorial

O Wikidata é a opção mais prática encontrada para uma base derivada pública: dados estruturados sob CC0, identificadores estáveis, datas de morte com precisão e locais de morte vinculados a coordenadas. Sua cobertura é ampla, mas irregular. A classificação de mártir e o pertencimento católico exigem revisão; o resultado não é um catálogo oficial ou exaustivo.

Consulta reproduzível: `../scripts/martyrs.sparql`. A indicação automática de martírio usa causa da morte, classificação/ocupação e descrição em inglês. O status é limitado a santo católico e beato; para categorias genéricas de canonização, exige religião católica explícita. A ausência de uma pessoa na consulta pode decorrer de qualquer lacuna nesses campos.

Os dados editoriais acrescentam pessoas ausentes no recorte e corrigem campos selecionados. `reviewed: true` significa que nome, martírio, localidade e referência cronológica foram conferidos nas fontes indicadas; não afirma que coordenadas sejam pontos comprovados nem que haja consenso sobre datas antigas. O ano de Estêvão usa referência do Getty; a tradição do lugar e o reconhecimento como primeiro mártir usam a Santa Sé. Fontes de conferência também incluem Notre Dame e Catholic Encyclopedia.

## Alternativas comparadas

| Fonte | Utilidade | Limitação para este projeto |
|---|---|---|
| [CRMEDR](https://github.com/CatholicOS/crmedr) | Registro especializado do Martirológio Romano, pessoas, tipologia de datas, lugares e seus papéis; bom para futura reconciliação de identidades | Licença declarada CC BY-NC-ND 4.0; não foi incorporado como base adaptada. O repositório é trabalho em andamento. |
| [Roman Martyrology — documentação](https://romanmartyrology.com/en/docs/data) | Explica o registro e a distinção entre morte, sepultamento, translação e outras referências | Textos modernos do Martirológio têm direitos próprios. A data litúrgica não deve ser tratada automaticamente como data histórica da morte. |
| [GCatholic — Martirológio](https://gcatholic.org/saints/data/martyrology2004-10a) | Referência para pesquisa manual no Martirológio | Conteúdo público não implica licença aberta de reutilização. Não copiamos o texto integral. |
| [CodeSights — Catholic Saints](https://codesights.com/data/catholic-saints/) | CSV com campo de mártir e datas, derivado de lista da Wikipedia | Download exige conta; esquema apresentado não inclui coordenadas nem local de morte estruturado. Não usado. |
| [Catholic Online — Martyr Saints](https://www.catholic.org/saints/martyr.php) | Descoberta de nomes e biografias | Índice editorial sem exportação geográfica ou licença aberta confirmada. Não usado como base. |
| [Santa Sé](https://www.vatican.va/) e [Vatican News](https://www.vaticannews.va/) | Conferência de casos, reconhecimento, cronologia e localidade | Biografias distribuídas, sem uma exportação universal uniforme. Usamos fatos e links, não cópias extensas de textos. |

## Regras de representação

1. Uma pessoa é contada uma vez por identificador. Grupos não são multiplicados em pessoas fictícias.
2. Datas alternativas são preservadas; a timeline começa a mostrar o registro no primeiro ano informado. Uma indicação de ano não equivale à certeza histórica.
3. Datas com precisão inferior a ano não entram no snapshot normalizado. Não há substituição por aniversário litúrgico.
4. Morte sem local ou coordenada continua na lista; não inferimos local de nascimento como local de morte.
5. Localidades e países atuais orientam a navegação; não são um mapa das fronteiras históricas. Jerusalém é identificada pelo nome da cidade.
6. A trajetória da câmera expressa a extensão dos registros disponíveis, não rotas de viagem ou fluxos de perseguição.
7. O status de revisão está sempre visível na ficha. Atualizações automáticas não promovem registros a conferidos.

Licenciamento do Wikidata: https://www.wikidata.org/wiki/Wikidata:Licensing
