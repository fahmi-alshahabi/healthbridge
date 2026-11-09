// Import necessary modules and components
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetDoctorById } from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";
import moment from "moment";
import {
  BookDoctorAppointment,
  GetDoctorAppointmentsOnDate,
} from "../../apicalls/appointments";

function BookAppointment() {
  // State variables for user input, doctor details, and booked slots
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  // Hooks for navigation, URL parameters, and Redux dispatch
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch doctor details by ID
  const fetchDoctorDetails = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorById(id);
      if (response.success) {
        setDoctor(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  // Generate available slots for the selected date
  const generateSlots = () => {
    const dayOfWeek = moment(date).format("dddd");
    if (!doctor?.days.includes(dayOfWeek)) {
      return (
        <h3>Doctor is not available on {moment(date).format("DD-MM-YYYY")}</h3>
      );
    }

    const slots = [];
    let startTime = moment(doctor.startTime, "HH:mm");
    const endTime = moment(doctor.endTime, "HH:mm");
    const slotDuration = 60;

    while (startTime < endTime) {
      slots.push(startTime.format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }

    return slots.map((slot) => {
      const isSlotBooked = bookedSlots.some(
        (booked) => booked.slot === slot && booked.status !== "cancelled"
      );

      return (
        <div
          key={slot}
          className="bg-white p-1 cursor-pointer"
          onClick={() => setSelectedSlot(slot)}
          style={{
            border:
              selectedSlot === slot ? "3px solid green" : "1px solid gray",
            backgroundColor: isSlotBooked ? "gray" : "white",
            pointerEvents: isSlotBooked ? "none" : "auto",
          }}
        >
          <span>
            {moment(slot, "HH:mm").format("hh:mm A")} -{" "}
            {moment(slot, "HH:mm")
              .add(slotDuration, "minutes")
              .format("hh:mm A")}
          </span>
        </div>
      );
    });
  };

  // Book an appointment
  const handleBooking = async () => {
    try {
      dispatch(ShowLoader(true));
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        doctorId: doctor.id,
        userId: user.id,
        date,
        slot: selectedSlot,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: user.name,
        bookedOn: moment().format("DD-MM-YYYY hh:mm A"),
        problem,
        status: "pending",
      };
      const response = await BookDoctorAppointment(payload);

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

  // Fetch booked slots for the selected date
  const fetchBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorAppointmentsOnDate(id, date);
      if (response.success) {
        setBookedSlots(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  // Fetch doctor details on component mount
  useEffect(() => {
    fetchDoctorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch booked slots when the date changes
  useEffect(() => {
    if (date) fetchBookedSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    doctor && (
      <div className="bg-white p-2">
        <h1 className="uppercase my-1">
          <b>
            {doctor.firstName} {doctor.lastName}
          </b>
        </h1>

        <hr />

        {/* Doctor details */}
        <div className="flex flex-col gap-1 my-1 w-half">
          <div className="flex justify-between w-full">
            <h4>
              <b>Speciality:</b>
            </h4>
            <h4>{doctor.speciality}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Experience:</b>
            </h4>
            <h4>{doctor.experience} Years</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Email:</b>
            </h4>
            <h4>{doctor.email}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Phone:</b>
            </h4>
            <h4>{doctor.phone}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Address:</b>
            </h4>
            <h4>{doctor.address}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Fee:</b>
            </h4>
            <h4>{doctor.fee}/- Per Session</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Days Available:</b>
            </h4>
            <h4>{doctor.days.join(", ")}</h4>
          </div>
        </div>

        <hr />

        {/* Appointment booking section */}
        <div className="flex flex-col gap-1 my-2 ">
          <div className="flex gap-2 w-400 items-end ">
            <div>
              <span>Select Date:</span>
              <input
                className=" cursor-pointer "
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
          </div>

          {/* Display slots */}
          <div className="flex gap-2 ">{date && generateSlots()}</div>

          {selectedSlot && (
            <div>
              <textarea
                placeholder="Enter your problem here"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows="10"
              ></textarea>

              <div className="flex gap-2 justify-center my-3">
                <button className="outlined-btn" onClick={() => navigate("/")}>
                  Cancel
                </button>
                <button className="contained-btn " onClick={handleBooking}>
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BookAppointment;
