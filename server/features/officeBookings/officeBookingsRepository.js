const { pool } = require("../../db/connect");
const squel = require("squel").useFlavour("postgres");

class officeBookingsRepository {
  async createBookings(booking_details) {
    const query = squel
      .insert()
      .into("office_bookings")
      .set('"userId"', booking_details.userId)
      .set('"officeId"', booking_details.officeId)
      .set('"bookingDate"', booking_details.bookingDate)
      .set('"startTime"', booking_details.startTime)
      .set('"endTime"', booking_details.endTime)
      .set("config", booking_details.config)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows[0];
  }

  async getSeatBookingTimes(officeId, bookingDate, row, column) {
    const query = squel
      .select()
      .from("office_bookings")
      .field('"startTime"')
      .field('"endTime"')
      .where('"officeId" = ?', officeId)
      .where('"bookingDate" = ?', bookingDate)
      .where("config->>'row' = ?", row)
      .where("config->>'column' = ?",column)
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows;
  }

  async getOfficeBookingTimes(officeId,bookingDate){
    const query=squel
    .select()
    .from("office_bookings")
    .field('"startTime"')
    .field('"endTime"')
    .where('"officeId" = ?', officeId)
    .where('"bookingDate" = ?', bookingDate)
    .toParam();

    const result=await pool.query(query.text, query.values);
    return result.rows;
  }

  async getUserGroupBookingTimes(userId, bookingDate) {
    const query = squel
      .select()
      .from("office_bookings")
      .field('"startTime"')
      .field('"endTime"')
      .where('"userId" = ?', userId)
      .where('"bookingDate" = ?', bookingDate)
      .where("config->>'row' IS NULL")
      .where("config->>'column' IS NULL")
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows; 
  }
    async getUserSeatBookingTimes(userId, bookingDate) {
    const query = squel
      .select()
      .from("office_bookings")
      .field('"startTime"')
      .field('"endTime"')
      .where('"userId" = ?', userId)
      .where('"bookingDate" = ?', bookingDate)
      .where("config->>'row' IS NOT NULL")
      .where("config->>'column' IS NOT NULL")
      .toParam();

    const result = await pool.query(query.text, query.values);
    return result.rows; 
  }
}
module.exports = officeBookingsRepository;
