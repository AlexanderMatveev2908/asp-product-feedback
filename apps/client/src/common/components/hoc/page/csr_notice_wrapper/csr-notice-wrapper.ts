import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { NoticeAnimations } from './etc/animations';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { ElDomT, RefTemplateT } from '@/common/types/dom';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { NoticeWrapperPropsT } from './etc/types';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';

@Component({
  selector: 'app-csr-notice-wrapper',
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
    PageWrapper,
    PageWrapper,
    LinkShadow,
    UseSpanDir,
    UseMetaEventDir,
  ],
  templateUrl: './csr-notice-wrapper.html',
  styleUrl: './csr-notice-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrNoticeWrapper extends UseInjCtxHk implements AfterViewInit {
  // ? directives
  public readonly useMetaDir: UseMetaEventDir = inject(UseMetaEventDir);

  // ? personal props
  public readonly props: InputSignal<NoticeWrapperPropsT> = input.required();

  // ? statics
  public readonly spanProps: SpanPropsT = {
    label: 'Home',
    Svg: SvgStrokeHome,
  };

  // ? tmpl
  @ViewChild('contentRef', { read: TemplateRef })
  public contentRef: RefTemplateT;

  // ? projected
  // @ContentChild('footer', { read: TemplateRef }) footerTpl: RefTemplateT;

  private run: boolean = false;

  // ? animations
  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (this.run) return;
    this.run = true;

    this.useDOM(() => {
      const svgDOM: ElDomT = document.getElementById('csr_notice__svg_wrap');
      const contentDOM: ElDomT = document.getElementById('csr_notice__content');
      const spanStatusDOM: ElDomT = document.getElementById('csr_notice__span_status');
      const spanMsgDOM: ElDomT = document.getElementById('csr_notice__span_msg');

      NoticeAnimations.main({
        contentDOM,
        spanMsgDOM,
        spanStatusDOM,
        svgDOM,
      });
    });
  }
}
