import { ChartBarIcon, LogoutIcon, UserIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'

function UserAside() {
  return (
    <div className='w-full h-full flex flex-col gap-10 justify-start align-center p-6 pt-8'>
        <div className='w-full h-20 bg-gray-200 rounded-2xl flex items-center justify-start p-4 gap-4'>
            <Image src='/icons/avatar.svg' width={50} height={50} alt='avatar del usuario' className='rounded-full'/>
            <p className='text-lg font-bold'>Sergio Dacal</p>
        </div>
        <div className='w-full flex flex-col justify-start items-start gap-6'>
            <div className='w-full h-12 bg-blue-100 rounded-xl p-2 pl-4 flex items-center justify-start gap-4 hover:cursor-pointer'>
                <ChartBarIcon className='h-full' color='#66f'/>
                <p className='font-bold text-lg text-blue-500'>Dashboard</p>
            </div>
            <div className='w-full h-12 rounded-xl p-2 pl-4 flex items-center justify-start gap-4 hover:cursor-pointer'>
                <UserIcon className='h-full' color='#aaa'/>
                <p className='font-semibold text-lg text-gray-400'>Usuario</p>
            </div>
            <div className='w-full h-12 rounded-xl p-2 pl-4 flex items-center justify-start gap-4 hover:cursor-pointer'>
                <LogoutIcon className='h-full' color='#aaa'/>
                <p className='font-semibold text-lg text-gray-400'>Cerrar sesión</p>
            </div>
        </div>
    </div>
  )
}

export default UserAside