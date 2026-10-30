// Conteúdo das fitas (dados fictícios). Para criar uma fita nova, copie um bloco.
// Cena sem "tipo" = texto. Cena "contador" = números que sobem animados.
const FITAS = [
  {
    id: "soft-skills", etiqueta: "SOFT SKILLS",
    cenas: [
      { titulo: "COMUNICAÇÃO", texto: "Texto fictício: explico ideias técnicas de forma clara para pessoas de áreas diferentes." },
      { titulo: "TRABALHO EM EQUIPE", texto: "Texto fictício: já participei de projetos em grupo, dividindo tarefas e revisando o trabalho dos colegas." },
      { titulo: "RESOLUÇÃO DE PROBLEMAS", texto: "Texto fictício: quando algo quebra, quebro o problema em partes menores até achar a causa." },
      { titulo: "ADAPTABILIDADE", texto: "Texto fictício: aprendo ferramentas novas rápido e mudo de abordagem quando preciso." },
      { tipo: "contador", itens: [{ valor: 5, rotulo: "PROJETOS EM GRUPO" }, { valor: 20, rotulo: "APRESENTAÇÕES FEITAS" }] }
    ],
    resumo_final: "Resumo fictício: pessoa comunicativa, colaborativa e curiosa, que aprende rápido e resolve problemas com calma.",
    botao_final: "VOLTAR ÀS FITAS"
  },
  {
    id: "hard-skills", etiqueta: "HARD SKILLS",
    cenas: [
      { titulo: "LINGUAGENS", texto: "Texto fictício: Python, JavaScript, HTML e CSS (nível intermediário)." },
      { titulo: "FRAMEWORKS E BIBLIOTECAS", texto: "Texto fictício: Framework X, Biblioteca Y e Biblioteca Z em projetos de estudo." },
      { titulo: "FERRAMENTAS", texto: "Texto fictício: Git, editor de código, ferramenta de testes de API e modelagem 3D básica." },
      { titulo: "BANCO DE DADOS", texto: "Texto fictício: consultas e modelagem básica de tabelas." },
      { tipo: "contador", itens: [{ valor: 3, rotulo: "ANOS ESTUDANDO" }, { valor: 12, rotulo: "PROJETOS CONCLUÍDOS" }] }
    ],
    resumo_final: "Resumo fictício: base sólida em desenvolvimento web, com foco em construir e testar projetos completos.",
    botao_final: "VOLTAR ÀS FITAS"
  }
];
