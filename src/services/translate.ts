const ptBR = {
  welcomeHomePage: "Receba respostas anônimas agora mesmo!",
  signInWithGoogle: "Entrar com o Google",
  questionText: "Fale algo para mim, que sempre quis dizer...",
  questionButton: "Enviar pergunta",
  warning: "Lembre-se: A sua resposta é anônima!",
  emptyQuestionError: "Você precisa escrever uma pergunta!",
  questionSent: "Sua pergunta foi enviada!",
  questionPageTitle: "Responda a uma pergunta",
  questionDontFoundText:
    "Essa pergunta não existe! Ou foi excluída. Que tal, criar a sua?",
};

const enUS = {
  welcomeHomePage: "Receive anonymous answers now!",
  signInWithGoogle: "Sign in with Google",
  questionText: "Say something to me, that I always wanted to say...",
  questionButton: "Send question",
  warning: "Remember: Your answer is anonymous!",
  emptyQuestionError: "You need to write a question!",
  questionSent: "Your question was sent!",
  questionPageTitle: "Answer a question",
  questionDontFoundText:
    "This question does not exist! Or it was deleted. How about, create your own?",
};

export const getTranslation = (lang: string) => {
  const language = lang === "pt-BR" ? "ptBR" : "enUS";

  const translation = {
    ptBR,
    enUS,
  };

  return translation[language];
};
