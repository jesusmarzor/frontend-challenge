import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { getProducts } from './services/getProducts';
import ProductsTableItem from './partials/products/ProductsTableItem';
import { VARIABLES, MOCK_DATA, TAXES, PAGE_MIN, PAGE_MAX } from './utils/Constants';
import { Pagination } from './components/Pagination';
import { VariablesProvider } from './contexts/variablesContext';
import './config/i18n';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

const statusTax = (tax) => {
    switch (tax) {
      case TAXES.ES_GENERAL_21:
        return 'ES General - 21%';
      case TAXES.ES_REDUCED_10:
        return 'ES Reducido - 10%';
      case TAXES['ES_SUPER-REDUCED_4']:
        return 'ES Super reducido - 4%';
      case TAXES.FR_GENERAL_20:
        return 'FR General - 20%';
      case TAXES['FR_REDUCED_5.5']:
        return 'FR Reducido - 5.5%';
      default:
        return 'Sin impuestos';
    }
};

const statusStock = (stock) => {
    return (stock > 0) ? stock : 'Vacío';
}

describe('Comprobar la llamada al servidor', () => {
    let data = {};
    test('Comprobar que devuelve los datos propuestos', async () => {
        data = await getProducts(VARIABLES);
        expect(data).toEqual(MOCK_DATA.data.fetchProducts)
    })
    test('Comprobar renderizado de los productos', () => {
        const products = data.results;
        products.map( product => {
            const component = render(
                <table>
                    <tbody>
                        <ProductsTableItem 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            stock={product.stock}
                            tax={product.tax} 
                        />
                    </tbody>
                </table>
            )
            const container = component.container;
            expect(container).toHaveTextContent(product.id);
            expect(container).toHaveTextContent(product.title);
            expect(container).toHaveTextContent(product.price);
            expect(container).toHaveTextContent(statusTax(product.tax));
            expect(container).toHaveTextContent(statusStock(product.stock));
        })
    })
    test('Comprobar resultados de la paginación', () => {
        const pagination = data.pagination;
        const component = render(<VariablesProvider><Pagination pagination={pagination}/></VariablesProvider>)
        const container = component.container;
        expect(container).toHaveTextContent(pagination.totalResults);
        expect(container).toHaveTextContent(PAGE_MIN(pagination.currentPage, pagination.limitValue));
        expect(container).toHaveTextContent(PAGE_MAX(pagination.currentPage, pagination.limitValue, pagination.totalResults));
    })
})