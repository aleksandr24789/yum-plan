import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Head from 'next/head'
import Image from 'next/image'
import signinBackgroundImg from 'public/images/signin-bg.jpg'
import SigninLayout from '@/layouts/SigninLayout/SigninLayout'
import LoginWithButton from '@/components/LoginWithButton/LoginWithButton'
import styles from './signin.module.css'

export default function Signin({ providers }) {
  return (
    <SigninLayout>
      <Head>
        <title>YumPlan! Войти</title>
      </Head>
      <div className={styles['signin-container']}>
        <div className={styles['signin-picture']}>
          <Image
            src={signinBackgroundImg}
            alt="SignIn Background Image"
            className={styles['signin-img']}
          />
        </div>
        <div className={styles['signin-block']}>
          <h2 className={styles['signin-title']}>Войти с помощью</h2>
            {Object.values(providers).map((provider) => (
              <LoginWithButton
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                providerType={provider.name}
              />
            ))}
        </div>
      </div>
    </SigninLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (session) {
    return { 
      redirect: { 
        destination: "/",
        permanent: false
      }
    }
  }
  
  const providers = await getProviders()
  
  return {
    props: { providers: providers ?? []}
  }
}