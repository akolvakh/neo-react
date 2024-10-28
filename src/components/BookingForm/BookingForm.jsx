import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";
import customLocale from "../../services/customLocale";

const BookingForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string().optional(),
  });

  return (
    <div className={styles.bookingForm}>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={{ name: "", email: "", bookingDate: "", comment: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          toast.success("Booking successful!");
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name*" />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />

            <Field type="email" name="email" placeholder="Email*" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />

            <DatePicker
              selected={values.bookingDate}
              onChange={(date) => setFieldValue("bookingDate", date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Booking date*"
              className={styles.datepickerWrapper}
              locale={customLocale}
            />

            <ErrorMessage
              name="bookingDate"
              component="div"
              className={styles.error}
            />

            <Field as="textarea" name="comment" placeholder="Comment" />

            <button
              className={styles.bookingFormButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
