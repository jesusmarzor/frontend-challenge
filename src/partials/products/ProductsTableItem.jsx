import React from 'react';
import { useTranslation } from 'react-i18next';
import { EUR_TO_POUND, LANGUAGES, TAXES } from '../../utils/Constants';

function ProductsTableItem({id, title, price, tax, stock}) {
  const { t, i18n } = useTranslation();
  
  const getPrice = () => {
    return (i18n.language === LANGUAGES.ES) ? `${price} €` : `${(price * EUR_TO_POUND).toFixed(2)} £`;
  }

  const statusStock = (stock) => {
    switch (stock) {
      case 0:
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-emerald-100 text-emerald-600';
    }
  };

  const statusTax = (tax) => {
    switch (tax) {
      case TAXES.ES_GENERAL_21:
        return t('General', { lang: "ES", percentage: "21%"});
      case TAXES.ES_REDUCED_10:
        return t('Reduced', { lang: "ES", percentage: "10%"});
      case TAXES['ES_SUPER-REDUCED_4']:
        return t('Super_Reduced', { lang: "ES", percentage: "4%"});
      case TAXES.FR_GENERAL_20:
        return t('General', { lang: "FR", percentage: "20%"});
      case TAXES['FR_REDUCED_5.5']:
        return t('Reduced', { lang: "FR", percentage: "5.5%"});
      default:
        return t('Without_Tax');
    }
};
  
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{id}</div>
      </td>    
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium`}>{title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`inline-flex font-medium rounded-full text-right px-2.5 py-0.5`}>{getPrice()}</div>
      </td >    
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="inline-flex font-medium rounded-full text-right px-2.5 py-0.5 bg-indigo-100 text-indigo-600">{statusTax(tax)}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusStock(stock)}`}>{(stock > 0) ? stock : t('Empty')}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex justify-around">
          <svg version="1.1" x="0px" y="0px" width="20.626px" height="20.626px" viewBox="0 0 511.626 511.626">
            <g>
              <path className="fill-gray-500" d="M505.918,236.117c-26.651-43.587-62.485-78.609-107.497-105.065c-45.015-26.457-92.549-39.687-142.608-39.687   c-50.059,0-97.595,13.225-142.61,39.687C68.187,157.508,32.355,192.53,5.708,236.117C1.903,242.778,0,249.345,0,255.818   c0,6.473,1.903,13.04,5.708,19.699c26.647,43.589,62.479,78.614,107.495,105.064c45.015,26.46,92.551,39.68,142.61,39.68   c50.06,0,97.594-13.176,142.608-39.536c45.012-26.361,80.852-61.432,107.497-105.208c3.806-6.659,5.708-13.223,5.708-19.699   C511.626,249.345,509.724,242.778,505.918,236.117z M194.568,158.03c17.034-17.034,37.447-25.554,61.242-25.554   c3.805,0,7.043,1.336,9.709,3.999c2.662,2.664,4,5.901,4,9.707c0,3.809-1.338,7.044-3.994,9.704   c-2.662,2.667-5.902,3.999-9.708,3.999c-16.368,0-30.362,5.808-41.971,17.416c-11.613,11.615-17.416,25.603-17.416,41.971   c0,3.811-1.336,7.044-3.999,9.71c-2.667,2.668-5.901,3.999-9.707,3.999c-3.809,0-7.044-1.334-9.71-3.999   c-2.667-2.666-3.999-5.903-3.999-9.71C169.015,195.482,177.535,175.065,194.568,158.03z M379.867,349.04   c-38.164,23.12-79.514,34.687-124.054,34.687c-44.539,0-85.889-11.56-124.051-34.687s-69.901-54.2-95.215-93.222   c28.931-44.921,65.19-78.518,108.777-100.783c-11.61,19.792-17.417,41.207-17.417,64.236c0,35.216,12.517,65.329,37.544,90.362   s55.151,37.544,90.362,37.544c35.214,0,65.329-12.518,90.362-37.544s37.545-55.146,37.545-90.362   c0-23.029-5.808-44.447-17.419-64.236c43.585,22.265,79.846,55.865,108.776,100.783C449.767,294.84,418.031,325.913,379.867,349.04   z"/>
            </g>
          </svg>
          <svg x="0px" y="0px" width="20.219px" height="20.22px" viewBox="0 0 485.219 485.22">
            <g>
              <path className="fill-gray-500" d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897   C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436   c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44   c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421   c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z    M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919   c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703   c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986   C147.097,447.637,146.36,447.193,145.734,446.572z"/>
            </g>
          </svg>
          <svg width="20" height="20" viewBox="0 0 129 129">
            <g>
              <path className="fill-gray-500" d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
            </g>
          </svg>
        </div>
      </td>
    </tr>
  );
}

export default ProductsTableItem;
