import { Navigate } from "react-router-dom"

import ArticlesPage from "../pages/ArticlesPage"
import CommentsPage from "../pages/CommentsPage"
import DashboardPage from "../pages/DashboardPage"
import TagsPage from "../pages/TagsPage"

import Error404 from "../components/Error404"

const router = [
  {
    path: '/',
    element: <Navigate to='/dashboard' />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/articles',
    element: <ArticlesPage />
  },
  {
    path: '/tags',
    element: <TagsPage />
  },
  {
    path: '/comments',
    element: <CommentsPage />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default router