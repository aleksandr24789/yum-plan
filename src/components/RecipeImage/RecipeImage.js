import { useState } from 'react'
import NextImage from 'next/image'
import defaultPicture from 'public/images/default-recipe-picture.jpg'
import { toBase64 } from '@/utils/toBase64'
import { resizeImage } from '@/utils/resizeImage'
import styles from './RecipeImage.module.css'

export default function RecipeImage() {
  const [picture, setPicture] = useState()

  const onChangePicture = async (e) => {
    const file = await toBase64(e.target.files[0])
    setPicture(resizeImage(file, 130, 130))
  }

  return (
    <div className={styles.container}>
      <NextImage
        unoptimized
        loader={() => picture ? picture : defaultPicture}
        src={picture ? picture : defaultPicture}
        alt="Recipe Image"
        width={130}
        height={130}
        className={styles.picture}
      />
      <input
        type="file"
        name="recipeimg"
        title=" "
        accept="image/*"
        capture="user"
        onChange={onChangePicture}
        className={styles.upload}
      />
    </div>
  )
}