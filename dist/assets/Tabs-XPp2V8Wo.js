import{j as e}from"./index-Dp2ti7co.js";const l=({tabs:t,activeTab:s,onChange:n})=>e.jsx("div",{className:`\r
        flex gap-6 md:gap-10\r
        border-b border-gray-200 dark:border-gray-700\r
        overflow-x-auto md:overflow-hidden\r
        no-scrollbar\r
      `,children:t.map(r=>{const a=r.value===s;return e.jsxs("button",{onClick:()=>n(r.value),className:"relative pb-3 whitespace-nowrap",children:[e.jsx("span",{className:`
                ds-text-xs md:text-base font-medium transition-colors cursor-pointer

                ${a?"ds-text-primary":`
                      text-gray-500 dark:text-gray-400
                      hover:text-gray-700 dark:hover:text-gray-200
                    `}
              `,children:r.label}),a&&e.jsx("span",{className:`\r
                  absolute left-0 right-0 -bottom-[1px]\r
                  h-[2px] rounded\r
                  bg-ds-primary\r
                  transition-all duration-300\r
                `})]},r.value)})});export{l as T};
