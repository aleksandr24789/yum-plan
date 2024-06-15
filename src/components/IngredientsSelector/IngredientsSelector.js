import { useState, useRef, useEffect } from 'react'
import cl from 'classnames'
import styles from './IngredientsSelector.module.css'

export default function IngredientsSelector(
  { options,
    selectedVal,
    handleChange }
) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return selectedVal
    return
  }

  useEffect(() => {
    document.addEventListener('click', toggle)
    return () => document.removeEventListener('click', toggle)
  }, [])

  const selectOption = (option) => {
    setQuery(() => '')
    handleChange(option)
    setIsOpen((isOpen) => !isOpen)
  }

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
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
          <div className={styles.control}>
            <div className={styles.value}>
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
            </div>
          </div>
          <div className={cl(styles.arrow, isOpen && styles.open)}></div>
        </div>
        <div className={cl(styles.options, isOpen && styles.open)}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option === selectedVal ? "selected" : ""
              }`}
              key={index}
            >
              {option}
            </div>
          );
        })}
          <div className={styles.option}></div>
        </div>
      </div>
      <div className={styles.amount}>
        <input
          type="number"
          min="10"
          max="1000"
          placeholder="100"
          required
          name="amount"
        />
        <span className={styles.text}>грамм</span>
      </div>
    </div>
  )
}