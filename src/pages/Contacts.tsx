import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Phone, Mail } from "lucide-react";

import { useTheme } from "../Context/Theme";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const { darkMode } = useTheme();
  const [formMessage, setFormMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    mode: "onChange",
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);

  
    setFormMessage(
      "Form validated. Message sending is not connected yet."
    );
  };

  const inputClass = `
    w-full h-[50px] border rounded-[4px]
    px-4 text-[14px] outline-none
    focus:border-[#DB4444]
    transition-colors
    ${
      darkMode
        ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
        : "bg-white border-gray-300 text-black placeholder:text-gray-500"
    }
  `;

  const cardClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black";

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#111827] text-white"
          : "bg-white text-black"
      }`}
    >

      <div className="max-w-[1170px] mx-auto px-4 pt-[70px] pb-[140px]">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] mb-[70px]">

          <Link
            to="/"
            className="text-gray-400 hover:text-[#DB4444]"
          >
            Home
          </Link>

          <span>/</span>

          <span>Contact</span>

        </div>

        {/* CONTACT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-[30px] items-stretch">

          {/* LEFT CARD */}
          <div
            className={`${cardClass} rounded shadow-lg p-[35px]`}
          >

            {/* CALL TO US */}
            <div>

              <div className="flex items-center gap-4">

                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] text-white flex items-center justify-center">
                  <Phone size={20} />
                </div>

                <h2 className="text-[18px] font-semibold">
                  Call To Us
                </h2>

              </div>

              <p className="text-[14px] mt-6 leading-6">
                We are available 24/7, 7 days a week.
              </p>

              <p className="text-[14px] mt-3">
                Phone: +8801611112222
              </p>

            </div>

            {/* DIVIDER */}
            <div className="border-b border-gray-300 my-[30px]" />

            {/* WRITE TO US */}
            <div>

              <div className="flex items-center gap-4">

                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] text-white flex items-center justify-center">
                  <Mail size={20} />
                </div>

                <h2 className="text-[18px] font-semibold">
                  Write To Us
                </h2>

              </div>

              <p className="text-[14px] leading-6 mt-6">
                Fill out our form and we will contact
                you within 24 hours.
              </p>

              <p className="text-[14px] mt-3">
                Emails: customer@exclusive.com
              </p>

              <p className="text-[14px] mt-3">
                Emails: support@exclusive.com
              </p>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div
            className={`${cardClass} rounded shadow-lg p-[35px]`}
          >

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* NAME */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className={inputClass}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={inputClass}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={inputClass}
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

              </div>

              {/* MESSAGE */}
              <div className="mt-6">

                <textarea
                  placeholder="Your Message"
                  rows={7}
                  className={`
                    w-full border rounded-[4px]
                    p-4 text-[14px] outline-none resize-none
                    focus:border-[#DB4444]
                    ${
                      darkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-300 text-black placeholder:text-gray-500"
                    }
                  `}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  })}
                />

                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}

              </div>

              {/* STATUS */}
              {formMessage && (
                <p
                  role="status"
                  className="text-[14px] text-orange-500 mt-4"
                >
                  {formMessage}
                </p>
              )}

              {/* BUTTON */}
              <div className="flex justify-end mt-6">

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "215px",
                    height: "52px",
                    backgroundColor: "#DB4444",
                    borderRadius: "4px",
                    boxShadow: "none",
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: 500,

                    "&:hover": {
                      backgroundColor: "#c73535",
                      boxShadow: "none",
                    },
                  }}
                >
                  Send Message
                </Button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}