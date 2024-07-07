// import { getToken } from 'next-auth/jwt'
// import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return
  // const token = await getToken({ req })
  // const id = token.sub // user id
  
  try {
    // add new recipe prisma
    
    
    res.status(200).json({ message: 'Рецепт успешно создан' })
  } catch (error) {
    res.status(500).json({ message: `Ошибка: ${error}` })
  }
}