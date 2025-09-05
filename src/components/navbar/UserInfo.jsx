import React from 'react'
import { FaUser } from 'react-icons/fa'

const UserInfo = ({ user, email, showAvatar = true }) => {
  return (
    <div className='px-3 py-3 mb-2 bg-gray-50 rounded-lg'>
        <div className='flex items-center gap-3'>
            {
                showAvatar && (
                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                        <FaUser size={16} className='text-blue-600' />
                    </div>
                )
            }
            <div>
                <p className='text-sm font-medium text-gray-900'>{user || 'Usuario'}</p>
                <p className='text-xs text-gray-600'>{email}</p>
            </div>
        </div>
    </div>
  )
}

export default UserInfo