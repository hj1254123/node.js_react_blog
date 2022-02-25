import { Navigate } from "react-router-dom"

import HomePage from '../pages/HomePage'
import ArchivePage from '../pages/ArchivePage'
import TagsPage from '../pages/TagsPage'
import ArticlePage from '../pages/ArticlePage'

export default [
  {
    path: '/',
    element: <Navigate to='/article/page/1' />
  },
  {
    path: '/article/page/:id',
    element: <HomePage />
  },
  {
    path: '/archive',
    element: <Navigate to='/archive/1' />
  },
  {
    path: '/archive/:id',
    element: <ArchivePage />
  },
  {
    path: '/tags',
    element: <Navigate to='/tags/page/all' />
  },
  {
    path: '/tags/page/:tagName',
    element: <TagsPage />
  },
  {
    path: '/article/:id',
    element: <ArticlePage />
  }
]