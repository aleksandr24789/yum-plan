import { useState } from 'react'
import NextImage from 'next/image'
import defaultPicture from 'public/images/default-recipe-picture.jpg'
import { toBase64, resizeImage } from '@/helpers/images'
import styles from './RecipeImage.module.css'

export default function RecipeImage(props) {
  const [picture, setPicture] = useState(null)
  const [loader, setLoader] = useState(false)

  const onChangePicture = async (e) => {
    setLoader(true)
    try {
      const file = await toBase64(e.target.files[0])
      const newPicture = await resizeImage(file, 130, 130)
      setPicture(newPicture)
      props.onChange(prev => ({
        ...prev,
        picture
      }))
    } catch(error) {
      console.error(error)
    }
    setLoader(false)
  }

  return (
    <div className={styles.container}>
      {!loader && <NextImage
        unoptimized
        loader={() => picture ?? defaultPicture}  
        src={picture ?? defaultPicture}
        alt="Recipe Image"
        width={130}
        height={130}
        className={styles.picture}
      />}
      {loader && <div className={styles.loader}></div>}
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