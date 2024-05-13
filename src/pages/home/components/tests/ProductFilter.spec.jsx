import { screen, within } from '@testing-library/react';
import { vi } from 'node_modules/vitest/dist/index';
import React from 'react';

import ProductFilter from '@/pages/home/components/ProductFilter';
import { mockUseFilterStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const setMinPriceFn = vi.fn();
const setMaxPriceFn = vi.fn();
const setTitleFn = vi.fn();

beforeEach(() => {
  // action함수에 대한 mocking
  mockUseFilterStore({
    setMinPrice: setMinPriceFn,
    setMaxPrice: setMaxPriceFn,
    setTitle: setTitleFn,
  });
});

it('카테고리 목록을 가져온 후 카테고리 필드의 정보들이 올바르게 렌더링된다.', async () => {
  await render(<ProductFilter />);

  // category 데이터는 api를 통해 비동기로 가져고이 깨문에 findByQuery로 가져와야 한다.
  expect(await screen.findByLabelText('category1')).toBeInTheDocument();
  expect(await screen.findByLabelText('category2')).toBeInTheDocument();
  expect(await screen.findByLabelText('category3')).toBeInTheDocument();
});

it('상품명을 수정하는 경우 setTitle 액션이 호출된다.', async () => {
  // Arrange
  const { user } = await render(<ProductFilter />);

  const textInput = screen.getByLabelText('상품명');

  // Act
  await user.clear(textInput);
  await user.type(textInput, 'test');

  // Assert,  setTitle 액션이 호출되었는지 확인
  expect(setTitleFn).toHaveBeenCalledWith('test');
});

it('카테고리를 클릭 할 경우의 클릭한 카테고리가 체크된다.', async () => {
  // 라디오 클릭 -> setCategoryId 호출 -> categoryId state 변경 -> 선택된 라디오 값이 ui 변경되었는지 확인
  const { user } = await render(<ProductFilter />);

  const category3 = await screen.findByLabelText('category3');
  await user.click(category3);

  // Assert, 라디오박스나 체크박스는 toBeChecked를 통해 확인
  expect(category3).toBeChecked();
});

it('최소 가격 또는 최대 가격을 수정하면 setMinPrice과 setMaxPrice 액션이 호출된다.', async () => {
  const { user } = await render(<ProductFilter />);

  const minPriceTextInput = screen.getByPlaceholderText('최소 금액');
  await user.type(minPriceTextInput, '1');

  expect(setMinPriceFn).toHaveBeenCalledWith('1');

  const maxPriceTextInput = screen.getByPlaceholderText('최대 금액');
  await user.type(maxPriceTextInput, '5');

  expect(setMaxPriceFn).toHaveBeenCalledWith('5');
});
