import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import ReactModal from 'react-modal'

type Props = {
  isOpen: boolean
  children: ReactNode
  className?: string
  overlayClassName?: string
  setIsOpen: () => void
}
export default function Modal({
  children,
  isOpen,
  className,
  setIsOpen,
  overlayClassName,
}: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      preventScroll={true}
      onRequestClose={setIsOpen}
      className={cn(
        'absolute top-1/2 animate-modal-fade-in-60 animate-modal-fade-out-15 focus:outline-none left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        className,
      )}
      overlayClassName={cn(
        'fixed inset-0 z-50  bg-black bg-opacity-50',
        overlayClassName,
      )}
    >
      {children}
    </ReactModal>
  )
}
