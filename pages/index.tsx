import AuthForm from '@/components/AuthForm'
import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import { useActions, useAppSelector } from '@/hooks/redux'
import MainLayout from '@/layouts/MainLayout'
import React, { useEffect } from 'react'

const index = () => {
  const {user} = useAppSelector(state => state.auth)
  return (
    <>
      {
          <MainLayout>
            <div className='center'>
              <h1>
                ласкаво просимo</h1>
              <h3>тут зібрані найкращі трекі !</h3>
              {!user && <AuthForm />}
            </div>
          </MainLayout>
      }

    </>
  )
}

export default index