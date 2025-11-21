import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { FeedbacksLayout } from '@/pages/feedbacks/layout/feedbacks-layout';
import { FeedbacksPost } from '@/pages/feedbacks/post/feedbacks-post';
import { FeedbacksPut } from '@/pages/feedbacks/put:feedbackID/feedbacks-put';
import { FeedbacksRead } from '@/pages/feedbacks/read/:feedbackID/feedbacks-read';
import { FeedbacksRoadmap } from '@/pages/feedbacks/read/roadmap/feedbacks-roadmap';
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
    component: FeedbacksLayout,
    children: [
      {
        path: 'post',
        component: FeedbacksPost,
      },
      {
        path: 'put/:feedbackID',
        component: FeedbacksPut,
      },
      {
        path: 'read/roadmap',
        component: FeedbacksRoadmap,
      },
      {
        path: 'read/:feedbackID',
        component: FeedbacksRead,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
