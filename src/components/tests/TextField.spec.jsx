import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // AAA 패턴
  // 1. Arrange :  테스트를 위한 환경 만들기 => 컴퍼넌트를 렌더링하는 코드들이 포함
  // -> className을 지닌 컴포넌트 렌더링

  // 2. Act: 테스트할 동작 발생 => 테스트를 재현하는 동작(클릭, 키입력 등)
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당

  // 3. Assert: 올바른 동작이 실행 되었는지 또는 변경사항 검증하기 => 기대결과대로 변경사랑을 검증하는 코드
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // -----------------------------------------------------------------------------------------------

  // render API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현한 것
  await render(<TextField className="my-class" />); // 1. Arrange

  // className이란 내부 props이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인(O) -> 최종적으로 사용자가 보는 결과는 DOM이기 때문에 이를 검증
  // vitest의 ``expect`` 함수를 사용하여 기대 결과를 검증

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  expect(textInput).toHaveClass('my-class'); // 3. Assert
});

describe('placeholder', () => {
  // it함수 내에서는 내가 바라는 기대 결과를 정의한다.
  // 즉, 검증하고자 하는 대상의 최종 결과 상태를 예상하여 정의한다.
  // 테스트 설명과 동작에 대한 기대 결과를 검증하는 코드를 작성
  // it함수는 test함수의 alias이다.
  // it 함수로 작성하는 경우 Should~~로 시작하고, test함수로 작성하면 if~~로 시작하여 작성한다.
  // describe는 test 단위를 그룹핑 할 때 사용
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // 기대 결과 === 실제 경과 -> 성공
    // 기대 결과 !== 실제 경과 -> 실패
    await render(<TextField />); // 1. Arrange

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // 단언(assertion) -> 테스트가 통과하기 위한 조건을 서술할 때 사용 -> 검증 실행
    // 기대 결과를 검증하기 위해 사용하는 사용되는 api들을 Matcher라고 한다. => https://vitest.dev/api/expect
    // toBeInTheDocument, toHaveClass 등 DOM관련 matcher느 vitest에서 제공하는 api가 아니다.
    // setupTests.js 파일에 import '@testing-library/jest-dom';를 추가하면 toBeInTheDocument()를 사용할 수 있다.
    expect(textInput).toBeInTheDocument(); // 3. Assert
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});
