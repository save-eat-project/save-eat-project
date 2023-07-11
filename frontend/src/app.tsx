import { useRoutes } from 'react-router-dom'
import { NotFoundPage } from './pages/404'
import { LoginPage } from './pages/login'
import { HomePage } from './pages/home'
import { SearchPage } from './pages/search'

// TODO: login상태에 따라 router 구성을 다르게하기

export function AppRouter() {
    return useRoutes([
        {
            path: '/',
            Component: HomePage,
        },
        {
            path: '/login',
            Component: LoginPage,
        },
        {
            path: '/search',
            Component: SearchPage,
        },
        {
            path: '*',
            Component: NotFoundPage,
        },
    ])
}
