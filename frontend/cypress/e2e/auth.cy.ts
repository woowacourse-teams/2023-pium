import login from '../utils/login';

describe('비로그인 상태에서는 로그인 페이지로 이동한다.', () => {
  // it('리마인더', () => {
  //   cy.visit('/reminder');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('내 반려 식물 목록', () => {
  //   cy.visit('/pet');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('반려 식물 상세 정보', () => {
  //   cy.visit('/pet/123');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('반려 식물 등록: 검색', () => {
  //   cy.visit('/pet/register');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('반려 식물 등록: 양식', () => {
  //   cy.visit('/pet/register/1');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('마이페이지', () => {
  //   cy.visit('/myPage');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('반려 식물 정보 수정', () => {
  //   cy.visit('/pet/1/edit');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
  // it('타임라인', () => {
  //   cy.visit('/pet/1/timeline');
  //   cy.get('#toast-root').contains('로그인 후 이용 가능').url().should('match', /login/);
  // });
});

describe('로그인 상태에서는 접근이 가능하다.', () => {
  beforeEach(() => {
    login();
  });

  it('리마인더', () => {
    cy.visit('/reminder');
    cy.location('pathname').should('equal', '/reminder');
  });

  it('내 반려 식물 목록', () => {
    cy.visit('/pet');
    cy.location('pathname').should('equal', '/pet');
  });

  it('반려 식물 상세 정보', () => {
    cy.visit('/pet/123');
    cy.location('pathname').should('equal', '/pet/123');
  });

  it('반려 식물 등록: 검색', () => {
    cy.visit('/pet/register');
    cy.location('pathname').should('equal', '/pet/register');
  });

  it('반려 식물 등록: 양식', () => {
    cy.visit('/pet/register/1');
    cy.location('pathname').should('equal', '/pet/register/1');
  });

  it('마이페이지', () => {
    cy.visit('/myPage');
    cy.location('pathname').should('equal', '/myPage');
  });

  it('반려 식물 정보 수정', () => {
    cy.visit('/pet/1/edit');
    cy.location('pathname').should('equal', '/pet/1/edit');
  });

  it('타임라인', () => {
    cy.visit('/pet/1/timeline');
    cy.location('pathname').should('equal', '/pet/1/timeline');
  });
});
