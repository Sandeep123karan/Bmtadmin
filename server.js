

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./config/db");


connectDB();

const app = express();
const PORT = process.env.PORT || 9000;


// app.use(cors());
app.use(
  cors({
    origin: [
      "https://front-bmt.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://papayawhip-bear-895902.hostingersite.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); 


// --------------------------------------
// Import Routes
// --------------------------------------
const liveFlightsRoute = require("./routes/liveFlights");
const convenienceFeeRoutes = require("./routes/convenienceFeeRoutes");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const agentNotificationRoutes = require("./routes/agentNotificationRoutes");
const emailTemplateRoutes = require("./routes/emailTemplateRoutes");
const companySettingRoutes = require("./routes/companySettingRoutes");
const agentPaymentRoutes = require("./routes/agentPaymentRoutes");
const onlineTransactionRoutes = require("./routes/onlineTransactionRoutes");
const flightMarkupRoutes = require("./routes/flightMarkupRoutes");
const flightDiscountRoutes = require("./routes/flightDiscountRoutes");
const bookingRoutes = require("./routes/bookingRoute");
const flightBookingRoutes = require("./routes/flightBookingRoute");
const flightAmendmentRoutes = require("./routes/flightAmendmentRoute");
const flightCouponRoutes = require("./routes/flightCouponRoute");
const flightTopDestinationRoutes = require("./routes/flightTopDestinationRoute");
const flightTopRouteRoutes = require("./routes/flightTopRoute");
const webCheckinRoutes = require("./routes/webCheckinRoutes");
const flightReplaceRoutes = require("./routes/flightReplaceRoutes");
const offlineFlightRoutes = require("./routes/offlineFlightRoutes");
const userRoutes = require("./routes/userRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const flightApiSupplierRoutes = require("./routes/flightApiSupplierRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const flightLogRoutes = require("./routes/flightLogRoutes");
const flightQueryRoutes = require("./routes/flightQueryRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const privateFareRoutes = require("./routes/privateFareRoutes");
const fareRuleRoutes = require("./routes/fareRuleRoutes");
const manageFareRuleRoutes = require("./routes/manageFareRuleRoutes");
const hotelMarkupRoutes = require("./routes/hotelMarkupRoutes");
const hotelDiscountRoutes = require("./routes/hotelDiscountRoutes");
const hotelBookingRoutes = require("./routes/hotelBookingRoutes");
const hotelAmendmentRoutes = require("./routes/hotelAmendmentRoutes");
const hotelTicketRoutes = require("./routes/hotelTicketRoutes");
const hotelCouponRoutes = require("./routes/hotelCouponRoutes");
const addHotelRoutes = require("./routes/addHotelRoutes");
const globalHotelRoutes = require("./routes/globalHotelRoutes");
const propertyTypeRoutes = require("./routes/propertyTypeRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const addHolidayRoutes = require("./routes/addHolidayRoutes");
const holidayBookingRoutes = require("./routes/holidayBookingRoutes");
const holidayQueryRoutes = require("./routes/holidayQueryRoutes");
const holidayMarkupRoutes = require("./routes/holidayMarkupRoutes");
const holidayDiscountRoutes = require("./routes/holidayDiscountRoutes");
const holidayCouponRoutes = require("./routes/holidayCouponRoutes");
const holidayThemeRoutes = require("./routes/holidayThemeRoutes");
const carRoutes = require("./routes/carRoutes");
const carBookingRoutes = require("./routes/carBookingRoutes");
const carAmendmentRoutes = require("./routes/carAmendmentRoutes");
const carMarkupRoutes = require("./routes/carMarkupRoutes");
const carDiscountRoutes = require("./routes/carDiscountRoutes");
const carCouponRoutes = require("./routes/carCouponRoutes");
const carSettingRoutes = require("./routes/carSettingRoutes");
const couponLogRoutes = require("./routes/couponLogRoutes");
const pageRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const airportRoutes = require("./routes/airportRoutes");
const clubMemberRoutes = require("./routes/memberRoutes");
const clubEventRoutes = require("./routes/clubEventRoutes");
const clubBookingRoutes = require("./routes/clubBookingRoutes");
const clubPaymentRoutes = require("./routes/clubPaymentRoutes");
const darshanRoutes = require("./routes/darshanRoutes");
const busRouteRoutes = require("./routes/busRouteRoutes");
const busBookingRoutes = require("./routes/busBookingRoutes");
const busAmendmentRoutes = require("./routes/busAmendmentRoutes");
const busQueryRoutes = require("./routes/busQueryRoutes");
const busMarkupRoutes = require("./routes/busMarkupRoutes");
const busDiscountRoutes = require("./routes/busDiscountRoutes");
const busCouponRoutes = require("./routes/busCouponRoutes");
const busSettingRoutes = require("./routes/busSettingRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const forexCardRoutes = require("./routes/forexCardRoutes");
const moneyTransferRoutes = require("./routes/moneyTransferRoutes");
const forexBookingRoutes = require("./routes/forexBookingRoutes");
const forexMarkupRoutes = require("./routes/forexMarkupRoutes");
const forexSettingRoutes = require("./routes/forexSettingRoutes");
const visaCountryRoutes = require("./routes/visaCountryRoutes");
const documentRequirementRoutes = require("./routes/documentRequirementRoutes");
const flightUploadTicketRoutes = require("./routes/flightUploadTicketRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const darshanBookingRoutes = require("./routes/DarshanBookingRoutes");
const busRoutes = require("./routes/addBusRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const resortRoutes = require("./routes/resortRoutes");
const loungeRoutes = require("./routes/loungeRoutes");

// ⭐ NEW: Cruise Routes
const cruiseRoutes = require("./routes/cruiseRoutes");
const cruiseBookingRoutes = require("./routes/cruiseBookingRoutes");
const trainAmendmentRoutes = require("./routes/trainAmendmentRoutes");
const trainMarkupRoutes = require("./routes/trainMarkupRoutes");

app.use("/api/activities", require("./routes/activityRoutes"));
const homeStayRoutes = require("./routes/homeStayRoutes");
const guestHouseRoutes = require("./routes/guestHouseRoutes");
const placeRoutes = require("./routes/placeRoutes");
const houseboatRoutes = require("./routes/houseboatRoutes");
const motelRoutes = require("./routes/motelRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const bedBreakfastRoutes = require("./routes/bedBreakfastRoutes");
const campsiteRoutes = require("./routes/campsiteRoutes");
const farmStayRoutes = require("./routes/farmStayRoutes");
const vacationHouseRoutes = require("./routes/vacationHouseRoutes");
const holidayParkRoutes = require("./routes/holidayParkRoutes");
const loveHotelRoutes = require("./routes/loveHotelRoutes");
const loveHotelBookingRoutes = require("./routes/loveHotelBookingRoutes");
const hostelBookingRoutes = require("./routes/hostelBookingRoutes");


// --------------------------------------
// Register All Routes
// --------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/club-members", clubMemberRoutes);
app.use("/api/club-events", clubEventRoutes);
app.use("/api/club-bookings", clubBookingRoutes);
app.use("/api/club-payments", clubPaymentRoutes);
app.use("/api/live-flights", liveFlightsRoute);
app.use("/api/exchange-rates", require("./routes/exchangeRateRoutes"));
app.use("/api/currencies", currencyRoutes);
app.use("/api/bus-routes", busRouteRoutes);
app.use("/api/bus-bookings", busBookingRoutes);
app.use("/api/bus-amendments", busAmendmentRoutes);
app.use("/api/bus-queries", busQueryRoutes);
app.use("/api/bus-markups", busMarkupRoutes);
app.use("/api/bus-discounts", busDiscountRoutes);
app.use("/api/bus-coupons", busCouponRoutes);
app.use("/api/bus-settings", busSettingRoutes);
app.use("/api/forex-cards", forexCardRoutes);
app.use("/api/money-transfers", moneyTransferRoutes);
app.use("/api", forexBookingRoutes);
app.use("/api/forex-markups", forexMarkupRoutes);
app.use("/api/forex-settings", forexSettingRoutes);
app.use("/api/visa-countries", visaCountryRoutes);
app.use("/api/document-requirements", documentRequirementRoutes);
app.use("/api/darshans", darshanRoutes);
app.use("/api/convenience-fees", convenienceFeeRoutes);
app.use("/api/bank-accounts", bankAccountRoutes);
app.use("/api/notifications", agentNotificationRoutes);
app.use("/api/email-templates", emailTemplateRoutes);
app.use("/api/company-setting", companySettingRoutes);
app.use("/api/agent-payments", agentPaymentRoutes);
app.use("/api/online-transactions", onlineTransactionRoutes);
app.use("/api/flight-markup", flightMarkupRoutes);
app.use("/api/flight-discounts", flightDiscountRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/flight-bookings", flightBookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/flight-amendments", flightAmendmentRoutes);
app.use("/api/flight-coupons", flightCouponRoutes);
app.use("/api/flight-top-destinations", flightTopDestinationRoutes);
app.use("/api/flight-top-routes", flightTopRouteRoutes);
app.use("/api/web-checkin", webCheckinRoutes);
app.use("/api/airline-replace", flightReplaceRoutes);
app.use("/api/offline-flights", offlineFlightRoutes);
app.use("/api/flight-api-suppliers", flightApiSupplierRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/flight-logs", flightLogRoutes);
app.use("/api/flight-queries", flightQueryRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/private-fare", privateFareRoutes);
app.use("/api/fare-rules", fareRuleRoutes);
app.use("/api/manage-fare-rules", manageFareRuleRoutes);
app.use("/api/hotel-markup", hotelMarkupRoutes);
app.use("/api/hotel-discount", hotelDiscountRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);
app.use("/api/hotel-amendments", hotelAmendmentRoutes);
app.use("/api/hotel-tickets", hotelTicketRoutes);
app.use("/api/hotel-coupons", hotelCouponRoutes);
app.use("/api/hotels", addHotelRoutes);
app.use("/api/global-hotels", globalHotelRoutes);
app.use("/api/property-types", propertyTypeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/addholiday", addHolidayRoutes);
app.use("/api/holiday-bookings", holidayBookingRoutes);
app.use("/api/holiday-amendments", require("./routes/holidayAmendmentRoutes"));
app.use("/api/holiday-query", holidayQueryRoutes);
app.use("/api/holiday-markups", holidayMarkupRoutes);
app.use("/api/holiday-discounts", holidayDiscountRoutes);
app.use("/api/holiday-coupons", holidayCouponRoutes);
app.use("/api/holiday-themes", holidayThemeRoutes);
app.use("/api", carRoutes);
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/car-amendments", carAmendmentRoutes);
app.use("/api/car-enquiries", require("./routes/carEnquiryRoutes"));
app.use("/api/admin", carMarkupRoutes);
app.use("/api/car-discounts", carDiscountRoutes);
app.use("/api/car-coupons", carCouponRoutes);
app.use("/api/admin/car-settings", carSettingRoutes);
app.use("/api/admin", couponLogRoutes);
app.use("/api/admin", pageRoutes);  
app.use("/api/admin/menus", require("./routes/menuRoutes"));
app.use("/api/contacts", contactRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api", trainAmendmentRoutes);
app.use("/api", trainMarkupRoutes);
app.use("/api/darshan-bookings", darshanBookingRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/hostel-bookings", hostelBookingRoutes);

// ⭐ Cruise Route
app.use("/api/cruises", cruiseRoutes);
app.use("/api/cruise-bookings", cruiseBookingRoutes);
app.use("/api/visaApplications", require("./routes/visaApplicationRoutes"));
app.use("/api/visa-discounts", require("./routes/visaDiscountRoutes"));
app.use("/api/visa-settings", require("./routes/visaSettingsRoutes"));
app.use("/api/train-bookings", require("./routes/trainBookingRoutes"));
app.use("/api/train-discounts", require("./routes/trainDiscountRoutes"));
app.use("/api/train-coupons", require("./routes/trainCouponRoutes"));
app.use("/api/pnr-status", require("./routes/pnrRoutes"));
app.use("/api/flight-upload-tickets", flightUploadTicketRoutes);
app.use("/api/insurance-policies",
require("./routes/insurancePolicyRoutes"));
app.use("/api/insurance-bookings",
require("./routes/insuranceBookingRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));

app.use("/api/homestay", homeStayRoutes);
app.use("/api/apartment", apartmentRoutes);
app.use("/api/resorts", resortRoutes);
app.use("/api/lounge", loungeRoutes);
app.use("/api/guesthouses", guestHouseRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/houseboat", houseboatRoutes);
app.use("/api/motel", motelRoutes);
app.use("/api/hostel", hostelRoutes);
app.use("/api/bnb", bedBreakfastRoutes);
app.use("/api/campsites", campsiteRoutes);
app.use("/api/farmstay", farmStayRoutes);
app.use("/api/vacationhouses", vacationHouseRoutes);
app.use("/api/holidayparks", holidayParkRoutes);
app.use("/api/lovehotels", loveHotelRoutes);
app.use("/api/bookings", require("./routes/campsitebookingRoutes"));
app.use("/api/holidaypark-bookings", require("./routes/holidayParkBookingRoutes"));
app.use("/api/vacation-bookings", require("./routes/vacationHouseBookingRoutes"));
app.use("/api/farm-bookings", require("./routes/farmStayBookingRoutes"));
app.use("/api/love-hotel-bookings", loveHotelBookingRoutes);
const motelBookingRoutes = require("./routes/motelBookingRoutes");

app.use("/api/motel-bookings", motelBookingRoutes);
const placeBookingRoutes = require("./routes/placeBookingRoutes");

app.use("/api/place-bookings", placeBookingRoutes);
const homeStayBookingRoutes = require("./routes/homeStayBookingRoutes");

app.use("/api/homestay-bookings", homeStayBookingRoutes);
const houseboatBookingRoutes = require("./routes/houseboatBookingRoutes");

app.use("/api/houseboat-bookings", houseboatBookingRoutes);
const apartmentBookingRoutes = require("./routes/apartmentBookingRoutes");

app.use("/api/apartment-bookings", apartmentBookingRoutes);
const guestHouseBookingRoutes = require("./routes/guestHouseBookingRoutes");

app.use("/api/guesthouse-bookings", guestHouseBookingRoutes);
const loungeBookingRoutes = require("./routes/loungeBookingRoutes");

app.use("/api/lounge-bookings", loungeBookingRoutes);
const resortBookingRoutes = require("./routes/resortBookingRoutes");

app.use("/api/resort-bookings", resortBookingRoutes);
const authRoutes = require("./routes/authRoutes");

// ✅ Routes use
app.use("/api/auth", authRoutes);
// --------------------------------------
// Worldwide Airlines API
// --------------------------------------
app.get("/api/world-airlines", async (req, res) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat"
    );

    const lines = response.data.split("\n");

    const airlines = lines
      .map((line) => line.split(","))
      .filter((a) => a.length > 6 && a[3] !== "\\N")
      .map((a) => ({
        airlineName: a[1].replace(/"/g, ""),
        airlineCode: a[3].replace(/"/g, ""),
        callsign: a[4].replace(/"/g, ""),
        country: a[6].replace(/"/g, ""),
        airlineImage: `https://content.airhex.com/content/logos/airlines_${a[3].replace(
          /"/g,
          ""
        )}_200_200_s.png`,
      }));

    res.json(airlines);
  } catch (err) {
    console.log("❌ Airline fetch error:", err.message);
    res.status(500).json({ message: "Error loading airline data" });
  }
});

// --------------------------------------
// Testing Route
// --------------------------------------
app.get("/testing", (req, res) => {
  res.send("✅ Testing route is working");
});

// --------------------------------------
// GLOBAL ERROR HANDLER  (NO CRASH EVER)
// --------------------------------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err?.stack || err);
  res
    .status(500)
    .json({ error: true, message: err?.message || "Unknown server error" });
});

// --------------------------------------
// Start Server
// --------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
