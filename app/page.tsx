import styles from "./page.module.css";
import Home from "./home";

export default function Page() {
  return (
    <main className={styles.main}>
      <Home/>
    </main>
  );
}
