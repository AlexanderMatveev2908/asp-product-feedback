import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { ProductsLayout } from '@/pages/products/layout/products-layout';
import { ProductsPost } from '@/pages/products/post/products-post';
import { ProductsPut } from '@/pages/products/put/products-put';
import { ProductsRead } from '@/pages/products/read/products-read';
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
    path: 'products',
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
