import { Navigate } from "react-router-dom"

import ArticlesPage from "../pages/ArticlesPage"
import CommentsPage from "../pages/CommentsPage"
import DashboardPage from "../pages/DashboardPage"
import TagsPage from "../pages/TagsPage"

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
    path: '/articles/page/:id',
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