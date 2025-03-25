import { axiosPost } from "./api.js";
import { setOrderList, setMember, setIsSaveSuccess } from "../features/order/orderSlice.js";

/**
 * 전체 주문정보 가져오기 : getOrderList
 */
export const getOrderList = () => async(dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = 'http://43.200.163.45:9000/order/all';
    const data = { "id": id };

    const result = await axiosPost({url, data});
    const member = result[0];
    console.log('order list-->', result);
    dispatch(setOrderList({result}));
    dispatch(setMember({member})); 
}


/**
 * 카카오페이 결제 요청 : paymentKakaoPay
 */
export const paymentKakaoPay = (totalPrice, orderList) => async(dispatch) => {
    const id = localStorage.getItem("user_id"); 
    const pname = orderList[0].pname.concat(" 외");
    const type = "KAKAO_PAY"; 

    const url = 'http://43.200.163.45:9000/payment/qr';
    const data = {
                    id:id,
                    item_name: pname,
                    total_amount: totalPrice, // 결제 금액 (KRW)
                    formData: {
                        id: id,
                        type: type,
                        totalPrice:totalPrice,
                        orderList:orderList
                    }
                };

    const response = await axiosPost({url, data});

    if ( response.next_redirect_pc_url) {
        response.tid && localStorage.setItem("tid", response.tid);
        window.location.href = response.next_redirect_pc_url;
    }

}//paymentKakaoPay


/**
 * 결제 완료 후 주문테이블 저장 : saveToOrder
 */
export const saveToOrder = (totalPrice, orderList) => async(dispatch) => {
    const id = localStorage.getItem("user_id"); 
    const tid = localStorage.getItem("tid"); 
    const type = "KAKAO_PAY"; 
    let result_rows = 0;

    const url = 'http://43.200.163.45:9000/order/add';
    const data = {  
                    id: id,  
                    tid: tid,
                    type: type,
                    totalPrice:totalPrice, 
                    orderList:orderList
                };

    try {
        const result = await axiosPost({url, data});
        if (result.result_rows) {
            const result_rows = result.result_rows;
            console.log('주문테이블 저장 성공!!');
            dispatch(setIsSaveSuccess({result_rows})); // 주문테이블 저장 성공 감지
        }
    } catch (error) {
        console.error("주문테이블 저장 실패:", error);
    }
}//saveToOrder