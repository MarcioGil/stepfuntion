🛒 Workflow de Processamento de Pedidos de E-commerce com AWS Step Functions

Este projeto demonstra um fluxo de trabalho de processamento de pedidos de e-commerce utilizando AWS Step Functions para orquestrar diferentes serviços AWS — especialmente AWS Lambda — simulando um ambiente real de automação empresarial.

✨ Sobre o Projeto

A proposta deste projeto é reproduzir, de forma simples e didática, como um fluxo empresarial pode ser automatizado através de uma máquina de estados.
O objetivo é mostrar como a computação em nuvem pode ser usada para estruturar sistemas que exigem organização, tomada de decisão, resiliência e execução confiável.

Trabalhar com o Step Functions me permitiu compreender melhor:

Como orquestrar múltiplos serviços de maneira clara;

Como estruturar fluxos condicionais usando Choice States;

Como lidar com falhas e sucessos em processos críticos;

Como a AWS facilita a criação de pipelines reais de produção.

Foi um exercício importante para transformar teoria em prática e entender como arquiteturas baseadas em eventos podem melhorar operações reais — especialmente no e-commerce, onde cada etapa conta.

⚙️ Detalhes Técnicos
1. Arquitetura

A solução utiliza um fluxo sequencial e condicional, garantindo que cada etapa seja processada com segurança.

Etapa (State)	Tipo	Função
Validar Pedido	Task (AWS Lambda)	Verifica integridade e validade do pedido.
Escolher Processamento	Choice	Decide o caminho com base no status (VALID / INVALID).
Processar Pagamento	Task (AWS Lambda)	Simula a cobrança quando o pedido é válido.
Enviar para Expedição	Task (AWS Lambda)	Simula preparação e envio do produto.
Sucesso no Pedido	Succeed	Estado final positivo.
Falha no Pedido	Fail	Estado final negativo.
2. Definição do Workflow (ASL – Amazon States Language)

Arquivo: infra/workflow.asl.json

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

3. Implantação com CloudFormation

Arquivo: infra/cloudformation.yaml

A pilha cria automaticamente:

✅ 3 Lambdas simples (inline em Python)

✅ Roles IAM para execução

✅ Step Function integrada aos ARNs das Lambdas

✅ Máquina de estados pronta para uso

👤 Minha Apresentação

Sou um apaixonado por educação, tecnologia e inovação social. Acredito profundamente que o conhecimento transforma vidas, abre portas e reduz desigualdades — especialmente para quem nem sempre teve acesso às mesmas oportunidades.

Como estudante de Engenharia de Software, busco sempre unir teoria e prática, desenvolvendo projetos que não servem apenas como código, mas como aprendizado, evolução e compreensão real do impacto que a tecnologia pode gerar.

Este projeto com AWS Step Functions nasceu exatamente desse espírito: aprender construindo. Ao simular um sistema completo de processamento de pedidos de e-commerce, pude entender, de maneira objetiva e humana, como fluxos automatizados podem tornar operações mais organizadas, seguras e eficientes.

Na DIO encontrei um ambiente que incentiva o aprendizado contínuo, a troca de conhecimento e o crescimento coletivo. Sigo caminhando com humildade, propósito e vontade de contribuir com uma comunidade tech mais inclusiva, colaborativa e humana.

🌐 Meus Links

LinkedIn: https://linkedin.com/in/márcio-gil-1b7669309

Portfólio Pessoal: https://marciogil.github.io/curriculum-vitae/

GitHub Pessoal: https://github.com/MarcioGil/MarcioGil.git

📂 Repositório do Projeto:
https://github.com/MarcioGil/Sistema_Integrador_Empresarial