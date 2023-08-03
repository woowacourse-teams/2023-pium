describe('반려 식물 등록하기', () => {
  beforeEach(() => {
    cy.visit('/pet/1/edit');
  });

  it('별명을 고칠 수 있다.', () => {
    cy.get('input')
      .first()
      .type('{selectAll}{backspace}')

      .get('button[type="submit"]')
      .should('be.disabled')

      .get('input')
      .first()
      .type('클린')

      .get('input')
      .first()
      .should('have.value', '클린');
  });

  it('물 주기 주기를 고칠 수 있다.', () => {
    cy.get('input[inputmode="numeric"]')
      .type('{selectAll}{backspace}')

      .get('button[type="submit"]')
      .should('be.disabled')

      .get('input[inputmode="numeric"]')
      .type('50')

      .get('input[inputmode="numeric"]')
      .should('have.value', '50');
  });

  it('수정 후에는 토스트를 띄우고 해당 반려 식물 상세 페이지로 이동한다.', () => {
    cy.get('button[type="submit"]')
      .click()

      .get('#toast-root')
      .contains('반려 식물 정보를 바꿨습니다')

      .location('pathname')
      .should('equal', '/pet/1');
  });
});
