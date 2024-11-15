import * as Yup from 'yup';

export const customerSchema = Yup.object().shape({
    FirstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters'),
    SecondName: Yup.string()
        .required('Second Name is required')
        .min(2, 'Second Name must be at least 2 characters'),
    LastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters'),
    Email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
});

export const updateCustomerSchema = Yup.object().shape({
    FirstName: Yup.string().min(2, 'First Name must be at least 2 characters'),
    SecondName: Yup.string().min(2, 'Second Name must be at least 2 characters'),
    LastName: Yup.string().min(2, 'Last Name must be at least 2 characters'),
    Email: Yup.string().email('Email is invalid'),
});