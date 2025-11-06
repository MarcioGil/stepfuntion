# Projeto de Exemplo: Workflow de Processamento de Pedidos de E-commerce com AWS Step Functions

Este projeto demonstra um fluxo de trabalho de processamento de pedidos de e-commerce utilizando o **AWS Step Functions** para orquestrar diferentes serviços AWS (neste caso, AWS Lambda).

## ⚙️ Detalhes Técnicos

### 1. Arquitetura

A arquitetura é baseada em um fluxo de trabalho sequencial e de escolha (Choice State) para garantir que as etapas críticas de um pedido sejam executadas na ordem correta e com tratamento de falhas.

O fluxo é composto pelas seguintes etapas:

| Etapa (State) | Tipo | Função |
| :--- | :--- | :--- |
| **Validar Pedido** | `Task` (AWS Lambda) | Verifica a integridade e a validade do pedido. |
| **Escolher Processamento** | `Choice` | Decide o próximo passo com base no resultado da validação (`status: VALID` ou `status: INVALID`). |
| **Processar Pagamento** | `Task` (AWS Lambda) | Simula a cobrança do cliente. Executado apenas se o pedido for válido. |
| **Enviar para Expedição** | `Task` (AWS Lambda) | Simula a preparação e envio do produto. |
| **Sucesso no Pedido** | `Succeed` | Estado final de sucesso. |
| **Falha no Pedido** | `Fail` | Estado final de falha, acionado por um pedido inválido. |

### 2. Definição do Workflow (ASL - Amazon States Language)

O workflow é definido em JSON usando a Amazon States Language (ASL). O arquivo `infra/workflow.asl.json` contém a definição pura.

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

### 3. Implantação (Infraestrutura como Código - CloudFormation)

A infraestrutura completa (Step Function, Funções Lambda e Perfis IAM) é definida no arquivo `infra/cloudformation.yaml`.

- **Funções Lambda (Stubs):** Três funções Lambda de exemplo (`ValidateOrderLambda`, `ProcessPaymentLambda`, `ShipOrderLambda`) são criadas com código Python simples (inline) para simular as operações.
- **IAM Roles:** Perfis de execução são configurados para permitir que as Lambdas sejam executadas e que o Step Function invoque as Lambdas.
- **State Machine:** A máquina de estados é criada usando a definição ASL, com os ARNs das Lambdas injetados dinamicamente pelo CloudFormation.

## 🔗 Link para a Step Function

**Atenção:** O link abaixo será preenchido após a implantação na AWS.

[Link para a Step Function no Console AWS] (COLE AQUI O LINK DA SUA STEP FUNCTION APÓS A CRIAÇÃO)
