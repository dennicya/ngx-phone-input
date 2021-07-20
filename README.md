# Angular 2+ wrapper for intl-tel-input

# Demo
...

# Installation

Run following command to install ngx-phone-input

```sh
npm install @dennicya/ngx-phone-input intl-tel-input --save
```

After install, you need to add **intlTelInput.css**, **intlTelInput.min.js**, **utils.js**.

In case of @angular/cli, add 2 files in your `angular.json`.

For example,

- Include **intlTelInput.css** in "styles" at your `angular.json` file  :
```
  "styles": [
    ...
    "node_modules/ngx-phone-input/assets/ngx-phone-input.scss",,
    ...
  ]
```

- Include **intlTelInput.min.js**, **utils.js** in "scripts" at your `angular.json` file  :
```
  "scripts": [
    ...
    "node_modules/intl-tel-input/build/js/intlTelInput.min.js"
    ...
  ]
```


Now add Ng2TelInputModule into your AppModule. For example,

```js
import {NgxPhoneInputModule} from '@dennicya/ngx-phone-input';
```

Once done, we are ready to use this library.

# How to use?

In order to use this directive, you need to add "ngxPhoneInput" directive with "[phoneInputOptions]" options to your text field. For example,

```html
<input type="text"
       ngxPhoneInput
       [phoneInputOptions]="{initialCountry: 'ke'}"
       (hasError)="hasError($event)"
       (phoneOutput)="getNumber($event)"
       (countryChange)="onCountryChange($event)"
       (intlTelInputObject)="telInputObject($event)" />
```

# Note
**(intlTelInputObject)** returns **intl-tel-input** instance.
By default this package get **utils.js** from below link:-
https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js
But you can also provide your utilsScript file by using below options:-

[phoneInputOptions]="{initialCountry: 'in', utilsScript: 'node_modules/intl-tel-input/build/js/utils.js'}"

# How to use this instance?
You can use it perform any functionality that is available on intl-tel-input plugin. **For example**, in your component,
```
telInputObject(obj) {
    console.log(obj);
    obj.setCountry('ke');
  }
```

# Improving the Library

...
