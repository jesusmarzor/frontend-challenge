import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { useTranslation } from 'react-i18next';
import {VariablesConsumer} from '../contexts/variablesContext';
import { ACTIONS_VARIABLES, RESET_TAXES, TAXES } from '../utils/Constants';
function DropdownFilter({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const { t } = useTranslation();

  const { setVariables } = VariablesConsumer();

  const [taxes, setTaxes] = useState(RESET_TAXES);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const changeCheck = (e) => {
    const tax = e.currentTarget.name;
    const checked = e.currentTarget.checked;
    let new_tax = {};
    new_tax[tax] = checked;
    setTaxes(preValue => {
      return({
        ...preValue,
        ...new_tax
      })
    });
  }

  const applyChanges = () => {
    let tax_filter = [];
    for (let tax in taxes) {
      (taxes[tax]) && tax_filter.push(tax);
    }
    if(tax_filter.length === 0){
      tax_filter = null;
    }
    setVariables({type: ACTIONS_VARIABLES.UPDATE_TAX, payload: tax_filter})
    setDropdownOpen(false)
  }

  const removeChanges = () => {
    let new_taxes = taxes;
    for (let tax in new_taxes) {
      new_taxes[tax] = false;
    }
    setTaxes(new_taxes);
    setVariables({type: ACTIONS_VARIABLES.UPDATE_TAX, payload: null})
    setDropdownOpen(false)
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {t('Taxes')}
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">{t('Taxes')}</div>
          <ul className="mb-4">
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input checked={taxes[TAXES.ES_GENERAL_21]} name={TAXES.ES_GENERAL_21} onChange={changeCheck} type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">{t('General', { lang: "ES", percentage: "21%"})}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input checked={taxes[TAXES.ES_REDUCED_10]} name={TAXES.ES_REDUCED_10} onChange={changeCheck} type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">{t('Reduced', { lang: "ES", percentage: "10%"})}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input checked={taxes[TAXES['ES_SUPER-REDUCED_4']]} name={TAXES['ES_SUPER-REDUCED_4']} onChange={changeCheck} type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">{t('Super_Reduced', { lang: "ES", percentage: "4%"})}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input checked={taxes[TAXES.FR_GENERAL_20]} name={TAXES.FR_GENERAL_20} onChange={changeCheck} type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">{t('General', { lang: "FR", percentage: "20%"})}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input checked={taxes[TAXES['FR_REDUCED_5.5']]} name={TAXES['FR_REDUCED_5.5']} onChange={changeCheck} type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">{t('Reduced', { lang: "FR", percentage: "5,5%"})}</span>
              </label>
            </li>
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600" onClick={removeChanges}>Borrar</button>
              </li>
              <li>
                <button className="btn-xs bg-blue-500 hover:bg-blue-600 text-white" onClick={applyChanges} onBlur={() => setDropdownOpen(false)}>Aplicar</button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
