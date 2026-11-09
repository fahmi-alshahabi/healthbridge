/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddDoctor,
  CheckIfDoctorAccountIsApplied,
  UpdateDoctor,
} from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";

/**
 * Constants for form configuration
 */
const SPECIALITIES = [
  "dermetologist",
  "cardiologist",
  "gynecologist",
  "neurologist",
  "orthopedic",
  "pediatrician",
  "psychiatrist",
  "surgeon",
  "urologist",
];

const QUALIFICATIONS = ["MBBS", "MD", "MS", "MDS"];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * PersonalInfoFields Component
 * Renders personal information form fields
 */
const PersonalInfoFields = () => (
  <>
    <Col span={24}>
      <h4 className="uppercase">
        <b>Personal Information</b>
      </h4>
    </Col>
    <Col span={8}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="text" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="text" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="email" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="number" />
      </Form.Item>
    </Col>

    <Col span={24}>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Required" }]}
      >
        <textarea type="text" />
      </Form.Item>
    </Col>
  </>
);

/**
 * ProfessionalInfoFields Component
 * Renders professional information form fields
 */
const ProfessionalInfoFields = () => (
  <>
    <Col span={24}>
      <h4 className="uppercase ">
        <b>Professional Information</b>
      </h4>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Speciality"
        name="speciality"
        rules={[{ required: true, message: "Required" }]}
      >
        <select>
          {SPECIALITIES.map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality.charAt(0).toUpperCase() + speciality.slice(1)}
            </option>
          ))}
        </select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Experience"
        name="experience"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="number" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: "Required" }]}
      >
        <select>
          {QUALIFICATIONS.map((qual) => (
            <option key={qual} value={qual}>
              {qual}
            </option>
          ))}
        </select>
      </Form.Item>
    </Col>
  </>
);

/**
 * WorkHoursFields Component
 * Renders work hours and fee form fields
 */
const WorkHoursFields = () => (
  <>
    <Col span={24}>
      <h4 className="uppercase ">
        <b>Work Hours</b>
      </h4>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Start Time"
        name="startTime"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="time" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="End Time"
        name="endTime"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="time" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        label="Fee"
        name="fee"
        rules={[{ required: true, message: "Required" }]}
      >
        <input type="number" />
      </Form.Item>
    </Col>
  </>
);

/**
 * DoctorForm Component
 * Main component for doctor registration and updates
 */
function DoctorForm() {
  // Form instance and state management
  const [form] = Form.useForm();
  const [alreadyApproved, setAlreadyApproved] = useState(false);
  const [days, setDays] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // Hooks for navigation and state management
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles form submission
   * @param {Object} values - Form values
   */
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        ...values,
        days,
        userId: JSON.parse(localStorage.getItem("user")).id,
        status: alreadyApproved ? "approved" : "pending",
        role: "doctor",
      };

      if (alreadyApproved) {
        payload.id = JSON.parse(localStorage.getItem("user")).id;
      }

      const response = alreadyApproved
        ? await UpdateDoctor(payload)
        : await AddDoctor(payload);

      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  /**
   * Checks if user has already applied as a doctor
   */
  const checkIfAlreadyApplied = async () => {
    try {
      dispatch(ShowLoader(true));
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await CheckIfDoctorAccountIsApplied(userId);

      if (response.success) {
        setAlreadyApplied(true);
        if (response.data.status === "approved") {
          setAlreadyApproved(true);
          form.setFieldsValue(response.data);
          setDays(response.data.days);
        }
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  // Check application status on component mount
  useEffect(() => {
    checkIfAlreadyApplied();
  }, []);

  /**
   * Handles day selection
   * @param {Event} e - Checkbox change event
   */
  const handleDayChange = (e) => {
    const { checked, value } = e.target;
    setDays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  // Display pending message if already applied but not approved
  if (alreadyApplied && !alreadyApproved) {
    return (
      <div className="flex flex-col items-center gap-2 register-b">
        <h3 className="text-secondary">
          You have already applied for this doctor account, please wait for the
          admin to approve your request
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white p-2">
      <h3 className="uppercase my-1">
        {alreadyApproved ? "Update your information" : "Apply as a doctor"}
      </h3>
      <hr />

      <Form layout="vertical" className="my-1" onFinish={onFinish} form={form}>
        <Row gutter={[16, 16]}>
          <PersonalInfoFields />
          <Col span={24}>
            <hr />
          </Col>
          <ProfessionalInfoFields />
          <Col span={24}>
            <hr />
          </Col>
          <WorkHoursFields />

          {/* Day selection checkboxes */}
          <Col span={24}>
            <div className="flex gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    value={day}
                    onChange={handleDayChange}
                  />
                  <label>{day}</label>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Form action buttons */}
        <div className="flex justify-end gap-2">
          <button className="outlined-btn" type="button">
            CANCEL
          </button>
          <button className="contained-btn" type="submit">
            SUBMIT
          </button>
        </div>
      </Form>
    </div>
  );
}

export default DoctorForm;
