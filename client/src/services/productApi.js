import { axiosGet, axiosPost } from "./api.js";
import { setProductList, setProduct, setImgList, setDetailImgList, setSize } from "../features/product/productSlice.js";

/**
 * 전체 상품 정보 가져오기 : getProductList
 */
export const getProductList = () => async(dispatch) => {
    const url = 'http://43.200.163.45:9000/product/all';

    const result = await axiosGet({url});
    dispatch(setProductList({result}));
}


/**
 * 개별 상품 정보 가져오기 : getProduct
 */
export const getProduct = (pid) => async(dispatch) => {
    const url = 'http://43.200.163.45:9000/product/detail';
    const data = {"pid":pid};

    const result = await axiosPost({url, data});
    const product = result;
    const imgList = result.imgList;
    const detailImgList = result.detailImgList;

    dispatch(setProduct({product}));
    dispatch(setImgList({imgList}));
    dispatch(setDetailImgList({detailImgList}));

    // axios
    //   .post("http://43.200.163.45:9000/product/detail", {"pid":pid}) 
    //   .then((res) => {
    //       setProduct(res.data);
    //       setImgList(res.data.imgList);
    //       setDetailImgList(res.data.detailImgList);
    //     })
    //   .catch((error) => console.log(error));
}


/**
 * 개별 사이즈 정보 가져오기 : getSize
 */
export const getSize = (size) => (dispatch) => {
    dispatch(setSize({size}));
}