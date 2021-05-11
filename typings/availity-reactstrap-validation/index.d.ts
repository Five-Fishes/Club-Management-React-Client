declare module 'availity-reactstrap-validation' {
  interface IValidationOptions<V> {
    value: V;
    errorMessage: string;
  }

  type IValidationMap = {
    required?: IValidationOptions<boolean>;
    pattern?: IValidationOptions<string>;
    minLength?: IValidationOptions<number>;
    maxLength?: IValidationOptions<number>;
  };

  type InputType = 'select' | 'checkbox';

//   export interface IAvInputProps {
//     id?: string;
//     type?: InputType;
//     className?: string;
//     name?: string;
//     validate?: IValidationMap;
//     value?: string;
//   }

  export type IAvFeedbackProps = any;
  export type IAvFormProps = any;
  export type IAvGroupProps = any;
  export type IAvFieldProps = any;
  export type IAvInputProps = any;
  
declare class AvInput extends React.Component<IAvInputProps> {}
declare class AvFeedback extends React.Component<IAvFeedbackProps> {}
declare class AvForm extends React.Component<IAvFormProps> {}
declare class AvGroup extends React.Component<IAvGroupProps> {}
declare class AvField extends React.Component<IAvFieldProps> {}
}
