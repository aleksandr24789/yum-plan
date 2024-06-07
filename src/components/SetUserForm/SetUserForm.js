import { useRef, useState } from 'react'
import { useStateContext } from '@/providers/stateContext'
import { z } from 'zod'
import { toBase64 } from '@/helpers/images'
import UserAvatar from '@/components/UserAvatar/UserAvatar'
import FormButton from '@/components/FormButton/FormButton'
import styles from './SetUserForm.module.css'

export default function SetUserForm() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const userAvatarRef = useRef()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [nameError, setNameError] = useState(false)
  const { user, setUser } = useStateContext()
  if (!user) return null

  const onChangeAvatar = (e) => {
    setSelectedAvatar(e.target.files[0])
    userAvatarRef.current.value = null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setButtonLoading(true)
    setNameError(false)
    setMessage(null)
    
    const data = {
      name: e.target.username.value.trim(),
      image: selectedAvatar ? await toBase64(selectedAvatar) : user.image
    }

    try {
      const result = z.object({
        name: z.string()
          .min(1, 'Имя не менее одного символа')
          .max(30, 'Имя не более 30 символов')
      }).safeParse(data)
      
      if(!result.success) {
        setNameError(true)  
        throw result.error.issues
      }

      const response = await fetch('/api/changeuser', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      setMessage(json.message)
      setUser({...user, name: data.name, image: data.image})
    }
    catch (error) {
      setMessage(error.map(e => e.message).join('<br>'))
    }
    setButtonLoading(false)
  }

  return(
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <label
        htmlFor="username"
        className={styles.label}
      >
        Имя пользователя
      </label>
      <input
        type="text"
        name="username"
        className={`${styles.input} ${nameError ? styles.error : ''}`}
        defaultValue={user.name}
        required
      />
      <label
        htmlFor="useravatar"
        className={styles.label}
      >
        Сменить аватар
      </label>
      <div className={styles['avatar-block']}>
        {!selectedAvatar &&
          <input
            ref={userAvatarRef}
            type="file"
            name="useravatar"
            title=" "
            accept="image/*"
            capture="user"
            onChange={onChangeAvatar}
            className={styles['avatar-input']}
        />}
        {selectedAvatar && <>
          <UserAvatar avatar={selectedAvatar} />
          <button
            type="button"
            onClick={() => setSelectedAvatar(null)}
            className={styles['avatar-cancel']}
          >
            Отмена
          </button>
        </>}
      </div>
      <FormButton
        caption="Сохранить"
        loading={buttonLoading}
      />
      <span className={styles.message}>{message}</span>
    </form>
  )
}