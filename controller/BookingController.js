const Booking = require('../model/booking');

// GET /contact - render the empty booking form
exports.showContactForm = (req, res) => {
  res.render('contact', {
    title: 'Contact & Book a Cab | Eva Tours and Travels',
    description: 'Book a taxi with Eva Tours and Travels. Call 9284153392 or 9552817420, or send your pickup and drop details online.',
    sent: false,
    errors: null,
    formData: {}
  });
};

// POST /contact - validate, save, and re-render with a result
exports.submitBooking = async (req, res) => {
  const { name, phone, pickup, drop, tripType, date, message } = req.body;

  try {
    const booking = new Booking({ name, phone, pickup, drop, tripType, date, message });

    // Run Mongoose validation before saving
    await booking.validate();
    await booking.save();

    console.log('New booking saved:', booking._id.toString());

    return res.render('contact', {
      title: 'Contact & Book a Cab | Eva Tours and Travels',
      description: 'Book a taxi with Eva Tours and Travels. Call 9284153392 or 9552817420, or send your pickup and drop details online.',
      sent: true,
      errors: null,
      formData: {}
    });
  } catch (err) {
    console.error('Booking save failed:', err.message);

    // Turn Mongoose validation errors into a simple array for the view
    const errors = err.errors
      ? Object.values(err.errors).map((e) => e.message)
      : ['Something went wrong while saving your booking. Please call us directly.'];

    return res.status(400).render('contact', {
      title: 'Contact & Book a Cab | Eva Tours and Travels',
      description: 'Book a taxi with Eva Tours and Travels. Call 9284153392 or 9552817420, or send your pickup and drop details online.',
      sent: false,
      errors,
      formData: { name, phone, pickup, drop, tripType, date, message }
    });
  }
};

// GET /admin/bookings - simple listing for the owner to review enquiries
// (not linked in the nav - visit the URL directly, or wrap with auth later)
exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    res.render('admin-bookings', {
      title: 'Booking Enquiries | Eva Tours and Travels',
      description: 'Internal booking list.',
      bookings
    });
  } catch (err) {
    console.error('Failed to load bookings:', err.message);
    res.status(500).send('Could not load bookings.');
  }
};