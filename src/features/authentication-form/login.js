import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { isLogin } from "../../store/actions/webDataInfo";
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import MaskedInput from 'react-text-mask';
import { SEND_OTP_URL, REGISTER_CUSTOMER_URL, PLACE_ORDER_URL, API_KEY } from '../../common/baseUrl';

import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
} from './authentication-form.style';
import {
  CheckoutInformation,
  InformationBox} from '../../features/checkouts/checkout-two/checkout-two.style';

import { FieldWrapper} from '../../components/address-card/address-card.style';
import TextField from '../../components/forms/text-field';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';

export default function SignInModal() {
  const Login = useSelector((state) => state.dataInfo.isLogin);

  const [mobileNo, setMobileNo] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [clickOnLogin, setClickOnLogin] = useState(false);

  const [tempOTP, setTempOTP] = useState('');


  useEffect(() => {
    //localStorage.removeItem('user')
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
      setName(CustInfo.name);
      setAddress(CustInfo.address);
      setMobileNo(CustInfo.mobile);
      setClickOnLogin(true);
      // setIsLogin(true);
      dispatch(isLogin(true));
    }
  }, []);

  const changeInput = (e) => {
    if (e.target.id === "mobileNo") {
      setMobileNo(e.target.value);
    }
    if (e.target.id === "name") {
      setName(e.target.value);
    }
    if (e.target.id === "addr") {
      setAddress(e.target.value);
    }
    if (e.target.id === "otp") {
      setOTP(e.target.value);
    }
  };

  const handleLogin = (e) => {
    // setIsLogin(true)
    dispatch(isLogin(false));
    e.preventDefault();

    let RandomNumber = Math.floor(Math.random() * 8999 + 1000);
    setTempOTP(RandomNumber);

    const url = SEND_OTP_URL + mobileNo + '/' + RandomNumber + '/' + API_KEY;

    checkInternetConnection(url);

    //let InCartItems = [];
    // for (const key in items) {
    //   InCartItems.push(items[key]);
    // }
    // console.log(InCartItems);

  };

  const checkInternetConnection = (url) => {
    const isConnectionAvailable = window.navigator.onLine;
    send_sms(url, isConnectionAvailable);
  }

  const send_sms = (url, isConnectionAvailable) => {
    console.log(url);
    if (isConnectionAvailable) {
      setClickOnLogin(true);
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          
          setName(responseJson.cust_name);
          setAddress(responseJson.address);
        })
        .catch((error) => {
          console.log(error);
          alert("Hold on! Somethig went worng Try again later", [
            {
              text: "OK",
              onPress: () => null,
              style: "OK"
            },
          ]);
        });
    } else {
      alert("Hold on! Internet Connection Lost", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }
  }

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(isLogin(true));
    closeModal();
    const isConnectionAvailable = window.navigator.onLine;
    if (otp == tempOTP) {
      if (isConnectionAvailable) {
        fetch(REGISTER_CUSTOMER_URL,
          {
            method: 'POST',
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                name: name,
                address: address,
                mobile: mobileNo,
                accessKey: '8jdfjd88743jhg',
                deviceKey: API_KEY,
              })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            storeData();
          }).catch((error) => {
            console.log(error);
            alert("Hold on! Somethig went worng Try again later", [
              {
                text: "OK",
                onPress: () => null,
                style: "OK"
              },
            ]);
          });
      } else {
        alert("Hold on! Internet Connection Lost", [
          {
            text: "OK",
            onPress: () => null,
            style: "OK"
          },
        ]);
      }
    } else {
      alert("Hold on! Please Enter Valid OTP", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }

    // setIsLogin(true);
    // setLoading(false);
  };

  const storeData = () => {

    let customerInfo = {
      name: name,
      address: address,
      mobile: mobileNo,
      //accessKey: this.state.access_key,
    }

    localStorage.setItem('user', JSON.stringify(customerInfo));
    setIsLogin(true);
  };


  //   const [loading, setLoading] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  // const [clickOnLogin, setClickOnLogin] = useState(false);

  // const handleSubmit = async () => {
  //   setIsLogin(true);
  //   setLoading(false);
  //    closeModal();
  // };


  //  const handleLogin = () => {
  //   setClickOnLogin(true);
  // };
  // // const intl = useIntl();
  // // const { authDispatch } = useContext(AuthContext);
  // // const [email, setEmail] = React.useState('');
  // // const [password, setPassword] = React.useState('');

  // const toggleSignUpForm = () => {
  //   authDispatch({
  //     type: 'SIGNUP',
  //   });
  // };

  // const toggleForgotPassForm = () => {
  //   authDispatch({
  //     type: 'FORGOTPASS',
  //   });
  // };

  // const loginCallback = () => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('access_token', `${email}.${password}`);
  //     authDispatch({ type: 'SIGNIN_SUCCESS' });
  //     closeModal();
  //   }
  // };

  return (
    <Wrapper>
      <Container>
        
        <CheckoutInformation>
            {clickOnLogin === false ? (
              <InformationBox  >
                <FieldWrapper>
                  <MaskedInput
                    mask={[
                      '0',
                      /[1-9]/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    className="form-control"
                    placeholder="Enter Your Mobile Number"
                    guide={false}
                    id="mobileNo"
                    value={mobileNo}
                    onChange={changeInput}
                    // onBlur={handleBlur}
                    name="number"
                    render={(ref, props) => (
                      <StyledInput ref={ref} {...props} />
                    )}
                  />
                </FieldWrapper>

                <Button
                  onClick={handleLogin}
                  // disabled={isSubmitting}
                  type="submit"
                  style={{ width: '100%', height: '44px' }}
                >
                  <FormattedMessage
                    id="savedContactId"
                    defaultMessage="Login with OTP"
                  />
                </Button>
              </InformationBox>
            ) : (
                <>
                  <InformationBox>
                    <Heading>Your Information</Heading>
                    <FieldWrapper>
                      <TextField
                        id="name"
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={changeInput}
                      />
                    </FieldWrapper>

                    <FieldWrapper>
                      <TextField
                        id="addr"
                        as="textarea"
                        placeholder="Enter Address"
                        // error={touched.info && errors.info}
                        value={address}
                        onChange={changeInput}
                      // onBlur={handleBlur}
                      />
                    </FieldWrapper>
                    {Login === false ? (
                      <>
                        <FieldWrapper>
                          <TextField
                            id="otp"
                            type="text"
                            placeholder="Enter your OTP"
                            // error={touched.name && errors.name}
                            value={otp}
                            onChange={changeInput}
                          // onBlur={handleBlur}
                          />
                        </FieldWrapper>
                        <Button
                          type='button'
                          onClick={handleSubmit}
                          // disabled={!isValid}
                          size='big'
                          loading={loading}
                          style={{ width: '100%' }}
                        >
                          <FormattedMessage
                            id='processCheckout'
                            defaultMessage='Login'
                          />
                        </Button>
                      </>
                    ) : (
                        null
                      )}

                  </InformationBox>

                </>
              )}
          </CheckoutInformation>

      </Container>
    </Wrapper>
  );
}


const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: ${themeGet('radii.base', '6px')};
  font-family: ${themeGet('fonts.body', 'Lato, sans-serif')};
  border: 1px solid ${themeGet('colors.gray.700', '#e6e6e6')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  font-size: 16px;
  line-height: 19px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet('colors.primary.regular', '#009e7f')};
  }

  &::placeholder {
    color: ${themeGet('colors.text.regular', '#77798C')};
  }
`;