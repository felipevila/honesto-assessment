import styles from './footer.module.css'
import logo from './TheoremOne-logo.svg'

const Footer = () => (
  <div className={styles.footer}>
    <a href="https://www.theoremone.co/">
      <img alt="TheoremOne logo" src={logo} width={110} />
    </a>
    <small>
      Copyright {new Date().getFullYear()} TheoremOne, LLC. All Rights Reserved.
    </small>
  </div>
)

export default Footer
