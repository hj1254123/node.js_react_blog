import { Navigate } from "react-router-dom"

import ArticlesPage from "../pages/ArticlesPage"
import CommentsPage from "../pages/CommentsPage"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import TagsPage from "../pages/TagsPage"

import Error404 from "../components/Error404"

const router = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
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
    path: '/tags',
    element: <TagsPage />
  },
  {
    path: '/comments',
    element: <CommentsPage />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default router