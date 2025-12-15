'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleStartAdventure = () => {
    router.push('/login');
  };

  return (
    <>
      <Navbar />
      <div className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          ¿Quieres tener tu propio administrador de <span className={styles.highlight}>héroes</span>?
        </h1>
        <button 
          onClick={handleStartAdventure}
          className={styles.adventureButton}
        >
          Inicia tu aventura
        </button>
      </div>
    </div>
    </>
  );
}
