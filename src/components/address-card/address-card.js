import React  from 'react';
import * as Yup from 'yup';
import { withFormik,  } from 'formik';
import TextField from '../../components/forms/text-field';
import { Button } from '../../components/button/button';
import { FieldWrapper, Heading } from './address-card.style';
import { FormattedMessage } from 'react-intl';

const FormEnhancer = withFormik({
  mapPropsToValues: (props) => {
    return {
      // id: props.item.id || null,
      // name: props.item.name || '',
      // info: props.item.info || '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Title is required!'),
    info: Yup.string().required('Address is required'),
  }),
  handleSubmit: (values) => {
    console.log(values, 'values');
    // do submitting things
  },
});

const UpdateAddress = (props ) => {
  const {
    item,
    values,
  } = props;
  const addressValue = {
    id: values.id,
    type: 'secondary',
    name: values.name,
    info: values.info,
  };


  return (
    <>
      <Heading>{item && item.id ? 'Edit Address' : 'Add New Address'}</Heading>
      <FieldWrapper>
        <TextField
          id="name"
          type="text"
          placeholder="Enter Title"
          // error={touched.name && errors.name}
          // value={values.name}
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="info"
          as="textarea"
          placeholder="Enter Address"
          // error={touched.info && errors.info}
          // value={values.info}
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          id="name"
          type="text"
          placeholder="Enter your OTP"
          // error={touched.name && errors.name}
          // value={values.name}
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        // onClick={handleSubmit}
        type="submit"
        style={{ width: '100%', height: '44px' }}
      >
        <FormattedMessage id="savedAddressId" defaultMessage="Save Address" />
      </Button>
    </>
  );
};

export default FormEnhancer(UpdateAddress);
