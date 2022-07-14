import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/HomePage'))
const ArchivePage = lazy(() => import('../pages/ArchivePage'))
const TagsPage = lazy(() => import('../pages/TagsPage'))
const ArticlePage = lazy(() => import('../pages/ArticlePage'))
const Error404 = lazy(() => import('../components/Error404'))
const Test = lazy(() => import('../pages/Test'))

const router = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/article/page/:id',
    element: <HomePage />
  },
  {
    path: '/archive',
    element: <ArchivePage />
  },
  {
    path: '/archive/:id',
    element: <ArchivePage />
  },
  {
    path: '/tags',
    element: <TagsPage />
  },
  {
    path: '/tags/page/:tagName',
    element: <TagsPage />
  },
  {
    path: '/article/:id',
    element: <ArticlePage />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '*',
    element: <Error404 />
  }
]

export default router