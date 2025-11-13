import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, BtnApp, MainDrop],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
