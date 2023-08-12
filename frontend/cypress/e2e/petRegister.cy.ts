import { convertDateKorYear, getDateToString } from 'utils/date';

describe('반려 식물 등록하기', () => {
  const todayKorString = convertDateKorYear(getDateToString());
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

      .get('button[aria-label="입양일 선택"]')
      .click()

      .get(`span[aria-label="${todayKorString}"]`)
      .click()

      .get('button[aria-label="마지막으로 물 준 날짜 선택"]')
      .click()

      .get(`span[aria-label="${todayKorString}"]`)
      .click()

      .get('input')
      .last()
      .type('7')
      .get('button[aria-label="입력 완료"]')
      .last()
      .click()

      .get('button[type="button"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('button[type="button"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .last()
      .click()

      .get('button[type="button"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('button[type="button"]')
      .last()
      .click()
      .get('li[role="menuitem"]')
      .last()
      .click()

      .get('button')
      .contains('등록하기')
      .click()

      .get('#toast-root')
      .contains('반려 식물 등록에 성공했어요')

      .location('pathname')
      .should('equal', '/pet');
  });
});
