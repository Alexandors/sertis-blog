const articleService = require('./article-service');
const articleModel = require('../data-access-layer/modals/article-modal');
const userService = require('./user-service');
const sinon = require("sinon");

describe('Article Service Test', () => {
  test('create an article', async () => {
    // given
    const newArticle = {
      name: "new article",
      content: "new content",
      authorId: "new author id",
      status: "Published",
      category: "new category"
    };

    const getUserStub = sinon.stub(userService, "getUser")
    getUserStub.withArgs(newArticle.authorId).returns({_id: newArticle.authorId})

   // const articleModelSaveStub = sinon.stub(articleModel, "save");

    // when
    articleService.createArticle(newArticle);

    // then
    //sinon.assert.calledOnce(articleModelSaveStub);

  })
});
