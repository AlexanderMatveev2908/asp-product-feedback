import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-main',
  imports: [RouterLink],
  templateUrl: './link-main.html',
  styleUrl: './link-main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkMain {
  public readonly path: InputSignal<string> = input.required();

  public readonly useMetaApp: UseMetaAppDir = inject(UseMetaAppDir);
}
