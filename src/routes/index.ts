import type { Router } from 'express';
import blog from './blogRoutes';

interface PathRouter {
    path: string;
    route: Router;
}

const router: PathRouter[] = [
    {
        path: "/api/blog/",
        route: blog
    }
];

export default router;