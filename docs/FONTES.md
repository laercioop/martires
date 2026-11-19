# Pesquisa de fontes — 19/11/2026

## Escolha: Wikidata + conferência editorial

O Wikidata é a opção mais prática encontrada para uma base derivada pública: dados estruturados sob CC0, identificadores estáveis, datas de morte com precisão e locais de morte vinculados a coordenadas. Sua cobertura é ampla, mas irregular. A classificação de mártir e o pertencimento católico exigem revisão; o resultado não é um catálogo oficial ou exaustivo.

Consulta reproduzível: `../scripts/martyrs.sparql`. A indicação automática de martírio usa causa da morte, classificação/ocupação e descrição em inglês. O status é limitado a santo católico e beato; para categorias genéricas de canonização, exige religião católica explícita. A ausência de uma pessoa na consulta pode decorrer de qualquer lacuna nesses campos.

Os dados editoriais acrescentam pessoas ausentes no recorte e corrigem campos selecionados. `reviewed: true` significa que nome, martírio, localidade e referência cronológica foram conferidos nas fontes indicadas; não afirma que coordenadas sejam pontos comprovados nem que haja consenso sobre datas antigas. O ano de Estêvão usa referência do Getty; a tradição do lugar e o reconhecimento como primeiro mártir usam a Santa Sé. Fontes de conferência também incluem Notre Dame e Catholic Encyclopedia.

## Alternativas comparadas

| Fonte | Utilidade | Limitação para este projeto |
|---|---|---|
| [CRMEDR](https://github.com/CatholicOS/crmedr) | Registro especializado do Martirológio Romano, pessoas, tipologia de datas, lugares e seus papéis; bom para futura reconciliação de identidades | Licença declarada CC BY-NC-ND 4.0. O atlas cita a entrada do índice por identificador Wikidata. O repositório é trabalho em andamento. |
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

## Referências por pessoa e nomes em português

O índice [`persons_commemorated.json`](https://github.com/CatholicOS/crmedr/blob/b91e409d2db1a6cde7a5c60f070286b8de58031f/data/persons_commemorated.json) liga identificadores Wikidata às pessoas comemoradas. O atlas usa a coincidência exata de identificadores para incluir uma referência na ficha, com link para a linha da revisão consultada. O índice inclui identificações automáticas do próprio CRMEDR. A referência indica a presença da pessoa no Martirológio e o estado de revisão do atlas continua dependendo da conferência editorial do martírio, do ano e do local.

O arquivo `data/identity-references.json` guarda as referências bibliográficas e as grafias em português selecionadas após consultar os rótulos `pt-br` e `pt` do Wikidata e o [índice português do Martirológio Romano](https://liturgia.pt/martirologio/pdf/Martirologio_ind.pdf). A importação reaplica essas referências e grafias. Os nomes conferidos em `data/reviewed.json` têm precedência. Na ausência de um rótulo em português, vale o nome da importação original.

## Ampliação da pesquisa

### Catálogos e arquivos da Santa Sé

| Fonte | O que verificar |
|---|---|
| [Dicastério para as Causas dos Santos — busca de santos e beatos](https://www.causesanti.va/it/search-saint.html) | Fichas individuais e coletivas para confirmar a identidade, o reconhecimento e, quando disponíveis, a data e o local da morte. |
| [Sala de Imprensa — decretos de martírio, exemplo de abril de 2016](https://press.vatican.va/content/salastampa/en/bollettino/pubblico/2016/04/27/160427c.html) | Reconhecimento do martírio em causas recentes. Para incluir a pessoa no recorte do atlas, conferir também a beatificação ou a canonização. |
| [Celebrações de canonização e beatificação](https://www.vatican.va/news_services/liturgy/documents/index_canoniz-beat_en.html) | Homilias, biografias e documentos litúrgicos organizados por cerimônia. |
| [Índice de canonizações de João Paulo II](https://www.vatican.va/news_services/liturgy/saints/ns_lit_doc_list_saints-jp-ii_en.html) | Busca histórica por cerimônia e por grupo. |
| [Acta Apostolicae Sedis](https://www.vatican.va/archive/aas/index_it.htm) | Atos oficiais desde 1909, com volumes digitalizados. |
| [Acta Sanctae Sedis](https://www.vatican.va/archive/ass/index_sp.htm) | Série anterior para localizar atos históricos. |
| [Pontifícia Academia Cultorum Martyrum](https://www.vatican.va/roman_curia/pontifical_academies/cult-martyrum/martiri/001.html) | Percursos e referências sobre mártires venerados em Roma. Conferir se cada lugar corresponde à morte, ao sepultamento ou à memória litúrgica. |

### Listas de grupos e fontes locais

| Recorte | Fonte e uso |
|---|---|
| Brasil, Cunhaú e Uruaçu | [CNBB — canonização dos 30 protomártires](https://www.cnbb.org.br/papa-francisco-canonizou-30-brasileiros-neste-domingo/) e [relato da Arquidiocese de Natal apresentado à CNBB](https://www.cnbb.org.br/arcebispo-de-natal-apresenta-aos-bispos-processo-de-canonizacao-dos-martires-de-cunhau-e-uruacu/). Conferir a grafia dos nomes e a atribuição aos dois locais. |
| México | [Santa Sé — canonização de Cristóbal Magallanes e companheiros](https://www.vatican.va/content/john-paul-ii/es/homilies/2000/documents/hf_jp-ii_hom_20000521_canonizations.html). A cerimônia inclui outras pessoas, então conferir os integrantes da causa de martírio. |
| Canadá | [Martyrs’ Shrine — mártires canadenses](https://martyrs-shrine.com/relic-tour/). Identificar os integrantes e consultar as biografias para separar os locais de morte do santuário atual. |
| Uganda | [Paulo VI — canonização dos mártires de Uganda](https://www.vatican.va/content/paul-vi/es/homilies/1964/documents/hf_p-vi_hom_19641018_martiri-uganda.html). Confirmar o grupo católico canonizado e cruzar as localidades com a arquidiocese. |
| Coreia | [Conferência Episcopal Coreana — 103 santos](https://cbck.or.kr/koreanmartyrs/103-Saints/18) e [124 beatos](https://cbck.or.kr/koreanmartyrs/124-Martyrs). Biografias em coreano para conferir nomes, variantes e mortes. |
| China | [Santa Sé — Agostinho Zhao Rong e 119 companheiros](https://www.vatican.va/news_services/liturgy/saints/ns_lit_doc_20001001_zhao-rong-compagni_en.html). Identificar integrantes e subgrupos da canonização. |
| Vietnã | [Santa Sé — discurso sobre a canonização dos 117](https://www.vatican.va/content/john-paul-ii/es/speeches/1988/june/documents/hf_jp-ii_spe_19880620_martiri-vietnam.html) e [próprio litúrgico dominicano](https://www.op.org/wp-content/uploads/2021/06/AD-01-Additamenta-OP-2006.pdf). Confirmar o grupo e conferir nomes e anos dos integrantes descritos. |
| Japão | [Arquidiocese de Nagasaki — locais e memoriais](https://www.nagasaki.catholic.jp/eng1/pilgrims-tourists) e [Ordem dos Pregadores — mártires do Oriente](https://es.op.org/santos/ss-ignatii-delgado-vincentii-liem-dominici-an-kham-andreae-esti%C3%A9rcol-lac/). Cruzar eventos, integrantes e lugares de execução. |
| Laos | [Dicastério — Mártires do Laos](https://www.causesanti.va/it/santi-e-beati/martiri-del-laos.html). Ficha coletiva para conferir os integrantes e a cronologia. |
| Espanha | [Conferência Episcopal Espanhola — lista nominal dos mártires do século XX](https://www.conferenciaepiscopal.es/wp-content/uploads/2024/03/Martires-del-siglo-XX-en-Espana-NOMBRES-APELLIDOS-SIGLAS-actualizado-febrero-2024.pdf). Reconciliar nomes e siglas com os registros existentes e consultar cada causa para recuperar ano e local de morte. |
| Inglaterra e País de Gales | [João Paulo II — beatificação dos 85 mártires](https://www.vatican.va/content/john-paul-ii/en/homilies/1987/documents/hf_jp-ii_hom_19871122_martiri-inglesi.html). Confirma a cerimônia e situa o grupo na época das perseguições. |
| França | [Igreja Católica na França — 24 mártires do Terror](https://eglise.catholique.fr/guide-eglise-catholique-france/eveques-dioceses-france/liste-des-dioceses/a-decouverte-dioceses-de-france/diocese-du-puy-en-velay/488431-sur-les-traces-des-vingt-quatre-martyrs-de-la-terreur/) e [Santa Sé — decreto sobre as carmelitas de Compiègne](https://press.vatican.va/content/salastampa/es/bollettino/pubblico/2024/12/18/181224d.html). Cruzar história local e status canônico. |
| Polônia | [Dicastério — 108 mártires poloneses da Segunda Guerra Mundial](https://www.causesanti.va/it/santi-e-beati/108-martiri-polacchi-della-ii-guerra-mondiale.html). Conferir integrantes e localidades de morte, inclusive fora da Polônia atual. |
| Albânia | [Dicastério — mártires albaneses](https://www.causesanti.va/it/santi-e-beati/martiri-albanesi.html). Ficha coletiva e referências da causa. |
| Argélia | [Dicastério — 19 mártires da Argélia](https://www.causesanti.va/it/santi-e-beati/19-martiri-d-algeria.html). Conferir as mortes por pessoa ou por grupo de um mesmo evento. |
| Síria | [Ordem dos Frades Menores — mártires de Damasco](https://ofm.org/en/pope-francis-proclaims-new-franciscan-saints.html). Lista dos oito franciscanos e três leigos maronitas canonizados. |
| Marrocos | [Ordem dos Frades Menores — protomártires franciscanos](https://ofm.org/en/protomartyrs-of-the-franciscan-order.html). Identificar os executados e distinguir os lugares do itinerário, da morte e do sepultamento. |

### Acervos históricos, ordens religiosas e índices

| Fonte | O que verificar |
|---|---|
| [Universidade de Oxford — The Cult of Saints in Late Antiquity](https://www.sds.ox.ac.uk/cult-saints-late-antiquity) | Textos, inscrições e testemunhos de culto até c. 700. A data e o lugar de um testemunho de culto correspondem à evidência catalogada. Conferir a narrativa para recuperar os dados do martírio. |
| [Société des Bollandistes — Acta Sanctorum](https://bollandistes.org/our-publications/acta-sanctorum/) | Edições críticas de textos hagiográficos, com organização litúrgica. |
| [Société des Bollandistes — programas de pesquisa](https://bollandistes.org/what-we-do/research-programs/) | Repertórios e catálogos para localizar textos, versões e manuscritos. |
| [CNRS/IRHT — Pinakes](https://pinakes.irht.cnrs.fr/notices/cote/getPdf/2718/) | Catálogo de textos e manuscritos gregos, com identificadores BHG em textos hagiográficos. |
| [Companhia de Jesus — Santos e Beatos](https://www.jesuits.global/about-us/saints-and-blessed/) | Biografias da ordem para localizar nomes, datas de morte e relatos de martírio. |
| [Ordem dos Frades Menores — Santos Franciscanos](https://ofm.org/en/franciscan-saints-10551.html) | Biografias e notícias de causas, incluindo Irlanda e Etiópia. |
| [Find a Saint](https://findasaint.org/it/index.html) | Índice para descoberta de grafias e referências. Confirmar os dados na fonte citada na ficha. |

O catálogo da [Comissão dos Novos Mártires](https://press.vatican.va/content/leo-xiv/en/speeches/2026/september/documents/20260916-cause-santi.html) abrange testemunhas da fé de várias tradições cristãs. Para o atlas, cada pessoa encontrada por esse caminho precisa de verificação independente do reconhecimento como santo ou beato católico.

A pesquisa registra referências para consulta e conferência manual. Para reutilização em lote, conferir os termos de cada acervo e registrar a proveniência por campo. Começar pelas listas nominais de Espanha, Coreia e Brasil permite comparar identidades com a base existente antes de revisar datas e locais individualmente.
