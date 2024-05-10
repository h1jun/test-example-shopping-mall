import { screen, within } from '@testing-library/react';
import React from 'react';

import ProductInfoTable from '@/pages/cart/components/ProductInfoTable';
import {
  mockUseCartStore,
  mockUseUserStore,
} from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

beforeEach(() => {
  // zustand mocking
  mockUseUserStore({ user: { id: 10 } });
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: 'Handmade Cotton Fish',
        price: 809,
        description:
          'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
        images: [
          'https://user-images.githubusercontent.com/35371660/230712070-afa23da8-1bda-4cc4-9a59-50a263ee629f.png',
          'https://user-images.githubusercontent.com/35371660/230711992-01a1a621-cb3d-44a7-b499-20e8d0e1a4bc.png',
          'https://user-images.githubusercontent.com/35371660/230712056-2c468ef4-45c9-4bad-b379-a9a19d9b79a9.png',
        ],
        count: 3,
      },
      7: {
        id: 7,
        title: 'Awesome Concrete Shirt',
        price: 442,
        description:
          'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        images: [
          'https://user-images.githubusercontent.com/35371660/230762100-b119d836-3c5b-4980-9846-b7d32ea4a08f.png',
          'https://user-images.githubusercontent.com/35371660/230762118-46d965ab-7ea8-4e8a-9c0f-3ed90f96e1cd.png',
          'https://user-images.githubusercontent.com/35371660/230762139-002578da-092d-4f34-8cae-2cf3b0dfabe9.png',
        ],
        count: 4,
      },
    },
  });
});

it('장바구니에 포함된 아이템들의 이름, 수량, 합계가 제대로 노출된다', async () => {
  // Arrange
  await render(<ProductInfoTable />);

  const [firstItem, secondItem] = screen.getAllByRole('row'); // 모킹 데이터가 2개라서

  // Assert
  expect(
    within(firstItem).getByText('Handmade Cotton Fish'),
  ).toBeInTheDocument();
  expect(within(firstItem).getByRole('textbox')).toHaveValue('3');
  expect(within(firstItem).getByText('$2,427.00')).toBeInTheDocument();

  expect(
    within(secondItem).getByText('Awesome Concrete Shirt'),
  ).toBeInTheDocument();
  expect(within(secondItem).getByRole('textbox')).toHaveValue('4');
  expect(within(secondItem).getByText('$1,768.00')).toBeInTheDocument();
});

it('특정 아이템의 수량이 변경되었을 때 값이 재계산되어 올바르게 업데이트 된다', async () => {
  // 사용자가 입력하는 인터렉션이 필요한 테스트
  // Arrange
  const { user } = await render(<ProductInfoTable />);

  const [firstItem] = screen.getAllByRole('row');
  const input = within(firstItem).getByRole('textbox'); // 이전에는 plceholder로 가져왔으나 이 경우 없으므로 textbox role로 가져온다.

  // Act
  await user.clear(input);
  await user.type(input, '5');

  // Assert
  expect(within(firstItem).getByText('$4,045.00')).toBeInTheDocument();
});

it('특정 아이템의 수량이 1000개로 변경될 경우 "최대 999개 까지 가능합니다!"라고 경고 문구가 노출된다', async () => {
  // Arrange
  const alertSpy = vi.fn();

  // widow.alert -> alertSpy로 대체
  vi.stubGlobal('alert', alertSpy);

  const { user } = await render(<ProductInfoTable />);

  const [firstItem] = screen.getAllByRole('row');
  const input = within(firstItem).getByRole('textbox');

  // Act
  await user.clear(input);
  await user.type(input, '1000');

  // Assert
  expect(alertSpy).toHaveBeenNthCalledWith(1, '최대 999개 까지 가능합니다!');
});

it('특정 아이템의 삭제 버튼을 클릭할 경우 해당 아이템이 사라진다', async () => {
  // Arrange
  const { user } = await render(<ProductInfoTable />);

  const [, secondItem] = screen.getAllByRole('row');
  const deleteButton = within(secondItem).getByRole('button');

  // Act
  expect(screen.getByText('Awesome Concrete Shirt')).toBeInTheDocument(); // 두번째 아이템이 정상적으로 존재하는지 단언하기
  await user.click(deleteButton);

  // Assert
  // queryBy~ : 요소의 존재 유무 판단. 요소가 존재하지 않아도 에러가 발생되지 않는다.
  // getBy로 시작하는 함수와 다르게 요소가 존재하지 않아도 에러를 던지지 않기 때문에 요소가 DOM에 존재하지 않는 경우 queryBy로 시작하는 함수를 이용하여 단언하는 것을 권장한다.
  // 요소가 없을때 해당 요소가 없는지 명확한 에러 피드백을 주는 get함수를 사용하는 것이 좋고
  // DOM에 존재하지 않는지 단언할 때만 queryBy 함수를 사용하는 것이 좋다.
  expect(screen.queryByText('Awesome Concrete Shirt')).not.toBeInTheDocument(); // **
});
