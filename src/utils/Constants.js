export const endpoint = import.meta.env.VITE_APP_PRODUCTS_URL;
export const query = `
query FetchProducts(
    $tax_filter: [String!],
    $title_filter: String,
    $order_by: String,
    $order: String,
    $page: Int!,
    $per_page: Int!)
    {
        fetchProducts {
            results(taxFilter: $tax_filter, titleFilter: $title_filter, orderBy: $order_by, order: $order, page: $page, perPage: $per_page) 
            {
                id
                title
                price
                tax
                stock
            }
            pagination(taxFilter: $tax_filter, titleFilter: $title_filter, orderBy: $order_by, order: $order, page: $page, perPage: $per_page) 
            {
                totalResults
                limitValue
                totalPages
                currentPage
                nextPage
                prevPage
                firstPage
                lastPage
                outOfRange
            }
        }
    }
`
export const EUR_TO_POUND = 0.85;
export const MAX_NUMBERS_PAGES = 5;
export const PAGE_MIN = (currentPage, limitValue) => {
    return (currentPage * limitValue)-(limitValue - 1)
}
export const PAGE_MAX = (currentPage, limitValue, totalResults) => {
    let result = currentPage * limitValue;
    return (result > totalResults) ? totalResults : result;
}
export const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS_VARIABLES.UPDATE_TITLE:
            return {
                ...state,
                title_filter: action.payload,
                page: 1
            }
        case ACTIONS_VARIABLES.UPDATE_TAX:
            return {
                ...state,
                tax_filter: action.payload,
                page: 1
            }
        case ACTIONS_VARIABLES.UPDATE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case ACTIONS_VARIABLES.UPDATE_ORDER_BY:
            return {
                ...state,
                order_by: action.payload,
                page: 1
            }
        case ACTIONS_VARIABLES.UPDATE_ORDER:
            return {
                ...state,
                order: action.payload,
                page: 1
            }
        default:
            return state;
    }
}
export const ACTIONS_VARIABLES = {
    UPDATE_TITLE: 'update_title',
    UPDATE_TAX: 'update_tax',
    UPDATE_PAGE: 'update_page',
    UPDATE_ORDER_BY: 'update_order_by',
    UPDATE_ORDER: 'update_order'
}
export const ORDERS = {
    ASC: 'asc',
    DESC: 'desc'
}
export const LANGUAGES = {
    ES: 'ES',
    EN: 'EN'
}
export const TAXES = {
    "ES_GENERAL_21": "es_general_21",
    "ES_REDUCED_10": "es_reduced_10",
    "ES_SUPER-REDUCED_4": "es_super-reduced_4",
    "FR_GENERAL_20": "fr_general_20",
    "FR_REDUCED_5.5": "fr_reduced_5.5"
}
export const RESET_TAXES = {
    "es_general_21": false,
    "es_reduced_10": false,
    "es_super-reduced_4": false,
    "fr_general_20": false,
    "fr_reduced_5.5": false
}
export const RESET_VARIABLES = {
    tax_filter: null,
    title_filter: null,
    order_by: "Id",
    order: "asc",
    page: 1,
    per_page: 10
}
export const HEADER_PRODUCTS = ['Id','Title','Price','Tax','Stock'];
export const MOCK_DATA = {
    "data": {
        "fetchProducts": {
            "results": [
                {
                    "id": "1",
                    "title": "Title article",
                    "price": 1.2,
                    "tax": "es_general_21",
                    "stock": 1
                },
                {
                    "id": "2",
                    "title": "Lightweight Wooden Coat",
                    "price": 69.43,
                    "tax": "es_general_21",
                    "stock": 21
                },
                {
                    "id": "3",
                    "title": "Lightweight Wooden Bench",
                    "price": 9.45,
                    "tax": "es_super-reduced_4",
                    "stock": 19
                },
                {
                    "id": "4",
                    "title": "Aerodynamic Aluminum Pants",
                    "price": 81.76,
                    "tax": "es_reduced_10",
                    "stock": 19
                },
                {
                    "id": "5",
                    "title": "Intelligent Paper Car",
                    "price": 53.85,
                    "tax": "es_general_21",
                    "stock": 44
                },
                {
                    "id": "6",
                    "title": "Incredible Wool Shoes",
                    "price": 77.32,
                    "tax": "fr_general_20",
                    "stock": 19
                },
                {
                    "id": "7",
                    "title": "Gorgeous Cotton Hat",
                    "price": 27.28,
                    "tax": "es_general_21",
                    "stock": 0
                },
                {
                    "id": "8",
                    "title": "Small Bronze Lamp",
                    "price": 1.83,
                    "tax": "es_reduced_10",
                    "stock": 27
                },
                {
                    "id": "9",
                    "title": "Sleek Wool Chair",
                    "price": 85.06,
                    "tax": "es_super-reduced_4",
                    "stock": 38
                },
                {
                    "id": "10",
                    "title": "Small Bronze Lamp",
                    "price": 91.86,
                    "tax": "fr_general_20",
                    "stock": 27
                }
            ],
            "pagination": {
                "totalResults": 953,
                "limitValue": 10,
                "totalPages": 96,
                "currentPage": 1,
                "nextPage": 2,
                "prevPage": null,
                "firstPage": true,
                "lastPage": false,
                "outOfRange": false
            }
        }
    }
};