import axios from "axios";

/**
 * axios 연동을 위한 공통 API
**/

/** POST Method **/
export async function axiosPost({url, data}) { // 구조분해할당으로 받는 이유 : 변수 이름 고정하여 표준화
    let result = null;

    try {
        result = await axios({
                method : 'post',
                url : url,
                data : data
            }).then(res => res.data);
    } catch (error) {
        console.log(error);
    }

    return result;
}

/** PUT Method **/
export async function axiosPut({url, data}) {
    let result = null;

    try {
        result = await axios({
                method : 'put',
                url : url,
                data : data
            }).then(res => res.data);
    } catch (error) {
        console.log(error);
    }

    return result;
}

/** GET Method **/
export async function axiosGet({url, data}) {
    let result = null;

    try {
        result = await axios({
                method : 'get',
                url : url,
                data : data
            }).then(res => res.data);
    } catch (error) {
        console.log(error);
    }

    return result;
}

/** DELETE Method **/
export async function axiosDelete({url, data}) {
    let result = null;

    try {
        result = await axios({
                method : 'delete',
                url : url,
                data : data
            }).then(res => res.data);
    } catch (error) {
        console.log(error);
    }

    return result;
}