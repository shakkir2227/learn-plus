import React, { useEffect } from 'react'
import toast, { Toast } from 'react-hot-toast'

type Props = {
    message: string
    t: Toast
}

const ToastError: React.FC<Props> = ({ message, t }) => {

    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 mt-3 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Error
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ToastError
