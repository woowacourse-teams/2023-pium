import { convertDateKorYear, getDateToString } from 'utils/date';
import login from '../utils/login';

describe('반려 식물 등록하기', () => {
  const todayKorString = convertDateKorYear(getDateToString());

  beforeEach(() => {
    login();
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

      .get('input[type=file]')
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
      })

      .get('p')
      .contains('투명 피우미')
      .should('be.visible')
      .get('input[aria-label="별명 입력"]')
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

      .get('input[type="text"]')
      .first()
      .type('7')
      .get('button[aria-label="입력 완료"]')
      .first()
      .click()

      .get('button[type="button"]')
      .first()
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('button[type="button"]')
      .first()
      .click()
      .get('li[role="menuitem"]')
      .last()
      .click()

      .get('button[type="button"]')
      .first()
      .click()
      .get('li[role="menuitem"]')
      .first()
      .click()

      .get('button[type="button"]')
      .first()
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
