import './Input.scss';
import { Language } from '../../assets/langs/lang';
import classNames from 'classnames';
import { Component } from 'react';
import { FieldControl } from 'react-reactive-form';

export class Input extends Component<Partial<{
     formControlName: string,
     label: string,
     /** Sets or retrieves a comma-separated list of content types. */
     accept: string;
     /** Sets or retrieves a text alternative to the graphic. */
     alt: string;
     /** Specifies whether autocomplete is applied to an editable text field. */
     autocomplete: string;
     capture: boolean | "user" | "environment" | undefined;
     /** Sets or retrieves the state of the check box or radio button. */
     checked: boolean;
     /** Sets or retrieves the state of the check box or radio button. */
     defaultChecked: boolean;
     /** Sets or retrieves the initial contents of the object. */
     defaultValue: string;
     disabled: boolean;
     /** Overrides the action attribute (where the data on a form is sent) on the parent form element. */
     formAction: string;
     /** Used to override the encoding (formEnctype attribute) specified on the form element. */
     formEnctype: string;
     /** Overrides the submit method attribute previously specified on a form element. */
     formMethod: string;
     /** Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option. */
     formNoValidate: boolean;
     /** Overrides the target attribute on a form element. */
     formTarget: string;
     max: string;
     /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
     maxLength: number;
     /** Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field. */
     min: string;
     minLength: number;
     /** Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list. */
     multiple: boolean;
     /** Sets or retrieves the name of the object. */
     name: string;
     /** Gets or sets a string containing a regular expression that the user's input must match. */
     pattern: string;
     /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
     placeholder: string;
     readOnly: boolean;
     /** When present, marks an element that can't be submitted without a value. */
     required: boolean;
     selectionDirection: "forward" | "backward" | "none" | null;
     /** Gets or sets the end position or offset of a text selection. */
     selectionEnd: number | null;
     /** Gets or sets the starting position or offset of a text selection. */
     selectionStart: number | null;
     size: number;
     /** The address or URL of the a media resource that is to be considered. */
     src: string;
     /** Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field. */
     step: string;
     /** Returns the content type of the object. */
     type: string;
     /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
     value: string;
     valueAsDate: Date | null;
     valueAsNumber: number;
     onBlur: () => void,
     onChange: () => void,
     onFocus: () => void,
}>> {

     private getErrorMessage(error: { [x: string]: any }): string {
          const first = Object.keys(error).shift();
          return Language.LANG.ERRORS(error)[first!] || '';
     }

     public render() {
          const input = ({ handler, errors, disabled, dirty }) => (
               <div className='input-container'>
                    <input
                         {...handler()}
                         className={classNames({
                              invalid: Object.keys(errors || {})?.length,
                              valid: !Object.keys(errors || {})?.length,
                              disabled,
                              untouched: !dirty,
                              touched: dirty
                         })}
                         accept={this.props.accept}
                         alt={this.props.alt}
                         autoComplete={this.props.autocomplete}
                         capture={this.props.capture}
                         checked={this.props.checked}
                         defaultChecked={this.props.defaultChecked}
                         defaultValue={this.props.defaultValue}
                         disabled={this.props.disabled}
                         formAction={this.props.formAction}
                         formMethod={this.props.formMethod}
                         formNoValidate={this.props.formNoValidate}
                         formTarget={this.props.formTarget}
                         max={this.props.max}
                         maxLength={this.props.maxLength}
                         min={this.props.min}
                         minLength={this.props.minLength}
                         multiple={this.props.multiple}
                         name={this.props.name}
                         pattern={this.props.pattern}
                         placeholder={this.props.placeholder}
                         readOnly={this.props.readOnly}
                         required={this.props.required}
                         size={this.props.size}
                         src={this.props.src}
                         step={this.props.step}
                         value={this.props.value}
                         type={this.props.type}
                         onBlur={this.props.onBlur}
                         onFocus={this.props.onFocus}
                         onInput={this.props.onChange}
                    />
                    {Object.keys(errors || {})?.length && dirty ? <span className='error-msg'>{this.getErrorMessage(errors)}</span> : null}
               </div>
          )
          return (
               <div className={classNames({
                    input: true,
                    disables: this.props.disabled,
                    required: this.props.required
               })}>
                    <label className={classNames({
                         required: this.props.required
                    })} htmlFor={this.props.label || ''}>{this.props.label || ''}</label>
                    {this.props.formControlName ? <FieldControl
                         name={this.props.formControlName}
                         render={input}
                    /> : input({ handler: () => {}, errors: {}, disabled: this.props.disabled, dirty: true })}
               </div>
          )
     }
}