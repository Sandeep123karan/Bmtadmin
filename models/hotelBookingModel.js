
// const mongoose = require("mongoose");

// const hotelBookingSchema = new mongoose.Schema(
//   {
//     refNo: String,
//     bookingSource: String,
//     hotelName: String,
//     destination: String,
//     checkinDate: String,
//     checkoutDate: String,
//     fare: String,
//     payStatus: String,
//     bookStatus: String,
//     cnfNumber: String,
//     supplier: String,
//     type: String,
//     bookingCurrency: String,
//     currencyRate: String,
//     assignUser: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("HotelBooking", hotelBookingSchema);





const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
{
  /* ===== BASIC ===== */
  refNo: { type: String, unique: true },
  bookingSource: String,
  type: String,

  /* ===== CUSTOMER ===== */
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  adults: String,
  children: String,

  /* ===== HOTEL ===== */
  hotelName: String,
  destination: String,
  city: String,
  roomType: String,
  mealPlan: String,
  nights: String,
  rooms: String,

  /* ===== GALLERY (MIN 3 IMAGES) ===== */
  gallery: {
    type: [String], // image urls
    validate: {
      validator: function (val) {
        return val.length >= 3;
      },
      message: "Minimum 3 hotel images required",
    },
  },

  /* ===== DATES ===== */
  checkinDate: String,
  checkoutDate: String,
  bookingDate: String,

  /* ===== PAYMENT ===== */
  fare: String,
  tax: String,
  discount: String,
  totalAmount: String,
  paidAmount: String,
  dueAmount: String,

  payStatus: {
    type: String,
    default: "Pending", // Pending / Partial / Paid
  },

  paymentMode: String,
  transactionId: String,

  /* ===== BOOK STATUS ===== */
  bookStatus: {
    type: String,
    default: "Processing", // Processing / Confirmed
  },

  /* ===== SUPPLIER ===== */
  supplier: String,
  supplierCost: String,
  supplierPaymentStatus: String,

  /* ===== CURRENCY ===== */
  bookingCurrency: String,
  currencyRate: String,

  /* ===== INTERNAL ===== */
  assignUser: String,
  notes: String,
  specialRequest: String,
},
{ timestamps: true }
);

module.exports = mongoose.model("HotelBooking", hotelBookingSchema);
