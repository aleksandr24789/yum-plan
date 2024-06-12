import { useState } from 'react'
import { z } from 'zod'
import RecipeImage from '@/components/RecipeImage/RecipeImage'
import IngredientsSelector from '@/components/IngredientsSelector/IngredientsSelector'
import FormButton from '@/components/FormButton/FormButton'
import styles from './CreateRecipeForm.module.css'

export default function CreateRecipeForm() {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: null,
    description: null,
    picture: null,
    duration: null,
    ingredients: [],
    public: false,
  })
  const [formErrors, setFormErrors] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    setButtonLoading(true)
    setFormErrors({
      name: false,
      duration: false
    })

    const result = z.object({
      name: z.string()
        .min(1, 'Название должно содержать не менее одного символа')
        .max(50, 'Название должно содержать не более 50 символов')
      ,
      duration: z.number()
        .min(10, 'Продолжительность должна быть не менее 10 минут')
        .max(180, 'Продолжительность должна быть не более 180 минут')
    }).safeParse(formValues)

    if(result.success) {
      setTimeout(() => {
        console.log('Receipe created:', formValues)
        setButtonLoading(false)
      }, 2000)
      // TO DO: Adding to database
    }
    else {
      for (const error of result.error.issues) {
        setFormErrors(prev => ({
          ...prev,
          [error.path[0]]: error.message
        }))
      }
      setButtonLoading(false)
    }
  }
  
  return(
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <label
        htmlFor="name"
      >
        Название
      </label>
      <input
        type="text"
        name="name"
        placeholder="Например, Омлет с томатами быстрый"
        required
        onChange={(e) => setFormValues(prev => ({
          ...prev,
          name: e.target.value
        }))}
        className={formErrors?.name && styles.error}
      />
      <span>{formErrors?.name}</span>
      <label
        htmlFor="description"
      >
        Описание
      </label>
      <textarea
        name="description"
        rows="10"
        placeholder="Опишитие кратко процесс приготовления по шагам (необязательно)"
        onChange={(e) => setFormValues(prev => ({
          ...prev,
          description: e.target.value
        }))}
      />
      <label
        htmlFor="picture"
      >
        Изображение
      </label>
      <RecipeImage onChange={setFormValues} />
      <label
        htmlFor="duration"
      >
        Время (минуты)
      </label>
      <input
        type="number"
        min="10"
        max="180"
        placeholder="10"
        required
        name="duration"
        onChange={(e) => setFormValues(prev => ({
          ...prev,
          duration: Number(e.target.value)
        }))}
        className={formErrors?.duration && styles.error}
      />
      <span>{formErrors?.duration}</span>
      <label
        htmlFor="ingredients"
      >
        Ингредиенты
      </label>
      <div className={styles.ingredients}>
        <IngredientsSelector/>
        <button className={styles.more}>Ещё</button>
      </div>
      <label
        htmlFor="public"
      >
        Доступен для всех
      </label>
      <input
        type="checkbox"
        name="public"
        onChange={(e) => setFormValues(prev => ({
          ...prev,
          public: e.target.checked
        }))}
      />
      <FormButton
        caption="Добавить"
        loading={buttonLoading}
      />       
    </form>
  )
}