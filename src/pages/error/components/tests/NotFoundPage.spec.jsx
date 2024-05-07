import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice.jsx';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import render from '@/utils/test/render';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return { ...original, useNavigate: () => navigateFn };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = await render(<NotFoundPage />); // arrange
  await user.click(screen.getByText('Home으로 이동')); // act
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: true });
});
