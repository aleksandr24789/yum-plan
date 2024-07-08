import { getToken } from 'next-auth/jwt'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return
  const token = await getToken({ req })
  const creatorId = token.sub
  const { name,
      description,
      picture,
      duration,
      ingredients,
      forPublic } = req.body
  
  try {
    await prisma.recipes.create({ data: {
      name,
      description,
      picture,
      duration,
      ingredients,
      forPublic,
      creatorId
    }})
    
    res.status(200).json({ message: 'Рецепт успешно создан' })
  } catch (error) {
    res.status(500).json({ message: `Ошибка: ${error}` })
  }
}