# Mártires

Um mapa da memória dos mártires venerados pela Igreja Católica. Começa em Jerusalém, com Santo Estêvão (c. 36), e amplia o enquadramento à medida que novos lugares entram na história.

**Site:** https://laercioop.github.io/martires/

- Mapa em tela inteira, com zoom e navegação manual.
- Timeline inferior: arrastar, digitar ano, reproduzir, pausar e avançar/voltar entre anos com registros.
- Pontos acumulativos; cor de destaque para as pessoas registradas no ano escolhido.
- Acompanhamento automático da extensão geográfica; mover o mapa manualmente o desativa, e o botão de alvo permite retomá-lo.
- Navegação lateral que abre/fecha; busca, filtros e fichas com fontes.
- Interface em português e layout para desktop e celular.
- Links compartilháveis: `?year=1645`, `?year=1645&q=soveral`, `?year=1645&person=Q9154163`.

## Rodar localmente

Requer Python 3 e, para a verificação de sintaxe JavaScript, Node.js. Não precisa instalar dependências.

```sh
npm run dev
# http://127.0.0.1:4173
npm run check
```

Alternativa sem Node: `python -m http.server 4173 --bind 127.0.0.1`.

## Dados e limitações

A base inicial combina uma **consulta reproduzível ao Wikidata (CC0)** com registros editoriais conferidos em fontes católicas e acadêmicas. A importação automática não é uma lista oficial da Igreja e pode conter falsos positivos, omissões ou classificações desatualizadas. A interface identifica separadamente os registros conferidos e os pendentes.

- `data/martyrs.json`: snapshot público normalizado, com pessoas únicas, datas alternativas, localidades, fontes e estado de revisão.
- `data/reviewed.json`: correções e inclusões editoriais preservadas nas próximas importações.
- `data/wikidata.raw.json`: resposta original para auditoria; não é enviada para o artefato do Pages.
- `scripts/martyrs.sparql`: consulta usada na importação. O critério de martírio considera propriedades estruturadas e a indicação textual de mártir na descrição inglesa.
- `docs/FONTES.md`: comparação de fontes e critérios.

A consulta exige categoria católica de santo/beato ou canonização com religião católica declarada. O recorte automático é limitado pela qualidade do cadastro e pelo idioma da descrição. Excluímos dados com precisão menor que ano. Registros sem coordenadas ficam na lista; nunca usamos nascimento como substituto para o local de morte. Uma pessoa com locais alternativos pode aparecer em vários pontos, mas é contada uma vez.

Anos antigos, inclusive c. 36 para Estêvão, são aproximados. O ponto inicial corresponde à tradição do local ao norte da Porta de Damasco, sem alegar comprovação arqueológica. Datas de morte não são datas de festa. Países correspondem a lugares atuais. Não inferimos fronteiras antigas nem relações causais entre ocorrências.

### Atualizar

```sh
npm run data:update
npm run check
```

A atualização usa `curl` e Python, preserva as inclusões editoriais, recusa um retorno inesperadamente pequeno e substitui o snapshot de forma atômica. **Revisar o diff antes de publicar.** O site não consulta o Wikidata em tempo de execução.

## Publicação

O workflow `.github/workflows/pages.yml` valida o projeto e publica automaticamente cada push em `main`, usando GitHub Actions como fonte do Pages. Os caminhos são relativos, compatíveis com `/martires/`.

## Dependências, rede e créditos

HTML/CSS/JavaScript estáticos. Leaflet 1.9.4 e as fontes estão hospedados no próprio repositório. Os detalhes do mapa vêm de `tile.openstreetmap.org`; sem conexão, os dados, fichas e contornos locais continuam disponíveis, mas os detalhes de ruas não. O site não inclui analytics.

- Leaflet: BSD-2-Clause, licença em `assets/LEAFLET-LICENSE.txt`.
- OpenStreetMap: dados ODbL, [atribuição e política de uso dos tiles](https://operations.osmfoundation.org/policies/tiles/). Não se faz download em massa ou prefetch.
- Natural Earth: contornos `ne_110m_land`, domínio público, [fonte](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson).
- Libre Baskerville e Source Sans 3: SIL OFL 1.1, licenças em `assets/`.
- Código original: MIT. A licença MIT não substitui as licenças dos dados, fontes e bibliotecas acima.

O site foi desenvolvido com orientação da skill Impeccable. Decisões de produto e sistema visual estão em `PRODUCT.md` e `DESIGN.md`.
