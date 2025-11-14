import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-btn-main',
  imports: [],
  templateUrl: './btn-main.html',
  styleUrl: './btn-main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnMain {
  public readonly useMetaApp: UseMetaAppDir = inject(UseMetaAppDir);
}
