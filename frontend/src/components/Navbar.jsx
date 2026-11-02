import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, User, LogOut, Sparkles, LayoutDashboard, Library, ArrowRightLeft, Users, BarChart3, Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  const { user, isLibrarian, switchDemoAccount, logout, setIsLoginModalOpen } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'catalog', label: 'Book catalog', icon: Library },
    { id: 'issue-book', label: 'Circulation', icon: ArrowRightLeft },
    { id: 'student-portal', label: 'Members', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <aside className={`library-sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="sidebar-brand" onClick={() => setActiveTab('dashboard')}>
        <div className="brand-mark"><Library size={21} /></div>
        <div><strong>Campus</strong><span>Library</span></div>
        <button className="mobile-close" onClick={(event) => { event.stopPropagation(); setMobileOpen(false); }}><X size={20} /></button>
      </div>
      <div className="sidebar-label">Workspace</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} className={activeTab === item.id ? 'active' : ''} onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}><Icon size={18} /><span>{item.label}</span></button>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-action" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}<span>{darkMode ? 'Light mode' : 'Dark mode'}</span></button>
        <div className="sidebar-user" onClick={() => setProfileOpen(!profileOpen)}>
          <div className="avatar">{user?.avatar_url ? <img src={user.avatar_url} alt="" /> : <User size={17} />}</div>
          <div className="user-copy"><strong>{user?.name || 'Guest'}</strong><span>{user?.role || 'Visitor'}</span></div>
          <ChevronDown size={16} />
        </div>
        {profileOpen && <div className="profile-popover">
          <button onClick={() => { switchDemoAccount(isLibrarian ? 'student' : 'librarian'); setProfileOpen(false); }}><Sparkles size={15} /> Switch demo role</button>
          <button onClick={() => { logout(); setProfileOpen(false); setIsLoginModalOpen(true); }}><LogOut size={15} /> Sign out</button>
        </div>}
      </div>
      <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
    </aside>
  );
};
