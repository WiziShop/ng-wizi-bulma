# 16.0.0 (2023-09-27)

## Upgrade
- Angular 16
- pnpm 8

# 14.0.0 (2022-06-24)

## Upgrade
- Angular 14
- bulma 0.9.4


# 13.0.0 (2021-11-23)

## Upgrade
- Angular 13
- rxjs 7
- bulma 0.9.3


## Breaking changes
In your main scss file, replace `@import '~@wizishop/ng-wizi-bulma/ng-wizi-bulma';` with `@import 'node_modules/@wizishop/ng-wizi-bulma/ng-wizi-bulma';`

  
# 12.0.0 (2021-05-31)

- Upgrade to Angular 12

# 11.0.0 (2020-11-18)

- Upgrade to Angular 11

# 10.0.1 (2020-11-13)

- Handle [setDisableState](https://angular.io/api/forms/ControlValueAccessor#setdisabledstate) for `switch` and `dropdown` components

# 10.0.0 (2020-08-17)

- Upgrade to Angular 10

# 9.1.4 (2020-06-10)

- Date Picker: add clear event

# 9.1.3 (2020-06-10)

- Change in nwb-date-picker. The use of an input type "date" or "datetime-local" is now deprecated due to the lack of timezone. Use an input type "text" and set the attribute "nwbDateType" instead.
- Upgrade to Bulma 0.9
- Upgrade to Angular 9.1.10
- Upgrade to Angular CDK 9.2.4

# 9.1.1 (2020-04-15)

- Upgrade to Angular 9.1.1
- Upgrade to typescript 3.8.3

# 9.0.0 (2020-02-07)

- Upgrade to Angular 9
- Upgrade to Bulma 0.8

#8.0.4 (2019-09-18)

- Use safeHtml pipe in dropdown option to be able to pass raw html

#8.0.2 (2019-06-10)

- Added divider to dropdown via [PR#15](https://github.com/WiziShop/ng-wizi-bulma/pull/15)
- Updated documentation for dropdown
- Added support for 'touchstart' on dropdown dismiss

Thanks to ([@nathanbedford](https://github.com/nathanbedford)) for this work

# 8.0.1 (2019-06-10)

### Breaking changes

- Due to poor API/bugs of bulma calendar the datepicker won't support anymore `time` input. The only supported inputs are `date` and `datetime-local. If needed a separate component should be created
- `DatePickerSettings` has been renamed to `NwbDatePickerDefaultSettings`
- `DatePickerFormat` has been renamed to `NwbDatePickerFormat`
- `NwbDatePickerIntl` has been renamed to `NwbDatePickerIntl`

### Fixes

- The default time part in the `datetime-local` wasn't working.

# 8.0.0 (2019-06-06)

- Upgrade to Angular 8
- New [Datepicker component](https://ng-wizi-bulma.firebaseapp.com/date-picker)

# 7.0.11 (2019-05-22)

- fix type of value returned for currency-edit-in-place : now return a number value, not a string of number
- fix when removing all characters and submitting

# 7.0.10 (2019-05-21)

- Add Edit-in-place with currency / fixed numbers

# 7.0.9 (2019-03-25)

- Dropdown: fix performance issue due to global document click listener

# 7.0.8 (2019-03-15)

- Add option selectTextUponClick in edit in place component (PR #11)
- Upgrade deps

# 7.0.7 (2019-02-01)

- Display dialog's footer even if there's only one of the buttons present (PR #9)

# 7.0.6 (2019-01-23)

- Angular 7.2.2
- Upgrade deps

# 7.0.5 (2018-11-27)

- Angular 7.1.0
- fix: upgrade nodemon to remove [vulnerability](https://github.com/remy/nodemon/commit/21e052eddf144b27a7c0eb9c603236707003d75d)

# 7.0.4 (2018-11-16)

- Update to angular 7.0.4
- Add new scss @import '~@wizishop/ng-wizi-bulma/ng-wizi-bulma'; to allow custom all color from bulma
- Move from bulma-switch / bulma-pageloader to bulma-extensions to avoid some error message
- Update fontawesome to last 5.5.0 version

# 7.0.0 (2018-10-19)

- New major version number follows Angular major version number

# 5.0.1 (2018-10-16)

- Upgrade bulma deps
- Add new component `nwb-edit-in-place`

# 5.0.0 (2018-09-14)

- package name changed. It's now under the scope @wizishop. Then to install it run `npm i @wizishop/ng-wizi-bulma`

# 4.0.7 (2018-08-29)

- Increase timer in modal-search component while navigating with keyboard

# 4.0.6 (2018-08-24)

- Angular 6.1.4
- Set a default value for NwbAlertConfig.position

# 4.0.5 (2018-08-16)

- Angular 6.1
- Add ofLabel property into NwbPaginatorIntl

# 4.0.4 (2018-07-23)

- In NwbFilterRoutingBuilder.group add groupName argument to let user overwrite the default one

# 4.0.3 (2018-07-19)

- FIX: wrong direction was used for the arrow in NwbSortHeaderComponent
- Add NwbFilterRoutingBuilder service

# 4.0.0 (2018-07-13)

- Each component has now its own module, so you can import only the components you want to use.
- Breaking changes: `NwbModule` has been renamed to `NwbAllModule`. Il will import all the components' module for you.

# 3.0.10 (2018-07-12)

- Add sort header component which is an adaptation of the sort header from angular material

# 3.0.9 (2018-07-02)

- Allow to add extra classes to modalsearch component

# 3.0.7 (2018-06-20)

- Optimize modalsearch listener

# 3.0.6 (2018-06-19)

- Upgrade dependencies

# 3.0.5 (2018-06-19)

- Fixes infinite loop that could occur when modalsearch was created but never opened

# 3.0.4 (2018-06-14)

- Remove use of material icon, use only font awesome
- NwbModalSearchComponent: Add header and footer component.
- NwbFoundRow now accepts children properties

# 3.0.3 (2018-06-14)

- NwbModalSearchComponent: Add enabled property to enable/disable the modal search component

# 3.0.1 (2018-05-30)

- Breaking changes: NwbDropdownConfig.classes and NwbDropdownConfig.disabled don't exist anymore, they've been added as component input

# 3.0.0 (2018-05-23)

- Upgrade to Angular 6 and Bulma 0.7.2

# 2.0.10 (2018-03-23)

- Add simple animated card component

# 2.0.9 (2018-03-22)

- Removing useless structure for alert to a more slick one

# 2.0.8 (2018-03-22)

- Fix + nicer doc

# 2.0.7 (2018-03-22)

- Add alert component + doc

# 2.0.5 (2018-03-21)

- FIX switch: do not emit event if value didn't change
- Add tooltip directive from https://wikiki.github.io/elements/tooltip/

# 2.0.4 (2018-03-20)

- Add switch component from https://wikiki.github.io/form/switch/

# 2.0.2 (2018-01-22)

- Add tabs component thanks to [TomzOk](https://github.com/TomzOk)

# 2.0.1 (2018-01-12)

- Angular 5.2.0
- Bulma 0.6.2

# 2.0.0 (2018-01-05)

- Angular 5.1.2
- Bulma 0.6.1
- Uses [ng-packagr](https://github.com/dherges/ng-packagr) to transpile into the Angular Package Format

# 1.2.3 (2017-10-06)

- Angular 4.4.4
- Bulma 0.5.3
- Fix: ng-wizi-bulma/dialog/dialog.component.html (2,698): Type 'number' is not assignable to type 'boolean'. on Aot build

# 1.2.2 (2017-10-05)

- Add nwb-modal-search component, to search everywhere
- nwb-spinner is now display block
- Can now dismiss dialog on click on modal background or with escape key

# 1.2.1 (2017-09-12)

- FIX: nwbDebounce directive could have \_onChanged undefined

# 1.2.0 (2017-09-08)

- Add nwbDebounce directive

# 1.1.9 (2017-09-04)

- Fix dropdown disabled behavior
- Set encapsulation to `ViewEncapsulation.None` on all components
- Add progress bar component (port of Angular Material's Progress Bar)

# 1.1.8 (2017-08-29)

- Add config attribute to dropdown, see `NwbDropdownConfig`

# 1.1.7 (2017-08-28)

- Add isLoading input parameter for dropdown
- Dialog have now a default auto width

# 1.1.6 (2017-08-28)

- Add Dropdown component

# 1.1.5 (2017-08-25)

- FIX: issue `dialog.component.d.ts.NwbDialogComponent.html (15,9): Type 'number' is not assignable to type 'boolean'`
  when building components with aot

# 1.1.4 (2017-08-25)

- Add spinner component
- Add `loading` property in `NwbDialogConfig` to display the spinner inside the dialog
- FIX: Dialog method: `enableButtonsAndMakeOkButtonNotLoading()` wasn't working properly

# 1.1.3 (2017-08-22)

- FIX: changing pageSize would not fire page event

# 1.1.2 (2017-08-22)

- Add paginator components
- Use material icons: https://material.io/icons

# 1.1.1 (2017-08-20)

- Fix lazy loaded modules injectors issue
- Add new functionality to the dialog component see NwbDialogConfig
- NwbDialogConfig.closeButtonText has been renamed to NwbDialogConfig.cancelButtonText

# 1.1.0 (2017-08-18)

- Angular 4.3.5
- Bulma 0.5.1
- Create singleton of overlay
- No need to add `<nwb-app-root></nwb-app-root>` into you html anymore

# 1.0.9 (2017-03-25)

- FIX npm package issue
- Throw an exception if nwbRootCpm is not defined

# 1.0.6 (2017-03-24)

Upgrade to Angular 4.x

# 1.0.0 (2017-03-01)

Initial release with 2 components :

- dialog
- snackbar
