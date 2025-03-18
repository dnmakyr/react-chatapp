import { Navbar } from '@/components/Navbar';
import { Routes, Route} from 'react-router-dom';

function App() {  

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
    </>
  )
}

export default App
