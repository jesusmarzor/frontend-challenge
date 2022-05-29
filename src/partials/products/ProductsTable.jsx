import React from 'react';
import Products from './ProductsTableItem';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import { VariablesConsumer } from '../../contexts/variablesContext';
import { Pagination } from '../../components/Pagination';
import { ACTIONS_VARIABLES, HEADER_PRODUCTS, ORDERS } from '../../utils/Constants';

function ProductsTable() {
  const { t } = useTranslation();
  const {variables, setVariables} = VariablesConsumer();
  const {products, pagination, loading} = useProducts({variables});
  const changeOrder = (option) => {
    (variables.order_by === option)
    ?
      (variables.order === ORDERS.ASC)
      ?
        setVariables({type: ACTIONS_VARIABLES.UPDATE_ORDER, payload: ORDERS.DESC})
      :
        setVariables({type: ACTIONS_VARIABLES.UPDATE_ORDER, payload: ORDERS.ASC})
    :
      setVariables({type: ACTIONS_VARIABLES.UPDATE_ORDER_BY, payload: option})
  }
  return (
    <>
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">{t('Products')} <span className="text-slate-400 font-medium">{pagination.totalResults}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {
                  HEADER_PRODUCTS.map( option => {
                    return (
                      <th key={option} className="relative text-left px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        {
                        <button onClick={() => changeOrder(option)} className="w-full font-semibold text-left uppercase">
                          {t(option)}
                          {
                          (variables.order_by === option)
                          &&
                          <svg className={`ml-1 absolute right-2 top-0 bottom-0 my-auto ${(variables.order === ORDERS.ASC) && "rotate-180"}`} width="12" height="12" viewBox="0 0 129 129">
                            <g>
                              <path className="fill-gray-500" d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                            </g>
                          </svg>
                          }
                        </button>
                        }
                      </th>
                    )
                  })
                }
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
            {
              (!loading)
              &&
              products.map(product => {
                return (
                  <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    stock={product.stock}
                    tax={product.tax}
                  />
                )
              })
            }
          </tbody>
          </table>

          {
          (loading) 
          ? 
            <p className="w-full text-center my-5">{t('Loading')}</p>
          :
            (products.length === 0) && <p className="w-full text-center my-5">{t('Products_dont_exist')}</p>
          }
        </div>
      </div>
    </div>
    {
      (products.length !== 0)
      &&
      <div className="mt-8">
        <Pagination pagination={pagination}/>
      </div>
    }
  </>
  );
}

export default ProductsTable;
