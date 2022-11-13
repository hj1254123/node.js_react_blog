import ArticlesPage from "../pages/ArticlesPage"
import CommentsPage from "../pages/CommentsPage"
import HomePage from "../pages/HomePage"
import LoadingPage from "../pages/LoadingPage"
import LoginPage from "../pages/LoginPage"
import TagsPage from "../pages/TagsPage"

const router = [
  {
    path: '/',
    element: <LoadingPage />
  },
  {
    path: '/Login',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/articles',
    element: <ArticlesPage />
  },
  {
    path: '/Tags',
    element: <TagsPage />
  },
  {
    path: '/comments',
    element: <CommentsPage />
  },
]

export default router