import { useState, useContext, FC, ReactNode } from "react";
import { Eye, EyeClosed } from "phosphor-react";
// Components
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import Field from "../Field/Field";
// Context
import { FormContext } from "../../context";
// Types
import { PrismaneComponent } from "../../types";

export interface TextFieldProps extends PrismaneComponent {
  name: string;
  placeholder: string;
  type?: string;
  label: string;
  action?: ReactNode;
  validating?: boolean;
  validators?: any;
  min?: number;
  max?: number;
}

/**
 * TextField Params
 * @param {Object} props
 * @param {string} props.name The name the field will be registered with
 * @param {string} props.placeholder The placeholder of the field
 * @param {string | HTMLElement} props.label The label text or element for the label element
 * @param {string | ReactNode=} props.action The label action text or element for the label element
 * @param {any} props.validators The validator functions of the field
 * @param {string=} props.className The additional classes for the text field component
 * @param {any=} props.onFocus The function for the onFocus event
 * @param {any=} props.onChange The function for the onChange event
 * @param {boolean=} props.validating The validating boolean for async validation display
 * @param {number=} props.min The min length of the field
 * @param {number=} props.max The max length of the field
 * @returns Element
 */

const TextField: FC<TextFieldProps> = ({
  name,
  placeholder,
  type,
  label,
  action,
  validating,
  validators,
  className,
  onFocus,
  min,
  max,
  ...props
}) => {
  /**
   * Mutable Type
   * @description Mutate the password type to text, so the user can see the password he entered.
   */

  const [mutableType, setMutableType] = useState(type);

  const { register, errors } = useContext(FormContext);

  return (
    <FieldWrapper
      name={name}
      label={label}
      errors={errors}
      validating={validating}
      action={action}
      className={className}
      {...props}
    >
      <Field
        name={name}
        placeholder={placeholder}
        type={mutableType}
        validators={validators}
        register={register}
        onFocus={onFocus}
        min={min}
        max={max}
      />
      {type === "password" && !errors[name] && (
        <span
          className="text-xl text-base-500 hover:text-primary-500 transition-all cursor-pointer"
          onClick={() => {
            mutableType === "password"
              ? setMutableType("text")
              : setMutableType("password");
          }}
        >
          {mutableType === "password" ? <Eye /> : <EyeClosed />}
        </span>
      )}
    </FieldWrapper>
  );
};

export default TextField;
