import React, { useEffect } from 'react'
import toast, { Toast } from 'react-hot-toast'

type Props = {
    response: any,
    t: Toast
}

const ToastSuccess: React.FC<Props> = ({ response, t }) => {

    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 mt-2 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Profile Update
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {response.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ToastSuccess
