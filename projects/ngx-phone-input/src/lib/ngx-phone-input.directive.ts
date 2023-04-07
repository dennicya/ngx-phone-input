import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const window: any;
const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.21/js/utils.js';

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
              @Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.phoneInputOptions = {
        ...this.phoneInputOptions,
        utilsScript: this.getUtilsScript(this.phoneInputOptions)
      };
      this.intlTelInput = window.intlTelInput(this.el.nativeElement, {
        ...this.phoneInputOptions
      });

      this.el.nativeElement.addEventListener("countrychange", () => {
        this.countryChange.emit(this.intlTelInput.getSelectedCountryData());
      });

      this.intlTelInputObject.emit(this.intlTelInput);
    }
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

  isInputValid(): boolean {
    return this.intlTelInput.isValidNumber();
  }

  setCountry(country: any) {
    this.intlTelInput.setCountry(country);
  }

  getUtilsScript(options: any) {
    return options.utilsScript || defaultUtilScript;
  }
}
