module {
  public type QuizQuestion = {
    id : Text;
    questionType : Text;
    question : Text;
    options : [Text];
    correctAnswer : Text;
    explanation : Text;
    difficulty : Text;
    topic : Text;
  };
};
