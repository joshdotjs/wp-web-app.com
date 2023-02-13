export default function Button({children, size, color, classNames, onClick}) {
  
  let buttons;

  if (color === 'primary') {
    buttons = {
      'sm': <button  type="button" onClick={() => onClick && onClick()} className={`${classNames} inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'md': <button  type="button" onClick={() => onClick && onClick()} className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'lg': <button  type="button" onClick={() => onClick && onClick()} className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xl': <button  type="button" onClick={() => onClick && onClick()} className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xxl': <button type="button" onClick={() => onClick && onClick()} className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
    };
  } else if (color === 'secondary') {
    buttons = {
      'sm':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'md':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'lg':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xl':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xxl': <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
    };
  } else if (color === 'secondary') {
    buttons = {
      'sm':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'md':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'lg':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xl':  <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
      'xxl': <button type="button" onClick={() => onClick && onClick()}className={`${classNames} inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>{children}</button>,
    };
  } 
  
  return buttons[size];
}