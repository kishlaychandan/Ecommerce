import React, { useState } from "react";
import emailjs from 'emailjs-com';
import style from "./FloatingForm.module.css";

function FloatingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
    if (!formData.subject) newErrors.subject = 'Subject is required.';
    if (!formData.message) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      emailjs.send('service_pgmg1eq', 'template_omf4iyo', formData, 'Mx0ztLcbtCPg3GFi2')
        .then(() => {
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className={style.contactContainer}>
        <div className={style.contactButton}>CONTACT US 📞</div>
        <div className={style.contactFormContainer}>
          <form id="contact-form" onSubmit={handleSubmit}>
            {submitted && <p className={style.successMessage}>Thank you for your message!</p>}
            {loading && <p className={style.loadingMessage}>Sending...</p>}
            <div className={style.wpformsFieldContainer}>
              <div
                id="wpforms-1721-field_1-container"
                className={`${style.wpformsField} ${style.wpformsFieldText}`}
              >
                <label htmlFor="wpforms-1721-field_1">Name</label>
                <input
                  type="text"
                  id="wpforms-1721-field_1"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className={style.error}>{errors.name}</span>}
              </div>
              <div
                id="wpforms-1721-field_2-container"
                className={`${style.wpformsField} ${style.wpformsFieldEmail}`}
              >
                <label htmlFor="wpforms-1721-field_2">Email</label>
                <input
                  type="email"
                  id="wpforms-1721-field_2"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className={style.error}>{errors.email}</span>}
              </div>
              <div
                id="wpforms-1721-field_3-container"
                className={`${style.wpformsField} ${style.wpformsFieldText}`}
              >
                <label htmlFor="wpforms-1721-field_3">Subject</label>
                <input
                  type="text"
                  id="wpforms-1721-field_3"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                {errors.subject && <span className={style.error}>{errors.subject}</span>}
              </div>
              <div
                id="wpforms-1721-field_4-container"
                className={`${style.wpformsField} ${style.wpformsFieldTextarea}`}
              >
                <label htmlFor="wpforms-1721-field_4">Message</label>
                <textarea
                  id="wpforms-1721-field_4"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.message && <span className={style.error}>{errors.message}</span>}
              </div>
              <div className={style.wpformsSubmitContainer}>
                <button type="submit" id="wpforms-submit-1721">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FloatingForm;