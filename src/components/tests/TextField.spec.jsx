import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// my-class란 class가 항상 적용된 컴포넌트를 렌더링
beforeEach(async () => {
  await render(<TextField className="my-class" />);
});

let someCondition = false;

beforeEach(async () => {
  if (someCondition) {
    await render(<TextField className="my-class" />);
  } else {
    // ...
  }
});

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
