import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginOrRegistrationPage from './pages/loginOrRegistrationPage/LoginOrRegistrationPage'
import Homepage from './pages/homepage/Homepage';
import NewArticlePage from './pages/newArticlePage/NewArticlePage'
import DetailsArticlePage from './pages/detailsArticlePage/DetailsArticlePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage'
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import OAuthRedirectHandler from './middlewares/OAuthRedirectHandler'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginOrRegistrationPage />} />
        <Route path="/success" element={<OAuthRedirectHandler />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/detailsArticlePage/:blogPostId" element={<DetailsArticlePage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/newArticlePage" element={<NewArticlePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}


export default App
