export const saveEvaluation = (productId, evaluation) => {
  const EVALUATION_KEY = `evaluation-${productId}`;
  const evaluations = JSON.parse(localStorage.getItem(EVALUATION_KEY));
  const newEval = evaluations ? [...evaluations, evaluation] : [evaluation];
  localStorage.setItem(EVALUATION_KEY, JSON.stringify(newEval));
};

export const getEvaluations = (productId) => {
  const EVALUATION_KEY = `evaluation-${productId}`;
  return JSON.parse(localStorage.getItem(EVALUATION_KEY));
};

export const removeEvaluation = (productId, evaluation) => {
  const EVALUATION_KEY = `evaluation-${productId}`;
  const evaluations = localStorage.getItem(EVALUATION_KEY);
  const newEvaluations = evaluations.filter((evalu) => evalu.id !== evaluation.id);
  localStorage.setItem(EVALUATION_KEY, JSON.stringify(newEvaluations));
};
