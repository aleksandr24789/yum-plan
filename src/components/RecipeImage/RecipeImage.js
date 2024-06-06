import { useState } from 'react'
import NextImage from 'next/image'
import defaultPicture from 'public/images/default-recipe-picture.jpg'
import { toBase64, resizeImage } from '@/helpers/images'
import styles from './RecipeImage.module.css'

export default function RecipeImage(props) {
  const [picture, setPicture] = useState()

  const onChangePicture = async (e) => {
    const file = await toBase64(e.target.files[0])
    const newPicture = await resizeImage(file, 130, 130)
    setPicture(newPicture)
    console.log('new picture', picture)
    props.onChange(prev => ({
      ...prev,
      picture
    }))
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