import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonColor, ButtonStyleType, ButtonType, ClinicKey, ClinicType, InputColor, InputType } from 'common/enums';
import { Button, Select, TextInput } from 'components/common';
import styles from './styles.module.scss';
import { IClinic } from 'common/interfaces';
import { createOptions } from 'helpers';

interface IProps {
  onFormHide: () => any;
}

const clinicTypeOptions = createOptions<string>(Object.values(ClinicType))

const AddClinic: React.FC<IProps> = ({ onFormHide }) => {
  const { handleSubmit, errors, control } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (clinicData: IClinic) => {
    console.log(clinicData);
  };

  const closePopUp = () => onFormHide();

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add clinic</h2>
          <button
            className={styles.closeButton}
            onClick={closePopUp}
            type="button"
          >
            &#10060;
          </button>
        </div>

        <div className={styles.inputBlock}>
          <input type="button" value="Upload documents" />
          <label>
            Upload file:
            <input type="file" multiple />
          </label>
          {/* <span>file1.pdf</span>
          <span>file2.jpg</span> */}
        </div>

        <div className={styles.inputBlock}>
          <TextInput
            name={ClinicKey.NAME}
            label="Name"
            hasHiddenLabel={false}
            placeholder="Name"
            type={InputType.TEXT}
            color={InputColor.GRAY_LIGHT}
            control={control}
            errors={errors}
          />
        </div>

        <div className={styles.inputBlock}>
          <TextInput
            name={ClinicKey.ADDRESS}
            label="Address"
            hasHiddenLabel={false}
            placeholder="Address"
            type={InputType.TEXT}
            color={InputColor.GRAY_LIGHT}
            control={control}
            errors={errors}
          />
        </div>

        <div className={styles.inputBlock}>
          <Select
            name={ClinicKey.CLINIC_TYPE}
            label="Status"
            hasHiddenLabel={false}
            placeholder="Status"
            options={clinicTypeOptions}
            color={InputColor.GRAY_LIGHT}
            control={control}
            errors={errors}
          />
        </div>

        <div className={styles.submitBtn}>
          <Button
            label="Add"
            hasHiddenLabel={false}
            type={ButtonType.SUBMIT}
            color={ButtonColor.PRIMARY_DARK}
            styleType={ButtonStyleType.WITHOUT_BORDER}
          />
        </div>

      </form>
    </div>
  );
};

export default AddClinic;