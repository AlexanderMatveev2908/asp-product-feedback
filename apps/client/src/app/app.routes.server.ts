import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'feedbacks/read/:productID',
    renderMode: RenderMode.Server,
  },
  {
    path: 'feedbacks/read/roadmap',
    renderMode: RenderMode.Server,
  },
  {
    path: 'feedbacks/post',
    renderMode: RenderMode.Client,
  },
  {
    path: 'feedbacks/put',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
