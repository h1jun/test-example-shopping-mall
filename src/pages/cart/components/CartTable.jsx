import { Divider } from '@mui/material';
import React from 'react';

import PageTitle from '@/pages/cart/components/PageTitle';
import PriceSummary from '@/pages/cart/components/PriceSummary';
import ProductInfoTable from '@/pages/cart/components/ProductInfoTable';

// ProductInfoTable, PriceSummary로 나누어 통합 테스트 작성
// pageTitle, divider는 단순한 UI 렌더링이므로 -> 테스트 작성 X
// ProductInfoTable, PriceSummary로 나누어 통합 테스트 작성 -> 장바구니 state를 사용하여 데이터를 렌더링하는 중요한 컴포넌트이다.
// 2개로 나누지 않고 CartTable 1개로 통합 테스트를 진행할 수 있지만 -> 큰 범위의 테스트는 모킹해야 하는 정보가 많아지며 작은 변경에도 깨지기 쉽고 테스트 코드를 관리하기 어려워진다.
// ProductInfoTable, PriceSummary -> 각각 별도로 zustand store에서 필요한 state와 action을 가져와서 독립적으로 분리하여 통합 테스트로 필요한 비즈니스 로직을 검증하기 용이하다.
const CartTable = () => {
  return (
    <>
      <PageTitle />
      <ProductInfoTable />
      <Divider sx={{ padding: 2 }} />
      <PriceSummary />
    </>
  );
};

export default CartTable;
