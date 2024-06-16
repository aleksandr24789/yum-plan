import { useState, useRef, useEffect } from 'react'
import cl from 'classnames'
import styles from './IngredientsSelector.module.css'

export default function IngredientsSelector(
  { options,
    handleChange }
) {
  const [query, setQuery] = useState('')
  const [selectedVal, setSelectedVal] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
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
      ingredients: option
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
        .indexOf(query.toLowerCase()) > -1
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
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value)
              handleChange(null)
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
          placeholder="100"
          required
          name="amount"
          className={styles.number}
        />
        <span className={styles.text}>грамм</span>
      </div>
    </div>
  )
}