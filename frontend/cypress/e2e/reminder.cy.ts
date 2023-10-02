import { convertDateKorYear } from 'utils/date';
import login from '../utils/login';

describe('리마인더 테스트', () => {
  beforeEach(() => {
    login();
    cy.visit('/reminder');
  });

  it('리마인더 페이지로 이동할 수 있다.', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('a').contains('리마인더').click().location('pathname').should('equal', '/reminder');
  });

  it('내 반려 식물 상세보기로 이동할 수 있다.', () => {
    cy.get('a[aria-label="참새 나무 상세로 이동"]')
      .click()
      .location('pathname')
      .should('equal', '/pet/1');
  });

  it('물 주기 등록을 할 수 있다.', () => {
    const today = convertDateKorYear(new Date());
    cy.get('div[aria-label="참새 나무의 정보"]')
      .find('button[aria-label="물 준 날짜 선택"]')
      .click()
      .get('div[aria-label="달력"')
      .should('be.visible')
      .get(`span[aria-label="${today}"]`)
      .click()

      .get('#toast-root')
      .contains('물주기 완료');
  });

  it('물 주기 날짜를 다음달 1일로 변경할 수 있다.', () => {
    const curMonth = new Date().getMonth();
    const nextMonth = curMonth === 11 ? 1 : curMonth + 2;
    cy.get('div[aria-label="참새 나무의 정보"]')
      .find('button[aria-label="알림을 줄 날짜 선택"]')
      .click()
      .get('div[aria-label="달력"')
      .should('be.visible')
      .get(`button[aria-label="다음 달 보기"]`)
      .click()

      .get('section[aria-live="assertive"]')
      .find('span')
      .contains(1)
      .click()

      .get('#toast-root')
      .contains('01일로 물주기 날짜 변경')

      .get(`section[aria-label="${Number(nextMonth)}월의 리마인더 정보"]`)
      .find('div[aria-label="참새 나무의 정보"]')
      .siblings('div[aria-label="01일"]')
      .should('be.visible');
  });
});
