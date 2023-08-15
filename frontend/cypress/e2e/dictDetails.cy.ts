describe('사전 식물 상세 정보 화면', () => {
  beforeEach(() => {
    cy.visit('/dict/2');
  });

  it('화면에 식물 이름이 나타난다.', () => {
    cy.contains('스킨답서스').should('be.visible');
  });
});
