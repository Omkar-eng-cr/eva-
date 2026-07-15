const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController');

// --- Core pages ---

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Eva Tours and Travels | Taxi Service in Pune',
    description: 'Book a reliable taxi in Pune with Eva Tours and Travels. Local rides, outstation trips, airport transfers and hourly rentals. Call 9284153392.'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us | Eva Tours and Travels',
    description: 'Eva Tours and Travels is a Pune-based taxi service owned by Sushil Kale, offering local, outstation, airport and corporate cab bookings.'
  });
});

router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Taxi Services | Eva Tours and Travels',
    description: 'Local city rides, outstation trips, airport transfers, hourly rentals, corporate transport and wedding car rental in Pune.'
  });
});

router.get('/packages', (req, res) => {
  res.render('packages', {
    title: 'Taxi Packages & Fares | Eva Tours and Travels',
    description: 'Fixed-fare taxi packages in Pune - local, outstation, airport transfer, hourly and full-day rentals. Call for an exact quote.'
  });
});

router.get('/fleet', (req, res) => {
  res.render('fleet', {
    title: 'Our Fleet | Eva Tours and Travels',
    description: 'Hatchback, sedan, SUV and tempo traveller cabs available for booking with Eva Tours and Travels in Pune. Compare seats, luggage and pricing.'
  });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: 'Fleet Gallery | Eva Tours and Travels',
    description: 'A look at the Eva Tours and Travels fleet - hatchbacks, sedans, SUVs and tempo travellers available for booking in Pune.'
  });
});

// --- Legal pages ---

router.get('/privacy', (req, res) => {
  res.render('privacy', {
    title: 'Privacy Policy | Eva Tours and Travels',
    description: 'How Eva Tours and Travels collects, uses and protects your information when you book a taxi in Pune.'
  });
});

router.get('/terms', (req, res) => {
  res.render('terms', {
    title: 'Terms & Conditions | Eva Tours and Travels',
    description: 'Booking, payment, cancellation and passenger terms for Eva Tours and Travels taxi service in Pune.'
  });
});

// --- Contact / booking (handled by BookingController) ---

router.get('/contact', bookingController.showContactForm);
router.post('/contact', bookingController.submitBooking);

// Internal booking list for the owner - no auth yet, do not expose publicly
router.get('/admin/bookings', bookingController.listBookings);

module.exports = router;