import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID, Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const window: any;
const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js';

@Directive({
  selector: '[ngxPhoneInput]',
})
export class NgxPhoneInputDirective implements OnInit {

  @Input('phoneInputOptions') phoneInputOptions: { [key: string]: any } = {};
  @Output('hasError') hasError: EventEmitter<boolean> = new EventEmitter();
  @Output('phoneOutput') phoneOutput: EventEmitter<any> = new EventEmitter();
  @Output('countryChange') countryChange: EventEmitter<any> = new EventEmitter();
  @Output('intlTelInputObject') intlTelInputObject: EventEmitter<any> = new EventEmitter();

  intlTelInput: any;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              @Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnInit() {

    this.generateMarkup();

    // if (isPlatformBrowser(this.platformId)) {
    //   this.phoneInputOptions = {
    //     ...this.phoneInputOptions,
    //     utilsScript: this.getUtilsScript(this.phoneInputOptions)
    //   };
    //   this.intlTelInput = window.intlTelInput(this.el.nativeElement, {
    //     ...this.phoneInputOptions
    //   });
    //
    //   this.el.nativeElement.addEventListener("countrychange", () => {
    //     this.countryChange.emit(this.intlTelInput.getSelectedCountryData());
    //   });
    //
    //   this.intlTelInputObject.emit(this.intlTelInput);
    // }
  }

  @HostListener('blur') onBlur() {
    let isInputValid: boolean = this.isInputValid();
    if (isInputValid) {
      let telOutput = this.intlTelInput.getNumber();
      this.hasError.emit(isInputValid);
      this.phoneOutput.emit(telOutput);
    } else {
      this.hasError.emit(isInputValid);
    }
  }

  @HostListener('click') elementClick() {
    console.log(this.el.nativeElement.position);
  }

  isInputValid(): boolean {
    return this.intlTelInput.isValidNumber();
  }

  setCountry(country: any) {
    this.intlTelInput.setCountry(country);
  }


  getUtilsScript(options: any) {

    console.log('utils script');
    console.log(options.utilsScript);
    console.log(defaultUtilScript);

    return options.utilsScript || defaultUtilScript;
  }

  private generateMarkup() {

    const telInput = this.el.nativeElement;
    this.addInputStyles(telInput);

    const parentEl = telInput.parentElement;

    const wrapperEl = this.createEl('div', parentEl);
    this.addWrapperStyles(wrapperEl)

    const flagsEl = this.createEl('div', wrapperEl);
    this.addFlagContainerStyles(flagsEl);
    wrapperEl.appendChild(telInput);

    const selectedFlag = this.createEl('div', flagsEl);
    this.selectedFlagStyles(selectedFlag)

  }

  private addInputStyles(el: any) {

    const styles = {
      'position': 'relative',
      'z-index': 0,
      'padding-right': '6px',
      'padding-left': '52px',
      'margin': '0 auto'
    };

    this.addStyle(styles, el);
  }

  private addWrapperStyles(el: any) {

    const styles = {
      'position': 'relative',
      'display': 'inline-block'
    };

    this.addStyle(styles, el);
  }

  private addFlagContainerStyles(el: any) {

    const styles = {
      'right': 'auto',
      'left': 0,
      'position': 'absolute',
      'top': 0,
      'bottom': 0,
      'padding': '1px'
    };

    this.addStyle(styles, el);
  }

  private selectedFlagStyles(el: any) {

    const styles = {
      'z-index': 1,
      'position': 'relative',
      'display': 'flex',
      'align-items': 'center',
      'height': '100%',
      'padding': '0 6px 0 8px',
      'background-image': 'url("./assets/img/flags/ke.svg")',
      'background-repeat': 'no-repeat;'
    };

    this.addStyle(styles, el);
  }

  private createEl(name: string, container?: any, attrs?: any): Element {

    let el = document.createElement(name);

    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(`${key}`, `${value}`);
      }
    }

    if (container) container.appendChild(el);
    return el;
  }

  private addStyle(styleProps: any, element: any) {

    Object.keys(styleProps).forEach(style => {
      element.style.setProperty(`${style}`, styleProps[style]);
    });
  }
}
