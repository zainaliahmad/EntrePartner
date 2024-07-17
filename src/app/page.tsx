// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to EntrePartner</h1>
      <nav>
        <ul>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}
