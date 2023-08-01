describe('사전 식물 검색 결과', () => {
  it('이름이 똑같은 식물과 비슷한 식물들을 보여준다.', () => {
    cy.visit(encodeURI('/dict?search=아카'));

    cy.get('p')
      .contains('완전 똑같은 식물')
      .next()
      .find('li')
      .contains('아카')
      .should('be.visible');

    cy.get('p')
      .contains('비슷한 이름을 가진 식물')
      .next()
      .find('li')
      .contains('아카시')
      .should('be.visible');
  });
});
