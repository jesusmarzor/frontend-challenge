import React from "react";
import { useTranslation } from "react-i18next";
import { PAGE_MIN, PAGE_MAX } from "../utils/Constants";
import { usePagination } from "../hooks/usePagination";

export const Pagination = ({pagination}) => {
    const { t } = useTranslation();
    const { numbers, changeCurrentPage, nextNumbers, prevNumbers } = usePagination({pagination});
    return(
        <>
        <div className="flex justify-center">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <div className="mr-2">
            <button onClick={prevNumbers} className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${(numbers[0] <= 1) ? "text-slate-300 pointer-events-none" : "text-slate-600  "}`}>
              <span className="sr-only">Previous</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </button>
          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            {
              numbers.map( number => {
                return(
                  <li key={number}>
                    <button onClick={() => changeCurrentPage(number)} className={`inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white border border-slate-200 ${(pagination.currentPage === number) ? "text-white bg-blue-500 pointer-events-none" : "text-slate-600 " }`}>{number}</button>
                  </li>
                )
              })
            }
          </ul>
          <div className="ml-2">
            <button onClick={nextNumbers} className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white shadow-sm border border-slate-200 ${(numbers[numbers.length-1] >= pagination.totalPages) ? "text-slate-300 pointer-events-none" : " text-slate-600 "}`}>
              <span className="sr-only">Next</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          {t('Results', { min: PAGE_MIN(pagination.currentPage, pagination.limitValue), max: PAGE_MAX(pagination.currentPage, pagination.limitValue, pagination.totalResults), total: pagination.totalResults})}
        </div>
      </div>
      </>
    )
}