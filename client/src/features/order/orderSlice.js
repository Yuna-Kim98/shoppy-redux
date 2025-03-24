import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList : [],
    orderPrice : 0,
    member : {},
    isSaveSuccess : false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // 전체 주문정보 가져오기
        setOrderList(state, action) {
            state.orderList = action.payload.result;
        },

        // 주문자 이름 설정
        setMember(state, action) {
            state.member = action.payload.member;
        },

        // 주문 테이블 저장 성공시
        setIsSaveSuccess(state, action) {
            if (action.payload.result_rows) state.isSaveSuccess = true;
        }
    },

})

export const { setOrderList, setMember, setIsSaveSuccess } = orderSlice.actions

export default orderSlice.reducer