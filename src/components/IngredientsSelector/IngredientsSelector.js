// import { ingredients } from './ingredients'
import cl from 'classnames'
import styles from './IngredientsSelector.module.css'

export default function IngredientsSelector() {
  
  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <div className={styles.dropdown}>
          <div className={styles.control}>
            <div className={styles.value}>
              <input className={styles.input}/>
            </div>
          </div>
          <div className={cl(styles.arrow, styles.open)}></div>
        </div>
        <div className={styles.options}>
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