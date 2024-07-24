import type { Router } from 'express';
import blog from './blogRoutes';
import auth from './authRoutes';

interface PathRouter {
    path: string;
    route: Router;
}

const router: PathRouter[] = [
    {
        path: "/api/blog/",
        route: blog
    },
    {
        path: "/api/auth/",
        route: auth
    }
];

export default router;