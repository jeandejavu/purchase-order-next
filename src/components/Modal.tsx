import { ReactNode, useEffect } from 'react'

interface ModalProps {
  children?: ReactNode
  title?: string
  subTitle?: string
  sizeMedium?: boolean
  onClose(): void
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  title,
  subTitle,
  sizeMedium = true,
}: ModalProps) => {
  useEffect(() => {
    const body = document.querySelector('body')
    body?.classList.add('modal-active')

    const keydown = document.onkeydown
    document.onkeydown = function (evt: KeyboardEvent) {
      evt = evt || window.event
      let isEscape = false
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc'
      }
      if (isEscape) {
        onClose()
      }
    }

    const overlay = document.querySelectorAll('.modal-overlay')
    overlay[overlay.length - 1].addEventListener('click', () => {
      onClose()
    })

    if (!sizeMedium) {
      const modalContainer = document.querySelectorAll('.modal-container')
      modalContainer[modalContainer.length - 1].classList.remove('md:max-w-xl')
    }

    return function setKeyDown() {
      document.onkeydown = keydown
    }
  })

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 mx-auto md:max-w-xl rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>
        <div className="modal-content py-4 px-6">
          <div className="flex justify-between items-center pb-3">
            {title ? <p className="text-2xl font-bold">{title}</p> : '\u00A0'}
            <div className="modal-close cursor-pointer z-50">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                onClick={() => {
                  onClose()
                }}
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          {subTitle ? <p>{subTitle}</p> : <></>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
