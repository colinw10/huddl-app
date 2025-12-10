import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.jsx'
// Context Providers
import { AuthProvider } from './contexts/AuthContext'
import { PostsProvider } from './contexts/PostsContext'
import { FriendsProvider } from './contexts/FriendsContext'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>        {/* Must be first - other contexts may need auth */}
      <PostsProvider>
        <FriendsProvider>
          <App />         {/* App and all children can now access all contexts */}
        </FriendsProvider>
      </PostsProvider>
    </AuthProvider>
  </StrictMode>,
)
