import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { ProductsLayout } from '@/pages/feedbacks/layout/products-layout';
import { ProductsPost } from '@/pages/feedbacks/post/products-post';
import { ProductsPut } from '@/pages/feedbacks/put/products-put';
import { ProductsRead } from '@/pages/feedbacks/read/:productID/products-read';
import { ProductsRoadmap } from '@/pages/feedbacks/read/roadmap/products-roadmap';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'notice',
    component: Notice,
  },
  {
    path: 'feedbacks',
    component: ProductsLayout,
    children: [
      {
        path: 'post',
        component: ProductsPost,
      },
      {
        path: 'put',
        component: ProductsPut,
      },
      {
        path: 'read/roadmap',
        component: ProductsRoadmap,
      },
      {
        path: 'read/:productID',
        component: ProductsRead,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
