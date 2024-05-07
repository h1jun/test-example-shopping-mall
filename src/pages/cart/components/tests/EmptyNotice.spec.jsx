import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// 실제 모듈을 모킹항 모듈로 대체하여 테스트 실행
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 -> spy 함수
const navigateFn = vi.fn(); //  1. 빈 함수로 모킹

// 2. react-router-dom 모듈을 mocking
vi.mock('react-router-dom', async () => {
  // 일부 모듈에 대해서만 모킹을 하고 나머지는 기존 모듈의 기능을 그대로 사용하고 싶을 때  vi.importActual 사용
  const original = await vi.importActual('react-router-dom'); //  3. 실제 react-router-dom 모듈을 가져옵니다.

  return { ...original, useNavigate: () => navigateFn }; // 4. 실제 모듈의 기능을 유지하면서 useNavigate 함수를 navigateFn으로 대체합니다.
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />); // arrange

  await user.click(screen.getByText('홈으로 가기')); // act

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/'); // assert, navigateFn 함수가 '/' 경로로 1번째로 호출되었는지 확인합니다.
});
