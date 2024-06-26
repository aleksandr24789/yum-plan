import { useState } from 'react'
import { z } from 'zod'
import { ingredients } from '@/data/ingredients'
import { v4 as uuidv4 } from 'uuid'
import RecipeImage from '@/components/RecipeImage/RecipeImage'
import IngredientsSelector from '@/components/IngredientsSelector/IngredientsSelector'
import FormButton from '@/components/FormButton/FormButton'
import cl from 'classnames'
import styles from './CreateRecipeForm.module.css'

export default function CreateRecipeForm() {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: null,
    description: null,
    picture: null,
    duration: null,
    ingredients: [{
      name: null,
      amount: null,
      id: uuidv4(),
    }],
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
        .min(2, 'Название должно содержать не менее двух символов')
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
        className={styles.label}
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
        className={cl(styles.input, formErrors?.name && styles.error)}
      />
      <span className={styles.hint}>{formErrors?.name}</span>
      <label
        htmlFor="description"
        className={styles.label}
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
        className={styles.textarea}
      />
      <label
        htmlFor="picture"
        className={styles.label}
      >
        Изображение
      </label>
      <RecipeImage onChange={setFormValues} />
      <label
        htmlFor="duration"
        className={styles.label}
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
        className={cl(styles.input,
          styles.number,
          formErrors?.duration && styles.error)}
      />
      <span className={styles.hint}>{formErrors?.duration}</span>
      <label
        htmlFor="ingredients"
        className={styles.label}
      >
        Ингредиенты
      </label>
      <div className={styles.ingredients}>
        {formValues.ingredients.map((ingredient, index) => (
          <IngredientsSelector
          options={ingredients}
          handleChange={setFormValues}
          key={ingredient.id}
          id={ingredient.id}
          showRemoveIcon={index != 0}
          />
        ))}
        <button
          type="button"
          className={styles.more}
          onClick={() => setFormValues((prev) => ({
            ...prev,
            ingredients: [
              ...prev.ingredients,
              { name: null, amount: null, id: uuidv4() }
            ]
          }))}
        >
          Добавить ингредиент
        </button>
      </div>
      <label
        htmlFor="public"
        className={styles.label}
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
        className={cl(styles.input, styles.checkbox)}
      />
      <FormButton
        caption="Добавить"
        loading={buttonLoading}
        className={styles.submit}
      />       
    </form>
  )
}