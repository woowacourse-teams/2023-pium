describe('내비게이션 바를 이용한 페이지 이동', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('리마인더 페이지로 이동할 수 있다.', () => {
    cy.get('a')
      .contains('리마인더')
      .click()
      .location('pathname')
      .should('equal', '/reminder')
      .get('#root')
      .should('contain', '리마인더');
  });

  it('내 반려 식물 목록 페이지로 이동할 수 있다.', () => {
    cy.get('a')
      .contains('내 식물')
      .click()
      .location('pathname')
      .should('equal', '/pet')
      .get('#root')
      .should('contain', '나의 식물 카드');
  });

  it('메인 화면으로 이동할 수 있다.', () => {
    cy.get('a')
      .contains('리마인더')
      .click()
      .get('a')
      .contains('메인')
      .click()
      .location('pathname')
      .should('equal', '/')
      .get('#root')
      .should('contain', '식물을 쉽게');
  });
});
