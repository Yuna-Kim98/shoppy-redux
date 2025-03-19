import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartList : [],
    cartCount : 0,
    totalPrice : 0,
    isAdded : false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 장바구니 전체 카운트 조회
        setCartCount(state, action) {
            state.cartCount = action.payload.resultCount;
        },

        // 로그아웃 시 장바구니 카운트 초기화
        clearCartCount(state) {
            state.cartCount = 0;
        },

        // 로그인 시 아이디 별 장바구니 전체 리스트 조회
        setCartList(state, action) {
            state.cartList = action.payload.result; // { result: [] }
        },

        // 장바구니 빈배열로 초기화
        cartListReset(state) {
            state.cartList = [];
        },

        // 장바구니 아이템 합계 금액 조회
        setTotalPrice(state, action) {
            const list = action.payload.result;
            state.totalPrice = list.reduce((sum, item) => sum + item.price * item.qty, 0);
        },

        // 장바구니에 새 아이템 추가 확인
        setIsAdded(state, action) {
            if(action.payload.result_rows) state.isAdded = true; 
        },

        // 장바구니에 새 아이템 추가 확인 후 초기화
        isAddedReset(state) {
            state.isAdded = false;
        }
    },
})

export const { setCartCount, 
    clearCartCount, 
    setCartList, 
    cartListReset, 
    setTotalPrice,
    setIsAdded,
    isAddedReset } = cartSlice.actions

export default cartSlice.reducer