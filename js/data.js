// Conteúdo das fitas (dados fictícios). Para criar uma fita nova, copie um bloco.
//
// Campos da fita:
//   etiqueta     nome da fita (aparece embaixo do carrossel e na primeira cena)
//   cor          cor de destaque da capa (selo VHS, "Home Video", brilho da fita central)
//   ano          ano mostrado na capa
//   imagem       (opcional) arte da capa, de preferência 600x1200 (1:2). Se ficar vazio,
//                a capa usa um padrão gerado em código com o nome da fita
//   cenas        lista de cenas; resumo_final e botao_final fecham a fita
//
// Cena de texto:   { titulo, texto, animacao }   (animacao é opcional)
// Cena "contador": { tipo: "contador", itens: [{ valor, rotulo }] }
//
// animacao: "combinado" (digitação + efeito de VHS ao mesmo tempo),
//           "vhs" (aparece inteiro com tremida e cor dividida) ou "digitacao" (só digitando).
//           Se ficar vazio, o site alterna sozinho entre os estilos de cena em cena.
const FITAS = [
  {
    id: "sobre-mim", etiqueta: "SOBRE MIM", cor: "#ff3b30", ano: "2026",
    imagem: "assets/sobre-mim.jpg",
    cenas: [
      { titulo: "QUEM SOU EU", texto: "Texto fictício: apresentação curta com nome, cidade e o que me trouxe para a tecnologia." },
      { titulo: "O QUE ME MOVE", texto: "Texto fictício: gosto de transformar ideias em coisas que funcionam e de aprender fazendo." },
      { titulo: "FORA DO CÓDIGO", texto: "Texto fictício: hobbies, filmes, jogos e outros interesses que também fazem parte de quem eu sou." },
      { tipo: "contador", itens: [{ valor: 3, rotulo: "ANOS NA ÁREA" }, { valor: 10, rotulo: "PROJETOS PESSOAIS" }] }
    ],
    resumo_final: "Resumo fictício: pessoa curiosa, que aprende fazendo e gosta de ver as ideias saírem do papel.",
    botao_final: "VOLTAR ÀS FITAS"
  },
  {
    id: "soft-hard-skills", etiqueta: "SOFT SKILLS E HARD SKILLS", cor: "#d9d9d9", ano: "2026",
    imagem: "assets/soft-hard-skills.jpg",
    cenas: [
      { titulo: "COMUNICAÇÃO", texto: "Texto fictício: explico ideias técnicas de forma clara para pessoas de áreas diferentes." },
      { titulo: "TRABALHO EM EQUIPE", texto: "Texto fictício: já participei de projetos em grupo, dividindo tarefas e revisando o trabalho dos colegas." },
      { titulo: "RESOLUÇÃO DE PROBLEMAS", texto: "Texto fictício: quando algo quebra, quebro o problema em partes menores até achar a causa." },
      { titulo: "ADAPTABILIDADE", texto: "Texto fictício: aprendo ferramentas novas rápido e mudo de abordagem quando preciso." },
      { titulo: "LINGUAGENS", texto: "Texto fictício: Python, JavaScript, HTML e CSS (nível intermediário)." },
      { titulo: "FRAMEWORKS E BIBLIOTECAS", texto: "Texto fictício: Framework X, Biblioteca Y e Biblioteca Z em projetos de estudo." },
      { titulo: "FERRAMENTAS", texto: "Texto fictício: Git, editor de código, ferramenta de testes de API e modelagem 3D básica." },
      { titulo: "BANCO DE DADOS", texto: "Texto fictício: consultas e modelagem básica de tabelas." },
      { tipo: "contador", itens: [{ valor: 5, rotulo: "PROJETOS EM GRUPO" }, { valor: 20, rotulo: "APRESENTAÇÕES FEITAS" }, { valor: 3, rotulo: "ANOS ESTUDANDO" }, { valor: 12, rotulo: "PROJETOS CONCLUÍDOS" }] }
    ],
    resumo_final: "Resumo fictício: pessoa comunicativa e colaborativa, com base sólida em desenvolvimento web e foco em construir e testar projetos completos.",
    botao_final: "VOLTAR ÀS FITAS"
  },
  {
    id: "cursos-formacao", etiqueta: "CURSOS E FORMAÇÃO", cor: "#e3c24f", ano: "2026",
    imagem: "assets/cursos-formacao.jpg",
    cenas: [
      { titulo: "FORMAÇÃO", texto: "Texto fictício: curso, instituição e período de estudo." },
      { titulo: "CURSOS", texto: "Texto fictício: cursos de curta duração em programação, banco de dados e design." },
      { titulo: "CERTIFICADOS", texto: "Texto fictício: certificados e conquistas que comprovam o que foi estudado." },
      { tipo: "contador", itens: [{ valor: 8, rotulo: "CURSOS CONCLUÍDOS" }, { valor: 240, rotulo: "HORAS DE ESTUDO" }] }
    ],
    resumo_final: "Resumo fictício: formação sólida e estudo constante, sempre atrás da próxima habilidade.",
    botao_final: "VOLTAR ÀS FITAS"
  },
  {
    id: "minhas-experiencias", etiqueta: "MINHAS EXPERIÊNCIAS", cor: "#dfe6ee", ano: "2026",
    imagem: "assets/minhas-experiencias.jpg",
    cenas: [
      { titulo: "ESTÁGIO", texto: "Texto fictício: empresa, período e o que eu fazia no dia a dia." },
      { titulo: "PROJETOS FREELA", texto: "Texto fictício: trabalhos para clientes, com o problema resolvido e o resultado entregue." },
      { titulo: "O QUE APRENDI", texto: "Texto fictício: lições que levei de cada experiência para os próximos projetos." },
      { tipo: "contador", itens: [{ valor: 2, rotulo: "ANOS DE EXPERIÊNCIA" }, { valor: 6, rotulo: "CLIENTES ATENDIDOS" }] }
    ],
    resumo_final: "Resumo fictício: experiência prática em projetos reais, aprendendo com cada entrega.",
    botao_final: "VOLTAR ÀS FITAS"
  },
  {
    id: "meus-projetos", etiqueta: "MEUS PROJETOS", cor: "#ffd21f", ano: "2026",
    imagem: "assets/meus-projetos.jpg",
    cenas: [
      { titulo: "PROJETO UM", texto: "Texto fictício: nome do projeto, o problema que resolve e as tecnologias usadas." },
      { titulo: "PROJETO DOIS", texto: "Texto fictício: descrição curta do segundo projeto e o que ele me ensinou." },
      { titulo: "PROJETO TRÊS", texto: "Texto fictício: descrição curta do terceiro projeto e o resultado final." },
      { tipo: "contador", itens: [{ valor: 12, rotulo: "PROJETOS CONCLUÍDOS" }, { valor: 4, rotulo: "EM ANDAMENTO" }] }
    ],
    resumo_final: "Resumo fictício: projetos variados, do esboço ao produto funcionando.",
    botao_final: "VOLTAR ÀS FITAS"
  }
];
