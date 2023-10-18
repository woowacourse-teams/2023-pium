import login from '../utils/login';

describe('반려 식물 등록하기', () => {
  beforeEach(() => {
    login();
    cy.visit('/pet/1/edit');
  });

  it('별명을 고칠 수 있다.', () => {
    cy.get('input')
      .first()
      .type('{selectAll}{backspace}', { force: true })

      .get('button[type="submit"]')
      .should('be.disabled')

      .get('input')
      .first()
      .type('클린', { force: true })

      .get('input')
      .first()
      .should('have.value', '클린');
  });

  it('물 주기 주기를 고칠 수 있다.', () => {
    cy.get('input[inputmode="numeric"]')
      .type('{selectAll}{backspace}', { force: true })

      .get('button[type="submit"]')
      .should('be.disabled')

      .get('input[inputmode="numeric"]')
      .type('50', { force: true })

      .get('input[inputmode="numeric"]')
      .should('have.value', '50');
  });

  it('식물 이미지를 수정할 수 있다.', () => {
    cy.get('div[aria-label="이미지 등록 컨테이너"]')
      .find('input[type=file]')
      .should('not.be.visible')
      .selectFile('cypress/fixtures/example.json', { force: true })
      .wait(100)

      .get('#toast-root')
      .contains('지원하지 않는 확장자 입니다!')

      .get('div[aria-label="이미지 등록 컨테이너"]')
      .find('input')
      .then(($input) => {
        const file = $input[0].files;
        expect(file?.length).to.equal(0);
      })

      .get('input[type=file]')
      .should('not.be.visible')
      .selectFile('cypress/fixtures/success_image.png', { force: true })

      .get('div[aria-label="이미지 등록 컨테이너"]')
      .find('input')
      .then(($input) => {
        const file = $input[0].files;

        if (file) {
          expect(file.length).to.equal(1);
          expect(file[0].name).to.contain('success_image');
        }
      });
  });

  it('수정 후에는 토스트를 띄우고 해당 반려 식물 상세 페이지로 이동한다.', () => {
    cy.get('input[inputmode="numeric"]')
      .type('{selectAll}{backspace}77', { force: true })

      .get('button[type="submit"]')
      .should('not.be.disabled')
      .click({ force: true })

      .get('#toast-root')
      .contains('반려 식물 정보를 바꿨습니다')

      .location('pathname')
      .should('equal', '/pet/1');
  });
});
