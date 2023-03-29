import * as yup from 'yup';

export const deviceSignupScheme = yup.object().shape({
    email: yup
        .string()
        .required('TerminalId không được để trống.'),
    terminalName: yup.string().required('Tên thiết bị không được để trống'),
    password: yup
        .string()
        .trim()
        .required('Mật khẩu không được để trống.')

    ,
    passwordConfirmation: yup
        .string()
        .required('Vui lòng nhập trường này !')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại phải trùng với mật khẩu vừa nhập'),
});
