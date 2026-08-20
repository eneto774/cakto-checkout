## Teste Front-End Cakto - Edgar Ribeiro Neto

**Decisões Técnicas:**

1 - Decidir usar Next.js por causa do SSR com essa tecnologia paginas que utilizam o React podem ser melhores ranqueadas por causa da geração estatica de paginas e componentes.
2 - Dupla react-hook-form + zod para validação e controle dos formulários possibilitando o controle com o minimo de re-renders.
3 - Separação das funções auxiliares na pasta utils para facilitar a futura implementação de testes e ajustes nas funções.
4 - shadcn para facilitar a implementação da UI com consistencia e simplicidade na implementação.

**Observação:**

Após uma revisão antes de mergear essa PR [#1](https://github.com/eneto774/cakto-checkout/pull/1) percebi que havia cometido uma falha no desenvolvimento não percebendo que havia um design esperado no final da página, sendo assim irei criar uma nova pagina atendendo a UI proposta no teste e irei transferir essa versão "costumizada" para uma pagina a parte onde irei sinalizar ao fim da refatoração em qual path ela estará disponível.

**Transparência de Uso de IA (Obrigatório):**

1 - Utilizei IA para obter os classnames do input, mandei uma imagem do input da tela sugerida e pedi pra me passar quais classnames eu deveria utilizar para transformar um input do shadcn onde eu tinha escolhido um estilo com um round maior para um input mais parecidof com o input do Material UI e ele me passou as classes apliquei, ajustei alguns pontos e ficou bem próximo.
2 - Usado para sugerir os cn() condicionais no radio button controlado (substituindo has-checked: do Tailwind por lógica de estado explícita)

**Regras de Negócio (Obrigatório)**

Explique em poucas linhas como você garantiu que:  
o comprador paga sempre o preço fixo do produto  
a taxa é descontada do produtor (repasse)

**Como Executar**

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

**PRs:**

- [PR #1 - feat/checkout-page into main](https://github.com/eneto774/cakto-checkout/pull/1)
- [PR #2 - refactor/checkout-page into main](https://github.com/eneto774/cakto-checkout/pull/2)
