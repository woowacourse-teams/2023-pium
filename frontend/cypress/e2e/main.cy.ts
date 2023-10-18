describe('메인 화면', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('로고와 소개 문구가 보인다.', () => {
    cy.contains('식물을 쉽게').should('be.visible');
    cy.get(`img[alt="피움 로고. 녹색으로 '피움'이라는 글자가 적혀 있다."]`).should('be.visible');
    cy.contains('피움에 등록된 식물을 검색해 보세요').should('be.visible');
  });
});

describe('검색창', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8282');
  });

  it('검색창을 이용해 비슷한 이름의 식물을 확인한다.', () => {
    cy.get('input')
      .type('아')
      .wait(500)

      .get('ul > li')
      .contains('아')
      .should('be.visible')
      .get('ul > li')
      .contains('아카')
      .should('be.visible')
      .get('ul > li')
      .contains('아카시')
      .should('be.visible')
      .get('ul > li')
      .contains('아카시아')
      .should('be.visible')

      .get('input')
      .type('카')
      .wait(500)

      .get('ul > li')
      .contains('아카')
      .should('be.visible')
      .get('ul > li')
      .contains('아카시')
      .should('be.visible')
      .get('ul > li')
      .contains('아카시아')
      .should('be.visible')

      .get('input')
      .type('시')
      .wait(500)

      .get('ul > li')
      .contains('아카시')
      .should('be.visible')
      .get('ul > li')
      .contains('아카시아')
      .should('be.visible')

      .get('input')
      .type('아')
      .wait(500)

      .get('ul > li')
      .contains('아카시아')
      .should('be.visible')

      .get('input')
      .type('짱')
      .wait(500)

      .get('p')
      .contains('아직 사전에 등록된 식물이 없어요')
      .should('be.visible');
  });

  it('식물 이름을 클릭해 식물 사전 페이지로 이동한다.', () => {
    cy.get('input')
      .type('참')
      .wait(500)
      .get('ul > li')
      .contains('참새')
      .should('be.visible')
      .click({ force: true })

      .location()
      .should((location) => {
        const dictPageRegex = /^\/dict\/\d+$/;
        expect(dictPageRegex.test(location.pathname)).to.be.true;
      });
  });

  it('정확히 일치하는 이름이 있을 경우 식물 사전 페이지로 이동한다.', () => {
    cy.get('input')
      .type('아카시')
      .wait(500)

      .get('ul > li')
      .contains('아카시')
      .should('be.visible')

      .get('button[aria-label="이동하기"]')
      .click({ force: true })

      .location()
      .should((location) => {
        const dictPageRegex = /^\/dict\/\d+$/;
        expect(dictPageRegex.test(location.pathname)).to.be.true;
      });
  });

  it('정확히 일치하는 이름이 없을 경우 식물 사전 검색 페이지로 이동한다.', () => {
    cy.get('input')
      .type('참')
      .wait(500)

      .get('ul > li')
      .should('be.visible')

      .get('input')
      .focus()

      .type('{enter}')

      .location('pathname')
      .should('equal', '/dict')

      .location('search')
      .should('equal', encodeURI('?search=참'));
  });
});
