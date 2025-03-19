import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false, // useState와 동일
    isError : false,
}
// isLoggedIn의 기본값이 false로 되어있기 때문에 로그인에 실패해도 값 변동이나 이벤트가 발생하지 않음.
// 때문에 로그인에 실패하거나 에러가 발생했을 때 이벤트가 발생하도록 isError 값을 추가함.

export const authSlice = createSlice({
    name: 'login', // 스토어에 등록되는 이름
    initialState,
    reducers: {
        // 로그인 처리에 필요한 함수
        // 자기 자신이 가진 변수(이 경우 isLoggedIn)에 접근할 때 : state
        // 외부에서 파라미터로 값이 들어올 때 : action
        setIsLoggedIn(state, action) {
            if(action.payload.result_rows) {
                state.isLoggedIn = true;
            } else {
                state.isError = true; // 로그인 실패 또는 에러 발생 시
            }
        },

        // 로그아웃 처리 함수
        setIsLogout(state) {
            state.isLoggedIn = false;
        },

        // 로그인 실패 후 isError 초기화 작업 함수
        setLoginReset(state) {
            state.isError = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setIsLogout, setLoginReset } = authSlice.actions

export default authSlice.reducer