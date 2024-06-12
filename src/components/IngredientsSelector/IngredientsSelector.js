// import { ingredients } from './ingredients'
import styles from './IngredientsSelector.module.css'

export default function IngredientsSelector() {
  
  return (
    <div className={styles.container}>
      <div className={styles.selector}>

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