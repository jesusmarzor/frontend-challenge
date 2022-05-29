import React from 'react';
import spain from './../assets/img/spain.png';
import england from './../assets/img/england.png';
import { useTranslation } from "react-i18next";
import { LANGUAGES } from '../utils/Constants';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    if(i18n.language !== lang){
      i18n.changeLanguage(lang);
      localStorage.setItem('lang', lang);
    } 
  }

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* Suggested space for translation flags */}
            <img onClick={() => changeLanguage(LANGUAGES.EN)} className={`cursor-pointer transform duration-300 ease-in-out${(i18n.language === LANGUAGES.EN) && 'transform scale-[1.2]'}`} width={40} src={england} alt={t('England_flag')}/>
            <img onClick={() => changeLanguage(LANGUAGES.ES)} className={`cursor-pointer transform duration-300 ease-in-out${(i18n.language === LANGUAGES.ES) && 'transform scale-[1.2]'}`} width={40} src={spain} alt={t('Spain_flag')}/>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;