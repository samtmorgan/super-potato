import { ModalType } from '@/types/types';
import React, { ReactElement } from 'react';

export function Modal({ open, onClose, title, body }: ModalType): ReactElement | null {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div
            className="
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none"
          >
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                type="button"
                data-testid="alerts"
                onClick={onClose}
                className={`
                px-3
                py-1
                flex 
                gap-2 
                flex-col
                items-center 
                justify-between  
                outline
                outline-slate-800
                outline-1
                rounded-full
                hover:outline-2        
                hover:disabled:bg-transparent
                active:bg-sky-400/30
                w-max
            `}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}
