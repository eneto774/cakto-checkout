## Teste Front-End Cakto - Edgar Ribeiro Neto

**Decisões Técnicas:**

1 - Decidir usar Next.js por causa do SSR com essa tecnologia paginas que utilizam o React podem ser melhores ranqueadas por causa da geração estatica de paginas e componentes.

2 - Dupla react-hook-form + zod para validação e controle dos formulários possibilitando o controle com o minimo de re-renders.

3 - Separação das funções auxiliares na pasta utils para facilitar a futura implementação de testes e ajustes nas funções.

4 - shadcn para facilitar a implementação da UI com consistencia e simplicidade na implementação.

5 - utilizaçao de libs como "cpf-cnpj-validator" para facilitar a validação de documentos brasileiros sem nescessitar a implementação manual dessa funções de validação de CPF ou CNPJ.

**Observação:**

Após uma revisão antes de mergear essa PR [#1](https://github.com/eneto774/cakto-checkout/pull/1) percebi que havia cometido uma falha no desenvolvimento não percebendo que havia um design esperado no final da página, sendo assim irei criar uma nova pagina atendendo a UI proposta no teste e irei transferir essa versão "costumizada" para uma pagina a parte onde irei sinalizar ao fim da refatoração em qual path ela estará disponível.

**Transparência de Uso de IA (Obrigatório):**

1 - Utilizei IA para obter os classnames do input, mandei uma imagem do input da tela sugerida e pedi pra me passar quais classnames eu deveria utilizar para transformar um input do shadcn onde eu tinha escolhido um estilo com um round maior para um input mais parecidof com o input do Material UI e ele me passou as classes apliquei, ajustei alguns pontos e ficou bem próximo.

2 - Usado para sugerir os cn() condicionais no radio button controlado (substituindo has-checked: do Tailwind por lógica de estado explícita)

**Regras de Negócio:**

Eu envio o currentPrice que é o preço promocional sem alteração conservando o valor sem aplicar taxas nem da cakto nem do parcelamento do cartão de crédito.
Quando o comprador escolhe cartão de crédito e parcela, eu faço o calculo usando como base o currentPrice e o total de taxas o buyerTaxTotal é somado com o currentPrice onde em preencho na propriedade buyerTotal que é o valor a ser pago no final pelo comprador, caso ele escolha PIX nenhuma taxa é aplicada e o comprador paga o mesmo valor então o currentPrice nesse caso do PIX é igual ao buyerTotal.
Já a Taxa descontada pela cakto ela é usada tambem como bae o currentPrice, ou seja essa propriedade não é alterada e após o calculo da taxa o producerNet é preenchido que é o valor liquido que o produtor recebe após desconto das taxas da cakto.

**Como Executar:**

1 - Abra o terminal na pasta do projeto

2 - Instale as dependências

```bash
npm install
```

3 - Rode o projeto

```bash
npm run dev
```

**Para executar os Testes:**

1 - Instale as dependências

```bash
npm install
```

2 - Execute os Testes

```bash
npm test
```

**Resposta Bônus**

Para Melhorar a conversão eu daria mais destaque ao desconto exibindo a porcentagem de desconto que está sendo concedida, um design mais conciso com o design da landing page do criador, traria tambem avaliações e feedbacks de pessoas que já compraram, passando mais credibilidade e confiança a respeito do conteudo oferecido pelo influenciador.

**Urls para Teste:**

Checkout para entrega: path: /

Checkout desenvolvido na primeira branch: /checkout/new

**PRs:**

- [PR #1 - feat/checkout-page into main](https://github.com/eneto774/cakto-checkout/pull/1)
- [PR #2 - refactor/checkout-page into main](https://github.com/eneto774/cakto-checkout/pull/2)
- [PR #3 - docs/end-review into main](https://github.com/eneto774/cakto-checkout/pull/3)
