import React from 'react';
import { ArrowUpRight, BookOpen, CheckCircle2, Clock3, Plus, Search, Users, ArrowRight } from 'lucide-react';

export const Dashboard = ({ stats, books = [], searchQuery, setSearchQuery, onSearchSubmit, onSelectBook, onOpenNotifications }) => {
  const cards = [
    { label: 'Total books', value: stats?.totalBooks ?? books.length, icon: BookOpen, tone: 'violet', detail: 'In your collection' },
    { label: 'Active loans', value: stats?.issuedBooks ?? 0, icon: CheckCircle2, tone: 'blue', detail: 'Currently checked out' },
    { label: 'Overdue items', value: stats?.overdueBooks ?? 0, icon: Clock3, tone: 'orange', detail: 'Need attention today' },
    { label: 'Members', value: stats?.activeStudents ?? 0, icon: Users, tone: 'green', detail: 'Active accounts' }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div><p className="eyebrow">Tuesday, November 3, 2026</p><h1>Good morning, {stats ? 'librarian' : 'there'} <span>👋</span></h1><p className="heading-subtitle">Here’s what’s happening in your library today.</p></div>
        <button className="notification-button" onClick={onOpenNotifications} aria-label="View notifications"><Clock3 size={19} /><span className="notification-dot" /></button>
      </div>

      <section className="welcome-panel">
        <div className="welcome-copy"><span className="welcome-tag">CAMPUS LIBRARY</span><h2>Your knowledge space,<br /><em>beautifully organized.</em></h2><p>Search your collection, manage loans, and help every member discover their next great read.</p>
          <form onSubmit={(event) => { event.preventDefault(); onSearchSubmit(); }} className="dashboard-search"><Search size={18} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search title, author or ISBN..." /><button type="submit">Search</button></form>
        </div>
        <div className="welcome-art"><div className="art-book art-book-one" /><div className="art-book art-book-two" /><div className="art-book art-book-three" /><div className="art-orbit" /></div>
      </section>

      <div className="section-heading"><div><p className="eyebrow">Library snapshot</p><h2>At a glance</h2></div><button className="text-button" onClick={() => onSearchSubmit()}>View catalog <ArrowUpRight size={16} /></button></div>
      <section className="metric-grid">{cards.map(({ label, value, icon: Icon, tone, detail }) => <div className={`metric-card ${tone}`} key={label}><div className="metric-icon"><Icon size={20} /></div><div><span>{label}</span><strong>{Number(value).toLocaleString()}</strong><small>{detail}</small></div><ArrowUpRight className="metric-arrow" size={17} /></div>)}</section>

      <div className="content-grid">
        <section className="surface-card recent-books"><div className="card-heading"><div><p className="eyebrow">Collection</p><h2>Recently added</h2></div><button className="icon-button" onClick={() => onSearchSubmit()} aria-label="Open catalog"><ArrowRight size={18} /></button></div>
          {books.length === 0 ? <div className="empty-state"><BookOpen size={28} /><p>Your catalog is ready for its first book.</p><button onClick={() => onSearchSubmit()}>Browse catalog</button></div> : <div className="book-list">{books.slice(0, 4).map((book) => <button className="book-row" key={book.id} onClick={() => onSelectBook(book)}><img src={book.cover_url} alt="" /><span><strong>{book.title}</strong><small>{book.author}</small></span><b className={book.available_copies > 0 ? 'available' : 'issued'}>{book.available_copies > 0 ? 'Available' : 'Issued'}</b></button>)}</div>}
        </section>
        <section className="surface-card quick-actions"><div className="card-heading"><div><p className="eyebrow">Shortcuts</p><h2>Quick actions</h2></div><Plus size={18} /></div><div className="action-list"><button onClick={() => onSearchSubmit()}><span className="action-icon violet"><BookOpen size={18} /></span><span><strong>Find a book</strong><small>Explore the full catalog</small></span><ArrowRight size={16} /></button><button onClick={() => onSelectBook(books.find((book) => book.available_copies > 0) || books[0])}><span className="action-icon blue"><CheckCircle2 size={18} /></span><span><strong>Issue a book</strong><small>Start a new circulation</small></span><ArrowRight size={16} /></button><button onClick={() => onSearchSubmit()}><span className="action-icon green"><Users size={18} /></span><span><strong>Manage members</strong><small>Review student activity</small></span><ArrowRight size={16} /></button></div></section>
      </div>
    </div>
  );
};
