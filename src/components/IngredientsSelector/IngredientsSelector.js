import { useState, useRef, useEffect } from 'react'
import cl from 'classnames'
import styles from './IngredientsSelector.module.css'

export default function IngredientsSelector({
  options,
  handleChange,
  id,
  showRemoveIcon
}) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVal, setSelectedVal] = useState(null)
  const [amount, setAmount] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', toggle)
    return () => document.removeEventListener('click', toggle)
  }, [])

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return selectedVal
    return
  }
  
  const selectOption = (option) => {
    setQuery('')
    setSelectedVal(option)
    handleChange(prev => ({
      ...prev,
      ingredients: [...prev.ingredients.map((ing) => {
        if (ing.id === id) return { ...ing, name: option }
        return ing
      })]
    }))
    setIsOpen((isOpen) => !isOpen)
  }

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current)
  }

  const filter = (options) => {
    return options.filter(
      (option) => option
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <div className={styles.dropdown}>
          <input
            ref={inputRef}
            className={styles.input}
            value={getDisplayValue()}
            placeholder="Введите название или выберите из списка"
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedVal(null)
            }}
            onClick={toggle}
          />
          <div className={cl(styles.arrow, isOpen && styles.open)}></div>
        </div>
        <ul className={cl(styles.options, isOpen && styles.open)}>
        {filter(options).map((option, index) => {
          return (
            <li
              onClick={() => selectOption(option)}
              className={cl(
                styles.option,
                option === selectedVal && styles.selected
              )}
              key={index}
            >
              {option}
            </li>
          );
        })}
          <div className={styles.option}></div>
        </ul>
      </div>
      <div className={styles.amount}>
        <input
          type="number"
          min="10"
          max="1000"
          value={amount}
          required
          name="amount"
          className={styles.number}
          onChange={(e) => {
            setAmount(Number(e.target.value))
            handleChange(prev => ({
              ...prev,
              ingredients: [...prev.ingredients.map((ing) => {
                if (ing.id === id) return { ...ing, amount: Number(e.target.value) }
                return ing
              })]
            }))
          }}
        />
        <span className={styles.text}>грамм</span>
      </div>
      <div className={styles.delete}>
        {showRemoveIcon && <button
          type="button"
          title="Удалить ингредиент"
          className={styles.button}
          onClick={() => handleChange(prev => ({
            ...prev,
            ingredients: [...prev.ingredients.filter((ing) => ing.id !== id)]
          }))}
        />}
      </div>
    </div>
  )
}