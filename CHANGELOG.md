# 1.2.2 (2017-10-06)
- Angular 4.4.4
- Bulma 0.5.3
- Fix: ng-wizi-bulma/dialog/dialog.component.html (2,698): Type 'number' is not assignable to type 'boolean'. on Aot build

# 1.2.2 (2017-10-05)
- Add nwb-modal-search component, to search everywhere
- nwb-spinner is now display block
- Can now dismiss dialog on click on modal background or with escape key

# 1.2.1 (2017-09-12)
- FIX: nwbDebounce directive could have _onChanged undefined

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
