import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/read/:productID',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/read/roadmap',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/post',
    renderMode: RenderMode.Client,
  },
  {
    path: 'products/put',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
