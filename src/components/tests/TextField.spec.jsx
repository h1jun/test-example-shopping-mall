import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// my-class란 class가 항상 적용된 컴포넌트를 렌더링
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

// let someCondition = false;

// beforeEach(async () => {
//   if (someCondition) {
//     await render(<TextField className="my-class" />);
//   } else {
//     // ...
//   }
// });

it('className prop으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className="my-class" />); // 1. Arrange
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  expect(textInput).toHaveClass('my-class'); // 3. Assert
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />); // 1. Arrange
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textInput).toBeInTheDocument(); // 3. Assert
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);
    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');
    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수 : 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 반환하는지 등 다양한 값들을 저장.
  // 보통 콜백 함수나 이벤트 핸들러가 올바르게 호출되었는지 검증하고 싶을 때 spy함수를 활용한다.
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test'); // type api는 내부적으로 keyDown 이벤트를 발생시킨다.

  // toHaveBeenCalled
  // - spy함수가 올바르게 호출되었는지 확인하기 위한 matcher
  expect(spy).toHaveBeenCalledWith('test');
});
