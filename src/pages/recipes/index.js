import Head from 'next/head'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import NavButton from '@/components/NavButton/NavButton'
import styles from './recipes.module.css'

export default function Recipes() {
  return (    
    <MainLayout>
      <Head>
        <title>YumPlan! Рецепты</title>
      </Head>
      <h2 className={styles.title}>Рецепты</h2>
      <NavButton
        button
        href="/recipes/create"
      >
        Создать рецепт
      </NavButton>
    </MainLayout>
  )
}