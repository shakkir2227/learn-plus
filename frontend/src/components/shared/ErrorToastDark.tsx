import React from 'react'
import toast, { Toast } from 'react-hot-toast'

type Props = {
    message: string,
    t: Toast
}
const ErrorToastDark: React.FC<Props> = ({ message, t }) => {
    return (
        <div
            className={`max-w-md w-full bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition duration-150 ease-out ${t.visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-5 w-5 rounded-full"
                            src="../error-icon.png"
                            alt="Error icon"
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-white">
                            Error
                        </p>
                        <p className="mt-1 text-sm text-white">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white"
                >
                    Close
                </button>
            </div>
        </div>

    )
}

export default ErrorToastDark
