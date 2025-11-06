# 🛒 Workflow de Processamento de Pedidos de E-commerce com AWS Step Functions

## 📑 Sumário
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Detalhes Técnicos](#detalhes-técnicos)
4. [Implantação](#implantacao)
5. [Como Executar](#como-executar)
6. [Apresentação](#apresentacao)
7. [Links](#links)

## Sobre o Projeto
Este projeto demonstra um fluxo de trabalho de processamento de pedidos de e-commerce utilizando AWS Step Functions para orquestrar diferentes serviços AWS — especialmente AWS Lambda — simulando um ambiente real de automação empresarial.

A proposta deste projeto é reproduzir, de forma simples e didática, como um fluxo empresarial pode ser automatizado através de uma máquina de estados. O objetivo é mostrar como a computação em nuvem pode ser usada para estruturar sistemas que exigem organização, tomada de decisão, resiliência e execução confiável.

## 🗂️ Estrutura do Projeto
```text
stepfuntion/
├── infra/
│   ├── cloudformation.yaml   # Infraestrutura como código (AWS CloudFormation)
│   └── workflow.asl.json     # Definição do workflow Step Functions (ASL)
├── README.md                 # Documentação do projeto
```
Fluxo resumido:
Pedido → [Validar Pedido] → [Escolher Processamento]
   ├─(VALID)─> [Processar Pagamento] → [Enviar para Expedição] → [Sucesso]
   └─(INVALID)─> [Falha]

## ⚙️ Detalhes Técnicos
A solução utiliza um fluxo sequencial e condicional, garantindo que cada etapa seja processada com segurança.

Etapa (State) | Tipo | Função
--- | --- | ---
Validar Pedido | Task (AWS Lambda) | Verifica integridade e validade do pedido.
Escolher Processamento | Choice | Decide o caminho com base no status (VALID / INVALID).
Processar Pagamento | Task (AWS Lambda) | Simula a cobrança quando o pedido é válido.
Enviar para Expedição | Task (AWS Lambda) | Simula preparação e envio do produto.
Sucesso no Pedido | Succeed | Estado final positivo.
Falha no Pedido | Fail | Estado final negativo.

Definição do Workflow (ASL – Amazon States Language)
Arquivo: infra/workflow.asl.json

```json
{
  "Comment": "Workflow de Processamento de Pedidos de E-commerce",
  "StartAt": "Validar Pedido",
  "States": {
    "Validar Pedido": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:ValidateOrderLambda",
      "Next": "Escolher Processamento"
    },
    "Escolher Processamento": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.status",
          "StringEquals": "VALID",
          "Next": "Processar Pagamento"
        },
        {
          "Variable": "$.status",
          "StringEquals": "INVALID",
          "Next": "Falha no Pedido"
        }
      ],
      "Default": "Falha no Pedido"
    },
    "Processar Pagamento": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:ProcessPaymentLambda",
      "Next": "Enviar para Expedição"
    },
    "Enviar para Expedição": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:ShipOrderLambda",
      "Next": "Sucesso no Pedido"
    },
    "Sucesso no Pedido": {
      "Type": "Succeed"
    },
    "Falha no Pedido": {
      "Type": "Fail",
      "Cause": "O pedido não pôde ser processado.",
      "Error": "OrderProcessingFailed"
    }
  }
}
```

Arquivo principal: infra/cloudformation.yaml
Ao implantar a stack, são criados automaticamente:
- 3 Lambdas simples (inline em Python)
- Roles IAM para execução
- Step Function integrada aos ARNs das Lambdas
- Máquina de estados pronta para uso

**Pré-requisitos:**
- Conta AWS com permissões para CloudFormation, Lambda e Step Functions
- AWS CLI configurado

**Implantação:**
```bash
aws cloudformation deploy \
  --template-file infra/cloudformation.yaml \
  --stack-name StepFunctionEcommerce \
  --capabilities CAPABILITY_IAM
```

## ▶️ Como Executar
1. Implemente a stack conforme acima.
2. Acesse o AWS Step Functions e inicie uma execução na máquina de estados criada.
3. Forneça um payload de pedido para testar o fluxo.
4. Monitore o resultado e os logs das Lambdas.

Exemplo de payload:
```json
{
  "orderId": "12345",
  "amount": 199.90,
  "items": ["produtoA", "produtoB"]
}
```

## 👤 Apresentação
Sou um apaixonado por educação, tecnologia e inovação social. Acredito profundamente que o conhecimento transforma vidas, abre portas e reduz desigualdades — especialmente para quem nem sempre teve acesso às mesmas oportunidades.
Como estudante de Engenharia de Software, busco sempre unir teoria e prática, desenvolvendo projetos que não servem apenas como código, mas como aprendizado, evolução e compreensão real do impacto que a tecnologia pode gerar.
Este projeto com AWS Step Functions nasceu exatamente desse espírito: aprender construindo. Ao simular um sistema completo de processamento de pedidos de e-commerce, pude entender, de maneira objetiva e humana, como fluxos automatizados podem tornar operações mais organizadas, seguras e eficientes.
Na DIO encontrei um ambiente que incentiva o aprendizado contínuo, a troca de conhecimento e o crescimento coletivo. Sigo caminhando com humildade, propósito e vontade de contribuir com uma comunidade tech mais inclusiva, colaborativa e humana.

## 🌐 Links
- [LinkedIn](https://linkedin.com/in/márcio-gil-1b7669309)
- [Portfólio Pessoal](https://marciogil.github.io/curriculum-vitae/)
- [GitHub Pessoal](https://github.com/MarcioGil/MarcioGil.git)
- [Repositório do Projeto](https://github.com/MarcioGil/Sistema_Integrador_Empresarial)