import { setIsLoggedIn, setIsLogout, setLoginReset } from "../features/auth/authSlice.js";
import { axiosPost } from "./api.js";

/** 로그인 실패 후 isError false로 초기화 */
export const getLoginReset = () => (dispatch) => {
    dispatch(setLoginReset());
}

/** 로그아웃 버튼 클릭 시 */
export const getLogout = () => (dispatch) =>  {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user_id");
    localStorage.clear(); // 로컬 스토리지 전체 삭제
    dispatch(setIsLogout());
}

/** 로그인 버튼 클릭 시 */
export const getLogin = (formData) => async(dispatch) => {
    const url = 'http://43.200.163.45:9000/member/login';
    const data = formData;

    const loginResult = await axiosPost({url, data}); // 공통 api 사용
    const result_rows = loginResult.result_rows;

    if (result_rows === 1) { // 로그인 성공
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("user_id", formData.id);                        
        dispatch(setIsLoggedIn({result_rows})); // Reducer(Slice)의 함수 호출
    } else { // 로그인 실패
        dispatch(setIsLoggedIn({result_rows}));
    }
}