// BookingForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './BookingForm.module.css';

const BookingForm = () => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        bookingDate: Yup.date().required('Booking date is required'),
        comment: Yup.string().optional(),
    });

    return (
        <div className={styles.bookingForm}>
            <h3>Book your campervan now</h3>
            <p>Stay connected! We are always ready to help you.</p>
            <Formik
                initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    toast.success('Booking successful!');
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="Name*" />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                        <Field type="email" name="email" placeholder="Email*" />
                        <ErrorMessage name="email" component="div" className={styles.error} />
                        <Field type="date" name="bookingDate" placeholder="Booking date*" />
                        <ErrorMessage name="bookingDate" component="div" className={styles.error} />
                        <Field as="textarea" name="comment" placeholder="Comment" />
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;
