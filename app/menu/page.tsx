export default function Menu() {
  return (
    <main style={{textAlign: 'center', marginTop: '10vh'}}>
      <h2>Main Menu</h2>
      <nav style={{display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', marginTop: 40}}>
        <a href="/menu/profile"><button>Profile</button></a>
        <a href="/menu/dashboard"><button>Dashboard</button></a>
        <a href="/menu/device"><button>Device</button></a>
        <a href="/menu/settings"><button>Settings</button></a>
      </nav>
    </main>
  );
}
