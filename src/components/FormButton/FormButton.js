import cl from 'classnames'
import styles from './FormButton.module.css'

export default function FormButton({ caption, loading, className }) {
  return (
    <button
      type="submit"
      className={cl(styles.button, className)}
      disabled={loading}
    >
      {!loading && caption}
      {loading && <span className={styles.loader}></span>}
    </button>
  )
}