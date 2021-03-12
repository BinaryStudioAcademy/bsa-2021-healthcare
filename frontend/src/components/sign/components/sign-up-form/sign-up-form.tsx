import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthActionCreator } from 'store/slices';
import { RegisterPayloadKey, UserType, UserSex } from 'common/enums'
import { IRegisterPayload } from 'common/interfaces'
import { userRegister as validationUserSchema } from 'validation-schemas'

import { InputType, InputColor, ButtonType, ButtonColor, ButtonStyleType } from 'common/enums';
import { TextInput, Select, DateInput, Button } from "components/common";

import styles from './styles.module.scss';


const DEFAULT_VALUES: IRegisterPayload = {
  [RegisterPayloadKey.NAME]: '',
  [RegisterPayloadKey.SURNAME]: '',
  [RegisterPayloadKey.SEX]: UserSex.MALE,
  [RegisterPayloadKey.BIRTH_DATE]: '',
  [RegisterPayloadKey.EMAIL]: '',
  [RegisterPayloadKey.PASSWORD]: '',
  [RegisterPayloadKey.RETYPE_PASSWORD]: '',
  [RegisterPayloadKey.PHONE]: '',
  [RegisterPayloadKey.TYPE]: UserType.PATIENT,
  [RegisterPayloadKey.IMAGE_PATH]: 'https://www.pikpng.com/pngl/b/80-805523_default-avatar-svg-png-icon-free-download-264157.png'
};

const SignUpForm: React.FC = () => {

  const { handleSubmit, errors, control } = useForm<IRegisterPayload>({
    resolver: yupResolver(validationUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange"
  });

  const dispatch = useDispatch();

  const onSubmit = (formData: IRegisterPayload) => dispatch(AuthActionCreator.registration(formData))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <h2 className={styles.title}>Sign Up</h2>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.NAME}
          label="Name"
          placeholder="Name"
          type={InputType.TEXT}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.SURNAME}
          label="Surname"
          placeholder="Surname"
          type={InputType.TEXT}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <Select
          name={RegisterPayloadKey.SEX}
          label="Gender"
          placeholder="Gender"
          options={[
            { value: UserSex.FEMALE, label: 'female' },
            { value: UserSex.MALE, label: 'male' }
          ]}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <DateInput
          name={RegisterPayloadKey.BIRTH_DATE}
          label="Birthday"
          placeholder="Birthday"
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.EMAIL}
          label="Email"
          placeholder="Email"
          type={InputType.EMAIL}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.PASSWORD}
          label="Password"
          placeholder="Password"
          type={InputType.PASSWORD}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.RETYPE_PASSWORD}
          label="Retype password"
          placeholder="Retype password"
          type={InputType.PASSWORD}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <TextInput
          name={RegisterPayloadKey.PHONE}
          label="Phone"
          placeholder="Phone"
          type={InputType.PHONE}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock}>
        <Select
          name={RegisterPayloadKey.TYPE}
          label="Status"
          placeholder="Status"
          options={[
            { value: UserType.PATIENT, label: 'Patient' },
            { value: UserType.DOCTOR, label: 'Doctor or Nurse' }
          ]}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      <div className={styles.inputBlock} style={{ display: 'none' }}>
        <TextInput
          name={RegisterPayloadKey.IMAGE_PATH}
          label="Avatar"
          labelHidden={true}
          type={InputType.HIDDEN}
          color={InputColor.GRAY_LIGHT}
          control={control}
          errors={errors}
        />
      </div>

      {/* <div className={styles.inputBlock}>
        <input type="button" value="Upload documents" />
        <label>
          Upload file:
          <input type="file" multiple />
        </label>
        <span>file1.pdf</span>
        <span>file2.jpg</span>
      </div> */}
      <div className={styles.submitBtn}>
        <Button
          label="Sign Up"
          type={ButtonType.SUBMIT}
          color={ButtonColor.PRIMARY_DARK}
          styleType={ButtonStyleType.WITHOUT_BORDER}
        />
      </div>
    </form>
  );
};

export default SignUpForm;