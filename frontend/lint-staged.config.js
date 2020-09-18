module.exports = {
  '**/*.+(js|jsx|ts|tsx)': ['eslint', 'jest --findRelatedTests', 'git add'],
  // '**/*.+(json|yml|yaml|graphql|mdx)': ['prettier --write', 'git add'],
};
