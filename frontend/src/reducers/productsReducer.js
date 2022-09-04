import {ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL} from '../constants/ProductConstants'

export const productsReducer = (state = {products : []}, action) =>{
switch(action.type){
    case ALL_PRODUCTS_REQUEST:
        return{
            ...state,
            loading: true,
            products:[]
        }
    case ALL_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: action.payload.products,
                totalproducts: action.payload.totalproducts,
            }
     case ALL_PRODUCTS_FAIL:
            return {
                        loading: false,
                        error: action.payload
                    }
        
     case CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null
                    }
    default:
        return state;
}

}

export const productDetailsReducer = (state = { products: {} }, action) => {
    switch (action.type) {

        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
               
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}