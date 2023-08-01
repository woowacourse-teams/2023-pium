describe('반려 식물 등록하기', () => {
  beforeEach(() => {
    cy.visit('/pet/register');
  });

  it('첫 질문이 보인다.', () => {
    cy.contains('어떤 식물을 키우시나요');
  });

  it('반려 식물을 등록한다.', () => {
    cy.get('input')
      .type('참')
      .wait(500)
      .get('ul > li')
      .contains('참새')
      .click()

      .get('p')
      .contains('스킨답서스')
      .should('be.visible')
      .get('input')
      .type('{selectAll}{backspace}피우미')
      .get('button[aria-label="입력 완료"]')
      .click()

      .get('input[type="date"]')
      .type('2023-07-28')

      .get('input[type="date"]')
      .last()
      .type('2023-07-30')

      .get('input')
      .last()
      .type('7')
      .get('button[aria-label="입력 완료"]')
      .last()
      .click()

      .get('div[role="menu"]')
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('div[role="menu"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .last()
      .click()

      .get('div[role="menu"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('div[role="menu"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .last()
      .click()

      .get('button')
      .contains('등록하기')
      .click()

      .location('pathname')
      .should('equal', '/');
  });
});
