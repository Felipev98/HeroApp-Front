'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/assets/logo-batmann.png"
          alt="Logo Batman"
          width={50}
          height={50}
          className={styles.logo}
          priority
        />
      </Link>
    </nav>
  );
}

